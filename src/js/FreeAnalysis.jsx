const launchAnalysis = async () => {
    setIsLoading(true);

    // Get the transcription of the audio file using whisperApi
    const audioTranscription = await whisperApi(audiofile, langue);

    // Check if a support file is provided and is a Blob, then extract text if available
    let supportText = '';
    if (support && support instanceof Blob) {
        supportText = await extractText(support);
    }

    // Make the API call with the extracted text (if available) or an empty string
    const MistResponse = await freeApi({
        userPrompt: audioTranscription,
        mistralModel: 2,
        maxTokens: 3000,
        who: who,
        context: context,
        audience: publicValue,
        aim: aim,
        support: supportText,  // Use extracted text or empty string
        language: langue,
    });

    console.log("MistResponse : " + MistResponse);
    setIsLoading(false);
    saveResponse(MistResponse);
    document.getElementById('response-container').innerHTML = 
        `<strong>Audio Transcription:</strong> ${audioTranscription}<br/><br/>
         <strong>Mistral Response:</strong> ${MistResponse}`;
    document.getElementById('response-container').style.display = 'block';
};
