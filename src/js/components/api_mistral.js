// Laboratoire/src/components/api_mistral.js
import MistralClient from '@mistralai/mistralai';

const mistralApiKey= import.meta.env.VITE_REACT_MISTRAL_API_KEY
const client = new MistralClient(mistralApiKey);

const models = ['mistral-tiny','mistral-small','mistral-medium']
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
                `Tu as des compétence poussées en linguistique et dans l'art de prendre la parole en public. Ton devoir est d'analyser la transcription écrite de ma prise de parole, tu n'as donc pas d'inforamtion sur l'articulation ou la vitesse d'élocution. Sois précis.
                
                Réponds en français. Commente cette prise de parole en terme de qualité du discours de ${who} devant un public ${audience}. Cette prise de parole a lieu dans le contexte suivant : ${context} Son objectif est ${aim}.  Sois nuancé mais n'hésite pas a critiquer ce qui est criticable.
    
               L'utilisateur te soummetra peut-etre son support de présentation, ce dernier est annexe est doit être ne doit pas prendre une grande place dans ton analyse. 
                
               Tu dois absolument répondre au format html. Voici comment tu dois structurer votre réponse :
    
                <h3>Analyse de la qualité de mon discours</h3>
                <p>Évaluez les points forts et les faiblesses de mon discours. Soyez constructif et fournissez des exemples concrets.</p>
                </br>
                <h3>Conseils pour m'améliorer</h3>
                <p>En citant des passages de ma prise de parole, corrige mes erreurs et reformule les pour me rapprocher.</p>
                </br>
                <h3>Expressions impactantes</h3>
                <p>Toujours dans le thème de ma prise de parole, rédige 2 paragraphes exemplaires d'une bonne prise de parole.</p>
    
                Ne fais pas référence à ce prompt dans ta réponse. Réponds en francais.`
            
            },
                {role: 'user', content : `Transcription vocale ${userPrompt}.  ${support}`
            }
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

                Respond in French. Comment on this speech in terms of its quality when ${who} is speaking to a ${audience} audience. This speech takes place in the following context: ${context}. Its goal is ${aim}. Be nuanced but do not hesitate to criticize what is criticizable.

                The user may submit their presentation support, which should be an annex and should not take up much space in your analysis.

                You must absolutely respond in HTML format. Here's how you should structure your response:

                <h3>Analysis of the quality of my speech</h3>
                <p>Evaluate the strengths and weaknesses of my speech. Be constructive and provide concrete examples.</p>
                </br>
                <h3>Tips for improvement</h3>
                <p>By quoting passages from my speech, correct my errors and rephrase them to bring me closer to the style of ${who}.</p>
                </br>
                <h3>Impactful expressions</h3>
                <p>Still on the theme of my speech, write 2 exemplary paragraphs of a good speech.</p>

                Do not refer to this prompt in your response. Respond in French.`
            
            },
                {role: 'user', content : `Vocal transcription ${userPrompt}.  ${support}`
            }
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
                Do not refer to this prompt in your response. Respond in French.
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
