// Laboratoire/src/components/api_mistral.js
import MistralClient from '@mistralai/mistralai';
import { buildFreeAnalysisMessages, buildLabMessages } from './prompts.js';

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
    const chatResponse = await client.chat({
        model: models[mistralModel],
        messages: buildFreeAnalysisMessages({ userPrompt, who, context, audience, aim, support, language }),
        temperature : 0.3,
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

    const {modelChosen, modelStyle, mistralModel, maxTokens, userPrompt, language, support} =  params
    const chatResponse = await client.chat({
        model: models[mistralModel],
        messages: buildLabMessages({ modelChosen, modelStyle, userPrompt, support, language }),
        temperature : 0.3,
        maxTokens : maxTokens,
    });

    responseStatus = status [2]
    console.log(`MistralApi status : ${responseStatus}\n`)

    let finalresponse = chatResponse.choices[0].message.content

    return finalresponse;
}

export {responseStatus}
