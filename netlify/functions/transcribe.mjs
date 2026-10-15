import { requireUser } from "./lib/auth.mjs";
import OpenAI, { toFile } from "openai";
import { json, methodNotAllowed } from "./lib/http.mjs";

const transcriptionModel = "gpt-4o-transcribe";
const retriableErrorCodes = new Set(["ECONNRESET", "ENOTFOUND", "ETIMEDOUT"]);

async function transcribeWithRetry(openai, input) {
  let lastError;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await openai.audio.transcriptions.create(input);
    } catch (error) {
      lastError = error;
      const code = error?.cause?.code;

      if (!retriableErrorCodes.has(code) || attempt === 1) {
        throw error;
      }
    }
  }

  throw lastError;
}

function getEnv(name) {
  return globalThis.Netlify?.env?.get?.(name) ?? process.env[name];
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return methodNotAllowed(["POST"]);
  }

  const authError = await requireUser(request);
  if (authError) return authError;

  const openAiApiKey = getEnv("OPENAI_API_KEY");

  if (!openAiApiKey) {
    return json({ error: "OPENAI_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const audio = formData.get("audio");
    const language = String(formData.get("language") || "fr");

    if (!audio || typeof audio.arrayBuffer !== "function") {
      return json({ error: "Aucun fichier audio valide n'a ete fourni." }, { status: 400 });
    }

    if (audio.size === 0 || audio.size > 4 * 1024 * 1024 || !["fr", "en"].includes(language)) {
      return json({ error: "Audio must be between 1 byte and 4 MiB, with language fr or en." }, { status: 400 });
    }

    const openai = new OpenAI({ apiKey: openAiApiKey });
    const file = await toFile(await audio.arrayBuffer(), audio.name || "audio-file", {
      type: audio.type || "application/octet-stream",
    });

    const completion = await transcribeWithRetry(openai, {
      file,
      model: transcriptionModel,
      language,
    });

    return json({ text: completion.text });
  } catch (error) {
    console.error("Transcription failed:", error?.status || error?.name);
    return json(
      {
        error: "Erreur lors de la transcription audio.",
        details: error?.cause?.code || error?.name || "UNKNOWN_ERROR",
      },
      { status: 500 },
    );
  }
}

export const config = {
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
