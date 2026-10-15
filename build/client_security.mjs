export function assertSafeBundle(bundle, secrets = []) {
  for (const output of Object.values(bundle)) {
    const content = output.type === "chunk" ? output.code : String(output.source);
    if (secrets.some(secret => secret && content.includes(secret)) || /sk-(?:proj|svcacct)-[A-Za-z0-9_-]{20,}/.test(content)) {
      throw new Error("Build blocked: a private API key was found in a public asset.");
    }
    if (output.type === "chunk" && Object.keys(output.modules).some(id => /node_modules\/(?:openai|@mistralai)\//.test(id))) {
      throw new Error("Build blocked: an AI provider SDK was imported into the browser. Use the server functions.");
    }
  }
}
