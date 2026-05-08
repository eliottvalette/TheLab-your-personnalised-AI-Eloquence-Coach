const status = ['Waiting', 'in-progress', 'Terminated'];
let responseStatus = status[0];

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

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await readApiPayload(response);

  if (!response.ok) {
    throw new Error(result.error || "Erreur lors de l'analyse.");
  }

  return result;
}

export default async function freeApi(params) {
  responseStatus = status[1];
  console.log("mistralApi status : " + responseStatus);

  const result = await postJson("/.netlify/functions/free-analysis", params);

  responseStatus = status[2];
  console.log("mistralApi status : " + responseStatus);

  return result.html;
}

export async function labApi(params) {
  responseStatus = status[1];
  console.log(`MistralApi status : ${responseStatus}\n`);

  const result = await postJson("/.netlify/functions/lab-analysis", params);

  responseStatus = status[2];
  console.log(`MistralApi status : ${responseStatus}\n`);

  return result.html;
}

export { responseStatus };
