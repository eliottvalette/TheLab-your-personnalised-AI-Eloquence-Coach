// Laboratoire/src/components/api_mistral.js
import MistralClient from '@mistralai/mistralai';

const mistralApiKey= import.meta.env.VITE_REACT_MISTRAL_API_KEY
const client = new MistralClient(mistralApiKey);

const models = ['mistral-tiny','mistral-small','mistral-medium']
const status = ['Waiting','in-progress','Terminated']
let responseStatus = status[0]

export default async function freeApi(params){
    const {userPrompt, mistralModel, maxTokens, who, context, audience, aim, support } =  params
    console.log("Extraction texte du support : " + support)
    responseStatus = status [1]
    console.log("mistralApi status : " + responseStatus)
    
    const chatResponse = await client.chat({
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
    responseStatus = status [2]
    console.log("mistralApi status : " + responseStatus)

    let finalresponse = chatResponse.choices[0].message.content
    return finalresponse;
}

export async function labApi(params){

    responseStatus = status [1]
    console.log(`MistralApi status : ${responseStatus}\n`)

    const {modelChosen, modelStyle, mistralModel, maxTokens, userPrompt} =  params

    const chatResponse = await client.chat({
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
            {role: 'user', content : `${userPrompt}`}
        ],
        temperature : 0.4,
        maxTokens : maxTokens,
    });
    responseStatus = status [2]
    console.log(`MistralApi status : ${responseStatus}\n`)

    let finalresponse = chatResponse.choices[0].message.content

    return finalresponse;
}

export {responseStatus}
