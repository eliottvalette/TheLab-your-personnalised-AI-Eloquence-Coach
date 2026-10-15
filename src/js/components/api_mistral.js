import { requestAi } from "./api_client.js";

let responseStatus = "Waiting";

async function analyze(endpoint, params) {
  responseStatus = "in-progress";
  try {
    const result = await requestAi(endpoint, params);
    if (typeof result.html !== "string" || !result.html) {
      throw new Error("Le service d’analyse a renvoyé une réponse invalide.");
    }
    responseStatus = "Terminated";
    return result.html;
  } catch (error) {
    responseStatus = "Failed";
    throw error;
  }
}

export default function freeApi(params) {
  return analyze("free-analysis", params);
}

export function labApi(params) {
  return analyze("lab-analysis", params);
}

export { responseStatus };
