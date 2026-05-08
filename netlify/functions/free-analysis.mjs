import MistralClient from "@mistralai/mistralai";
import { json, methodNotAllowed, readJson } from "./lib/http.mjs";
import { resolveMistralModel } from "./lib/models.mjs";
import { buildFreeAnalysisMessages } from "./lib/prompts.mjs";

function getEnv(name) {
  return globalThis.Netlify?.env?.get?.(name) ?? process.env[name];
}

export default async function handler(request) {
  if (request.method !== "POST") {
    return methodNotAllowed(["POST"]);
  }

  const mistralApiKey = getEnv("MISTRAL_API_KEY");

  if (!mistralApiKey) {
    return json({ error: "MISTRAL_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const body = await readJson(request);
    const {
      userPrompt,
      mistralModel,
      maxTokens,
      who,
      context,
      audience,
      aim,
      support,
      language,
    } = body;

    if (!userPrompt || typeof userPrompt !== "string") {
      return json({ error: "La transcription utilisateur est requise." }, { status: 400 });
    }

    const client = new MistralClient(mistralApiKey);
    const chatResponse = await client.chat({
      model: resolveMistralModel(mistralModel),
      messages: buildFreeAnalysisMessages({
        userPrompt,
        who,
        context,
        audience,
        aim,
        support,
        language,
      }),
      temperature: 0.3,
      maxTokens,
    });

    return json({ html: chatResponse.choices?.[0]?.message?.content || "" });
  } catch (error) {
    console.error("Free analysis failed:", error);
    return json(
      { error: "Erreur lors de la generation de l'analyse libre." },
      { status: 500 },
    );
  }
}
