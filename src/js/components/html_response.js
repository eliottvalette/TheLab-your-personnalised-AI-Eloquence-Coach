export function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function stripCodeFences(value) {
  return String(value || "")
    .replace(/```html\n?/g, "")
    .replace(/```/g, "");
}

export function buildAnalysisHtml({ transcript, analysis, language = "fr", modelTranscript = "" }) {
  const transcriptTitle = language === "en" ? "Audio transcript" : "Transcription audio";
  const modelTranscriptTitle = language === "en" ? "Target excerpt transcript" : "Transcription de l'extrait modèle";
  const analysisTitle = language === "en" ? "Analysis" : "Analyse";

  const modelTranscriptHtml = modelTranscript
    ? `<h3>${modelTranscriptTitle}</h3><div class="transcription-block">${escapeHtml(modelTranscript)}</div>`
    : "";

  return `
    <h3>${transcriptTitle}</h3>
    <div class="transcription-block">${escapeHtml(transcript)}</div>
    ${modelTranscriptHtml}
    <h3>${analysisTitle}</h3>
    ${analysis}
  `;
}
