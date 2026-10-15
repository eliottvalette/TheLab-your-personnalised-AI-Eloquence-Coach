import { auth } from "../utils/firebase.js";

export async function requestAi(endpoint, body) {
  await auth.authStateReady();
  if (!auth.currentUser) {
    throw new Error("Veuillez vous connecter à votre compte pour lancer une analyse.");
  }

  const token = await auth.currentUser.getIdToken();
  const headers = { Authorization: `Bearer ${token}` };
  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  const response = await fetch(`/.netlify/functions/${endpoint}`, {
    method: "POST",
    headers,
    body,
  });
  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error(`Le service d’analyse est indisponible (HTTP ${response.status}).`);
  }
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || `La requête a échoué (HTTP ${response.status}).`);
  }
  return result;
}
