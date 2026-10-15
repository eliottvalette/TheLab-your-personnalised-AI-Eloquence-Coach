import { requestAi } from "./api_client.js";

export default async function whisperApi(audioFile, language) {
  if (!(audioFile instanceof Blob)) {
    throw new Error("Aucun fichier audio valide n'a ete fourni.");
  }
  const body = new FormData();
  body.append("audio", audioFile, audioFile.name || "recording.webm");
  body.append("language", language);
  const result = await requestAi("transcribe", body);
  if (typeof result.text !== "string") {
    throw new Error("Le service de transcription a renvoyé une réponse invalide.");
  }
  return result.text;
}
