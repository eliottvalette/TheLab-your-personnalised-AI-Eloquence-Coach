// Laboratoire/src/components/api_whisper.js
import OpenAI from "openai";

const whisperApiKey= import.meta.env.VITE_REACT_OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: whisperApiKey,
    dangerouslyAllowBrowser: true
});

const status = ['Waiting','in-progress','Terminated']
const transcriptionModel = "gpt-4o-transcribe";

export default async function whisperApi(audio_file,langue) {
  console.log(`WhisperApi status: ${status[1]} \n`)
   try{
     const completion = await openai.audio.transcriptions.create({
     file: audio_file,
     model: transcriptionModel,
     language: langue,
   });
     console.log(`WhisperApi status : ${status[2]} \n ` )
     console.log(`\nTranscritption vocale : \n ${completion.text}\n`);
     return completion.text;
   } 
   catch (error) {
     console.error("Erreur lors de l'appel à l'API OpenAI Audio Transcription:", error);
     return "Erreur dans la transcription audio.";
     }
}
