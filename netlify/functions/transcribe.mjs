import OpenAI, { toFile } from "openai";
import { json, methodNotAllowed } from "./lib/http.mjs";

const transcriptionModel = "gpt-4o-transcribe";

export default async function handler(request) {
  if (request.method !== "POST") {
    return methodNotAllowed(["POST"]);
  }

  if (!process.env.OPENAI_API_KEY) {
    return json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const audio = formData.get("audio");
    const language = String(formData.get("language") || "fr");

    if (!(audio instanceof File)) {
      return json({ error: "Aucun fichier audio valide n'a ete fourni." }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const file = await toFile(await audio.arrayBuffer(), audio.name || "audio-file", {
      type: audio.type || "application/octet-stream",
    });

    const completion = await openai.audio.transcriptions.create({
      file,
      model: transcriptionModel,
      language,
    });

    return json({ text: completion.text });
  } catch (error) {
    console.error("Transcription failed:", error);
    return json(
      { error: "Erreur lors de la transcription audio." },
      { status: 500 },
    );
  }
}

export const config = {
  path: "/api/transcribe",
};
