const targetSampleRate = 16000;
const targetChunkBytes = 3_200_000;
const wavHeaderBytes = 44;
const bytesPerSample = 2;

function mixToMono(audioBuffer) {
  const { numberOfChannels, length } = audioBuffer;
  const mono = new Float32Array(length);

  for (let channel = 0; channel < numberOfChannels; channel += 1) {
    const channelData = audioBuffer.getChannelData(channel);

    for (let i = 0; i < length; i += 1) {
      mono[i] += channelData[i] / numberOfChannels;
    }
  }

  return mono;
}

function downsampleBuffer(samples, inputSampleRate, outputSampleRate) {
  if (inputSampleRate === outputSampleRate) {
    return samples;
  }

  const sampleRateRatio = inputSampleRate / outputSampleRate;
  const outputLength = Math.floor(samples.length / sampleRateRatio);
  const output = new Float32Array(outputLength);

  let outputIndex = 0;
  let inputIndex = 0;

  while (outputIndex < outputLength) {
    const nextInputIndex = Math.round((outputIndex + 1) * sampleRateRatio);
    let sum = 0;
    let count = 0;

    for (let i = inputIndex; i < nextInputIndex && i < samples.length; i += 1) {
      sum += samples[i];
      count += 1;
    }

    output[outputIndex] = count > 0 ? sum / count : 0;
    outputIndex += 1;
    inputIndex = nextInputIndex;
  }

  return output;
}

function floatTo16BitPcm(outputView, offset, input) {
  for (let i = 0; i < input.length; i += 1, offset += 2) {
    const sample = Math.max(-1, Math.min(1, input[i]));
    outputView.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }
}

function writeAscii(view, offset, value) {
  for (let i = 0; i < value.length; i += 1) {
    view.setUint8(offset + i, value.charCodeAt(i));
  }
}

function encodeWav(samples, sampleRate) {
  const buffer = new ArrayBuffer(wavHeaderBytes + samples.length * bytesPerSample);
  const view = new DataView(buffer);

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * bytesPerSample, true);
  view.setUint16(32, bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, samples.length * bytesPerSample, true);
  floatTo16BitPcm(view, wavHeaderBytes, samples);

  return new Blob([buffer], { type: "audio/wav" });
}

function getChunkSampleLength() {
  return Math.floor((targetChunkBytes - wavHeaderBytes) / bytesPerSample);
}

function getBaseName(fileName) {
  const index = fileName.lastIndexOf(".");
  return index === -1 ? fileName : fileName.slice(0, index);
}

export async function splitAudioFileForTranscription(audioFile) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextCtor) {
    throw new Error("Votre navigateur ne prend pas en charge le decoupage audio local.");
  }

  const audioContext = new AudioContextCtor();

  try {
    const sourceBuffer = await audioFile.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(sourceBuffer);
    const monoSamples = mixToMono(decoded);
    const resampled = downsampleBuffer(monoSamples, decoded.sampleRate, targetSampleRate);
    const chunkSampleLength = getChunkSampleLength();
    const chunkFiles = [];
    const baseName = getBaseName(audioFile.name || "audio");

    for (let offset = 0, index = 0; offset < resampled.length; offset += chunkSampleLength, index += 1) {
      const chunk = resampled.slice(offset, offset + chunkSampleLength);
      const wavBlob = encodeWav(chunk, targetSampleRate);
      const paddedIndex = String(index + 1).padStart(3, "0");

      chunkFiles.push(
        new File([wavBlob], `${baseName}-part-${paddedIndex}.wav`, {
          type: "audio/wav",
        }),
      );
    }

    return chunkFiles;
  } catch (error) {
    console.error("Audio chunking failed:", error);
    throw new Error("Impossible de preparer ce fichier audio pour la transcription.");
  } finally {
    await audioContext.close();
  }
}
