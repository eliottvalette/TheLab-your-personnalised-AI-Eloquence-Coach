const status = ['Waiting', 'in-progress', 'Terminated'];
const maxDirectUploadBytes = 4_300_000;

import { splitAudioFileForTranscription } from "./audio_chunks.js";

async function readApiPayload(response) {
  const contentType = response.headers.get("content-type") || "";
  const rawBody = await response.text();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(rawBody);
    } catch {
      return {
        error: "Le serveur a renvoye un JSON invalide.",
        rawBody,
      };
    }
  }

  return {
    error: rawBody || `HTTP ${response.status}`,
    rawBody,
  };
}

async function requestTranscription(audioFile, langue) {
  const formData = new FormData();
  formData.append("audio", audioFile, audioFile.name || "audio-file");
  formData.append("language", langue || "fr");

  const response = await fetch("/.netlify/functions/transcribe", {
    method: "POST",
    body: formData,
  });

  const payload = await readApiPayload(response);

  if (!response.ok) {
    throw new Error(payload.error || "Erreur dans la transcription audio.");
  }

  return payload.text;
}

export default async function whisperApi(audioFile, langue) {
  if (!(audioFile instanceof Blob)) {
    throw new Error("Aucun fichier audio valide n'a ete fourni.");
  }

  console.log(`WhisperApi status: ${status[1]} \n`);

  try {
    if (audioFile.size <= maxDirectUploadBytes) {
      const text = await requestTranscription(audioFile, langue);
      console.log(`WhisperApi status : ${status[2]} \n `);
      console.log(`\nTranscription vocale : \n ${text}\n`);
      return text;
    }

    const audioChunks = await splitAudioFileForTranscription(audioFile);
    const transcriptParts = [];

    for (const chunkFile of audioChunks) {
      transcriptParts.push(await requestTranscription(chunkFile, langue));
    }

    const text = transcriptParts.join("\n\n");
    console.log(`WhisperApi status : ${status[2]} \n `);
    console.log(`\nTranscription vocale : \n ${text}\n`);
    return text;
  } catch (error) {
    console.error("Erreur lors de l'appel a l'API de transcription:", error);
    throw error;
  }
}
