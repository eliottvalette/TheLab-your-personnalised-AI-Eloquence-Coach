import { firebaseConfig } from "../../../src/js/utils/firebase_config.js";
import { json } from "./http.mjs";

export async function requireUser(request) {
  const authorization = request.headers.get("authorization");
  const match = /^Bearer ([^\s]+)$/.exec(authorization || "");
  if (!match) {
    return json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: match[1] }),
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) {
      const status = response.status === 400 || response.status === 401 ? 401 : 503;
      return json({ error: status === 401 ? "Invalid or expired session." : "Authentication service unavailable." }, { status });
    }
    const result = await response.json();
    if (!result.users?.[0]?.localId || result.users[0].disabled) {
      return json({ error: "Invalid session." }, { status: 401 });
    }
    return null;
  } catch {
    return json({ error: "Authentication service unavailable." }, { status: 503 });
  }
}
