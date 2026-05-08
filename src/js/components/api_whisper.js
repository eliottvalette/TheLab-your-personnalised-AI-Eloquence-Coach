import OpenAI from "openai";

const status = ['Waiting', 'in-progress', 'Terminated'];
const whisperApiKey = import.meta.env.VITE_REACT_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: whisperApiKey,
  dangerouslyAllowBrowser: true,
});

export default async function whisperApi(audioFile, langue) {
  if (!(audioFile instanceof Blob)) {
    throw new Error("Aucun fichier audio valide n'a ete fourni.");
  }

  console.log(`WhisperApi status: ${status[1]} \n`);

  try {
    const completion = await openai.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: langue,
    });
    const text = completion.text;
    console.log(`WhisperApi status : ${status[2]} \n `);
    console.log(`\nTranscription vocale : \n ${text}\n`);
    return text;
  } catch (error) {
    console.error("Erreur lors de l'appel a l'API OpenAI Audio Transcription:", error);
    throw error;
  }
}
