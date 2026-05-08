import MistralClient from '@mistralai/mistralai';

const mistralApiKey= import.meta.env.VITE_REACT_MISTRAL_API_KEY
const client = new MistralClient(mistralApiKey);

const models = ['mistral-small-4', 'mistral-large-3', 'mistral-medium-3.5']
const status = ['Waiting','in-progress','Terminated']
let responseStatus = status[0]

export default async function freeApi(params){
    const {userPrompt, mistralModel, maxTokens, who, context, audience, aim, support, language} =  params
    console.log("Extraction texte du support : " + support)
    responseStatus = status [1]
    console.log("mistralApi status : " + responseStatus)
    let chatResponse = ""
    if (language === "fr"){
            chatResponse = await client.chat({
            model: models[mistralModel],
            messages: [
                {role: 'system', content: 
                `Tu es un assistant spécialisé en rédaction de compte rendu de réunion. Ta tâche :
1. Compte rendu structuré : fournis un résumé de la réunion en 3 parties avec titres <h3>Objectifs</h3>, <h3>Points clés</h3>, <h3>Actions à entreprendre</h3>, chacune comprenant plusieurs paragraphes <p>...</p>.
2. Expressions clés : extraits les phrases et expressions clés, marquantes ou tranchantes et liste-les sous forme de <ul><li>...</li></ul> dans une section <h3>Expressions clés</h3>.

Réponds uniquement au format HTML.
                `
            },
                {role: 'user', content: `Transcription audio : ${userPrompt}

Contexte : la personne qui demande l'analyse est ${who}, le contexte est ${context}, l'audience est ${audience}, et l'objectif de la discussion est ${aim}.

Support : ${support}.`}
            ],
            temperature : 0.4,
            maxTokens : maxTokens,
    
        });
    } else {
            chatResponse = await client.chat({
            model: models[mistralModel],
            messages: [
                {role: 'system', content: 
                `You are an assistant specialized in meeting report writing. Your tasks:
                1. Structured meeting report: provide a summary in 3 parts with titles <h3>Objectives</h3>, <h3>Key points</h3>, <h3>Actions to take</h3>, each including multiple <p>...</p> paragraphs.
                2. Key expressions: extract key phrases and sentences and list them in a <h3>Key expressions</h3><ul><li>...</li></ul> section.
                3. Document format: if possible, generate a Word document (.docx). Otherwise, include a text box to copy the full transcription.

                Respond only in HTML format.
                `
                },
                {role: 'user', content: `Audio transcription: ${userPrompt}

Context: The requester is ${who}, the context is ${context}, the audience is ${audience}, and the meeting goal is ${aim}.

Support: ${support}.`}
            ],
            temperature : 0.4,
            maxTokens : maxTokens,
        });
    }
    
    responseStatus = status [2]
    console.log("mistralApi status : " + responseStatus)

    let finalresponse = chatResponse.choices[0].message.content
    return finalresponse;
}

export async function labApi(params){

    responseStatus = status [1]
    console.log(`MistralApi status : ${responseStatus}\n`)

    const {modelChosen, modelStyle, mistralModel, maxTokens, userPrompt, language, support} =  params
    let chatResponse = ""

    if (language === "fr"){

        chatResponse = await client.chat({
        model: models[mistralModel],
        messages: [
            {role: 'system', content: 
            `Tu as des compétence possées et linguistique et dans l'art de prendre la parole en public. Ton devoir est d'analyser la transcription écrite de ma prise de parole, tu n'as donc pas d'inforamtion sur l'articulation ou la vitesse d'élocution. Sois précis.

            Le plus important ici est que je souhaiterais m'exprimer dans le ${modelStyle} pour améliorer mes compétences oratoires.
            
            L'objectif est de m'aider à améliorer mes compétences oratoires en me fournissant une évaluation constructive. Veuillez formuler votre réponse dans un langage formel et utiliser le vouvoiement. Tu dois absolument répondre au format html.Voici comment vous devez structurer votre réponse :

            <h3>Analyse de la qualité de mon discours</h3>
            <p>Évaluez les points forts et les faiblesses de mon discours. Soyez constructif et fournissez des exemples concrets.</p>
            </br>
            <h3>Comparaison avec un orateur modèle</h3>
            <p>Comparez mes qualités oratoires avec celles de ${modelChosen}. Identifiez les similitudes et les différences.</p>
            </br>
            <h3>Conseils pour m'améliorer</h3>
            <p>En citant des passages de ma prise de parole, corrige mes erreurs et reformule les pour me rapprocher du style de ${modelChosen}</p>

            Ne fais pas référence à ce prompt dans ta réponse. Réponds en français.
            `},
            {role: 'user', content : `Vocal transcription ${userPrompt}.  ${support}`}
        ],
        temperature : 0.4,
        maxTokens : maxTokens,
    });

    } else {
            chatResponse = await client.chat({
            model: models[mistralModel],
            messages: [
                {role: 'system', content: 
                `You have advanced skills in linguistics and public speaking. Your task is to analyze the written transcription of my speech, so you have no information about articulation or speech speed. Be precise.

                The most important thing here is that I would like to express myself in the ${modelStyle} to improve my speaking skills.

                The objective is to help me improve my speaking skills by providing constructive feedback. Please formulate your response in a formal language and use formal address. You must absolutely respond in HTML format. Here's how you should structure your response:

                <h3>Analysis of the quality of my speech</h3>
                <p>Evaluate the strengths and weaknesses of my speech. Be constructive and provide concrete examples.</p>
                </br>
                <h3>Comparison with a model speaker</h3>
                <p>Compare my speaking qualities with those of ${modelChosen}. Identify the similarities and differences.</p>
                </br>
                <h3>Tips for improvement</h3>
                <p>By quoting passages from my speech, correct any errors and rephrase them to align with the style of ${modelChosen}.</p>
                Do not refer to this prompt in your response. Respond in English.
                `},
                {role: 'user', content : `${userPrompt}`}
            ],
            temperature : 0.4,
            maxTokens : maxTokens,
        });

    }    

    responseStatus = status [2]
    console.log(`MistralApi status : ${responseStatus}\n`)

    let finalresponse = chatResponse.choices[0].message.content

    return finalresponse;
}

export {responseStatus}
