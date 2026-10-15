import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { assertSafeBundle } from "../build/client_security.mjs";
import { requireUser } from "../netlify/functions/lib/auth.mjs";
import transcribe from "../netlify/functions/transcribe.mjs";
import freeAnalysis from "../netlify/functions/free-analysis.mjs";
import labAnalysis from "../netlify/functions/lab-analysis.mjs";

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const request = token => new Request("https://example.test/api", {
  method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {},
});

test("all paid functions reject anonymous calls before invoking a provider", async () => {
  globalThis.fetch = () => { throw new Error("Unexpected network call"); };
  for (const handler of [transcribe, freeAnalysis, labAnalysis]) {
    assert.equal((await handler(request())).status, 401);
    assert.equal((await handler(new Request("https://example.test"))).status, 405);
  }
});

test("expired and disabled sessions cannot reach paid functions", async () => {
  for (const response of [new Response("{}", { status: 400 }), Response.json({ users: [{ localId: "user", disabled: true }] })]) {
    globalThis.fetch = async () => response.clone();
    assert.equal((await requireUser(request("invalid-token"))).status, 401);
  }
});

test("authentication outages fail closed", async () => {
  globalThis.fetch = async () => { throw new Error("Unavailable"); };
  assert.equal((await requireUser(request("token"))).status, 503);
});

test("session tokens are validated by Firebase rather than trusted from the client", async () => {
  globalThis.fetch = async (url, options) => {
    assert.equal(new URL(url).hostname, "identitytoolkit.googleapis.com");
    assert.deepEqual(JSON.parse(options.body), { idToken: "test-token" });
    return Response.json({ users: [{ localId: "authenticated-user" }] });
  };
  assert.equal(await requireUser(request("test-token")), null);
});

test("build rejects private credentials and browser provider SDKs", () => {
  const chunk = (code, modules = {}) => ({ main: { type: "chunk", code, modules } });
  assert.throws(() => assertSafeBundle(chunk("private-test-key"), ["private-test-key"]), /private API key/);
  assert.throws(() => assertSafeBundle(chunk("", { "/repo/node_modules/openai/index.mjs": {} })), /provider SDK/);
  assert.throws(() => assertSafeBundle(chunk("", { "/repo/node_modules/@mistralai/mistralai/index.js": {} })), /provider SDK/);
  assert.doesNotThrow(() => assertSafeBundle(chunk("fetch('/.netlify/functions/transcribe')")));
});


test("analysis endpoints reject unbounded token budgets before calling providers", async () => {
  const previous = process.env.MISTRAL_API_KEY;
  process.env.MISTRAL_API_KEY = "test-server-key";
  globalThis.fetch = async url => {
    assert.equal(new URL(url).hostname, "identitytoolkit.googleapis.com");
    return Response.json({ users: [{ localId: "authenticated-user" }] });
  };
  try {
    for (const handler of [freeAnalysis, labAnalysis]) {
      const response = await handler(new Request("https://example.test/api", {
        method: "POST",
        headers: { Authorization: "Bearer test-token", "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: "Test", modelChosen: "Speaker", modelStyle: "Formal", mistralModel: 0, maxTokens: 1000000 }),
      }));
      assert.equal(response.status, 400);
    }
  } finally {
    if (previous === undefined) delete process.env.MISTRAL_API_KEY;
    else process.env.MISTRAL_API_KEY = previous;
  }
});

test("transcription rejects empty audio before calling OpenAI", async () => {
  const previous = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = "test-server-key";
  globalThis.fetch = async url => {
    assert.equal(new URL(url).hostname, "identitytoolkit.googleapis.com");
    return Response.json({ users: [{ localId: "authenticated-user" }] });
  };
  try {
    const body = new FormData();
    body.append("audio", new Blob([], { type: "audio/webm" }), "empty.webm");
    body.append("language", "fr");
    const response = await transcribe(new Request("https://example.test/api", {
      method: "POST", headers: { Authorization: "Bearer test-token" }, body,
    }));
    assert.equal(response.status, 400);
  } finally {
    if (previous === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = previous;
  }
});
