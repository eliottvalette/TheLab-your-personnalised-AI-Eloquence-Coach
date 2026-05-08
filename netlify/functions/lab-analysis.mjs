import MistralClient from "@mistralai/mistralai";
import { json, methodNotAllowed, readJson } from "./lib/http.mjs";
import { resolveMistralModel } from "./lib/models.mjs";
import { buildLabMessages } from "./lib/prompts.mjs";

export default async function handler(request) {
  if (request.method !== "POST") {
    return methodNotAllowed(["POST"]);
  }

  if (!process.env.MISTRAL_API_KEY) {
    return json({ error: "MISTRAL_API_KEY is not configured." }, { status: 500 });
  }

  try {
    const body = await readJson(request);
    const {
      modelChosen,
      modelStyle,
      mistralModel,
      maxTokens,
      userPrompt,
      language,
      support,
    } = body;

    if (!userPrompt || typeof userPrompt !== "string") {
      return json({ error: "La transcription utilisateur est requise." }, { status: 400 });
    }

    if (!modelChosen || !modelStyle) {
      return json({ error: "Le modele oratoire selectionne est requis." }, { status: 400 });
    }

    const client = new MistralClient(process.env.MISTRAL_API_KEY);
    const chatResponse = await client.chat({
      model: resolveMistralModel(mistralModel),
      messages: buildLabMessages({
        modelChosen,
        modelStyle,
        userPrompt,
        support,
        language,
      }),
      temperature: 0.3,
      maxTokens,
    });

    return json({ html: chatResponse.choices?.[0]?.message?.content || "" });
  } catch (error) {
    console.error("Lab analysis failed:", error);
    return json(
      { error: "Erreur lors de la generation de l'analyse du Lab." },
      { status: 500 },
    );
  }
}

export const config = {
  path: "/api/lab-analysis",
};
