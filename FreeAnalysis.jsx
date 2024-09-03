// Laboratoire/src/FreeAnalysis.jsx 
// Le module FreeAnalysis est un des 2 modes a disposition. 
// L'utilisateur peut ici soummetre le fichier audio de sa prise de parole ainsi que son support pdf. Il est ensuite invité à préciser le contexte de ceux-ci.
// Le fichier audio est envoyé a l'api whisper pour un speech to text, le tout est ensuite envoyé a l'api mistral pour un compte rendu détaillé
import React, { useState } from 'react'
import '../css/freeAnalysis.css'
import PropTypes from "prop-types";
import whisperApi from './components/api_whisper.js';
import freeApi from './components/api_mistral.js'
import { extractText } from './components/pdf_reader.js'

Inputs.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange : PropTypes.func
};

export function Inputs({name, label, onChange}) {
  return (
    <input 
      type="text" 
      className ={name} 
      name={name} 
      id={name} 
      placeholder={label}
      onChange={onChange}
    />
  )
}

export default function FreeAnalysis() {
  
  const [who, setWho] = useState('');
  const [context, setContext] = useState('');
  const [publicValue, setPublicValue] = useState('');
  const [aim, setAim] = useState('');
  const [audiofile, setAudiofile]= useState('');
  const [support, setSupport]= useState('');

  const launchAnalysis = async () => {
      const audioTranscription = await whisperApi(audiofile);
      
      let supportText = '';
      if (support) {
          supportText = await extractText(support);
      }

      const mistResponse = await freeApi({
          userPrompt: audioTranscription,
          mistralModel: 0,
          maxTokens: 5000,
          who: who,
          context: context,
          audience: publicValue,
          aim: aim,
          support: supportText
      });
      
      document.getElementById('response-container').innerHTML = 
          `<strong>Audio Transcription:</strong> ${audioTranscription}<br/><br/>
          <strong>Mistral Response:</strong> ${mistResponse}`;
      document.getElementById('response-container').style.display = 'block';
  };


  const aestheticFileChange = (e, labelId, id , icon) => {
    const fileName = e.target.value.split('\\').pop().split('.')[0];
    document.getElementById(labelId).innerHTML = `<span class="custom-${id}-upload" id="custom-${id}-upload">${fileName}<ion-icon name=${icon}></ion-icon></span>`;
  };

  return (
    
    <main>
      
      <h1>Le Lab'oratoire</h1>
      <form className="formBase" action="" method="post" encType="multipart/form-data" id="baseForm">
        <div className="form-input-files">
          <label htmlFor="fichier-el" className="free-label" id ='fichier-label-el'>
              <span className="custom-file-upload" id="custom-file-upload">Inserez votre fichier audio<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
          </label>
          <input type="file" className="free-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => {setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el',"file","mic") }}/>
          
          <label htmlFor="support-el" className="free-label" id='support-label-el'>
              <span className="custom-support-upload" id="custom-support-upload">
                  (Optional) Inserez votre support de présentation
                  <ion-icon name="document-outline" id="support-uploading-el"></ion-icon>
              </span>
          </label>
          <input type="file" className="free-input" name="support-el" id="support-el" style={{ display: 'none' }} accept = "application/pdf" onChange={(e) => {setSupport(e.target.files[0]); aestheticFileChange(e, 'support-label-el',"support","document") }}/>
        </div>
        <div className="form-input-context">
          <Inputs
            name="who-el free-input"
            label="Qui êtes vous est quel est votre statut lors de ce discours (exemple : une professeur de...) "
            onChange={(e) => setWho(e.target.value)}
          />

          <Inputs
            name="context-el free-input"
            label="Précisez le contexte de votre prise de parole"
            onChange={(e) => setContext(e.target.value)}
          />
          
          <Inputs
            name="public-el free-input"
            label="A quel public vous adressez vous ?"
            onChange={(e) => setPublicValue(e.target.value)}
          />
          
          <Inputs
            name="aim-el free-input"
            label="Quel l'objectif de votre prise de parole ?"
            onChange={(e) => setAim(e.target.value)}
          />
        </div>        
        <button type="button" className="launchbtn free-btn" id="launchbtn" onClick={launchAnalysis}>Analyse mon discours</button>
      </form>
      <div className='response-container' id='response-container' style={{ display: 'none' }}></div>
    </main>
  )
}
