export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    status: init.status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

export function methodNotAllowed(allowedMethods) {
  return json(
    { error: "Method not allowed." },
    {
      status: 405,
      headers: {
        Allow: allowedMethods.join(", "),
      },
    },
  );
}

export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Le corps de la requete JSON est invalide.");
  }
}
