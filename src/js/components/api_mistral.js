const status = ['Waiting', 'in-progress', 'Terminated'];
let responseStatus = status[0];

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Erreur lors de l'analyse.");
  }

  return result;
}

export default async function freeApi(params) {
  responseStatus = status[1];
  console.log("mistralApi status : " + responseStatus);

  const result = await postJson("/api/free-analysis", params);

  responseStatus = status[2];
  console.log("mistralApi status : " + responseStatus);

  return result.html;
}

export async function labApi(params) {
  responseStatus = status[1];
  console.log(`MistralApi status : ${responseStatus}\n`);

  const result = await postJson("/api/lab-analysis", params);

  responseStatus = status[2];
  console.log(`MistralApi status : ${responseStatus}\n`);

  return result.html;
}

export { responseStatus };
