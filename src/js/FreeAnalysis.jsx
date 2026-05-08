import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import DOMPurify from 'dompurify';

import '../css/freeAnalysis.css';
import whisperApi from './components/api_whisper.js';
import freeApi from './components/api_mistral.js';
import { extractText } from './components/pdf_reader.js';
import { buildAnalysisHtml, stripCodeFences } from './components/html_response.js';

import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./utils/firebase.js";

import PulseLoader from "react-spinners/PulseLoader";

Inputs.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export function Inputs({ id, name, label, onChange }) {
  return (
    <input
      type="text"
      className={name}
      name={name}
      id={id}
      placeholder={label}
      onChange={onChange}
    />
  );
}

async function saveResponse(response) {
  try {
    let mail = auth.currentUser ? auth.currentUser.email : "Utilisateur inconnu";
    const userData = {
      email: mail,
      Mode: "freeAnalysis",
      MistResponse: response,
    };
    await addDoc(collection(db, "responses"), userData);
  } catch (error) {
    console.error("Error saving response:", error);
  }
}

export default function FreeAnalysis() {
  const [who, setWho] = useState('');
  const [context, setContext] = useState('');
  const [publicValue, setPublicValue] = useState('');
  const [aim, setAim] = useState('');
  const [audiofile, setAudiofile] = useState(null);
  const [langue, setLangue] = useState('fr');
  const languageBtnRef = useRef(null);
  const [support, setSupport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const launchAnalysis = async () => {
    if (!(audiofile instanceof Blob)) {
      const errorMessage = langue === 'en'
        ? 'Please upload an audio file before starting the analysis.'
        : 'Veuillez importer un fichier audio avant de lancer l’analyse.';
      document.getElementById('response-container').innerHTML = `<p>${errorMessage}</p>`;
      document.getElementById('response-container').style.display = 'block';
      return;
    }

    setIsLoading(true);

    try {
      const audioTranscription = await whisperApi(audiofile, langue);

      let supportText = '';
      if (support && support instanceof Blob) {
        supportText = await extractText(support);
      }

      const MistResponse = await freeApi({
        userPrompt: audioTranscription,
        mistralModel: 2,
        maxTokens: 8000,
        who: who || 'La chef de pôle d oncologie',
        context: context || 'Non spécifié',
        audience: publicValue || 'Non spécifié',
        aim: aim || 'Non spécifié',
        support: supportText,
        language: langue,
      });

      console.log("MistResponse:", MistResponse);
      const cleanedResponse = DOMPurify.sanitize(stripCodeFences(MistResponse));
      const displayedResponse = buildAnalysisHtml({
        transcript: audioTranscription,
        analysis: cleanedResponse,
        language: langue,
      });
      saveResponse(displayedResponse);
      document.getElementById('response-container').innerHTML = displayedResponse;
      document.getElementById('response-container').style.display = 'block';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue.";
      document.getElementById('response-container').innerHTML = `<p>${errorMessage}</p>`;
      document.getElementById('response-container').style.display = 'block';
    } finally {
      setIsLoading(false);
    }
  };

  const aestheticFileChange = (e, labelId, id, icon) => {
    const fileName = e.target.value.split('\\').pop().split('.')[0];
    document.getElementById(labelId).innerHTML = `<span class="custom-${id}-upload" id="custom-${id}-upload">${fileName}<ion-icon name="${icon}"></ion-icon></span>`;
  };

  useEffect(() => {
    const handleFocus = () => {
      if (languageBtnRef.current) {
        languageBtnRef.current.focus();
      }
    };
    handleFocus();
  }, []);

  console.log("langue:", langue);

  const copyToClipboard = () => {
    const container = document.getElementById('response-container');
    if (container) {
      navigator.clipboard.writeText(container.innerText);
      alert('Texte copié !');
    }
  };

  return (
    <main className='free-main'>
      <section className="page-heading">
        <p className="page-eyebrow">Analyse de discours</p>
        <h1 className='free-h1'>Analyse Libre</h1>
        <p className="page-intro">Ajoutez votre audio, précisez le contexte, puis récupérez une synthèse exploitable et claire.</p>
      </section>
      <form className="free-form" action="" method="post" encType="multipart/form-data" id="baseForm" onSubmit={handleSubmit}>
        <div className='free-language'>
          <button
            type="button"
            ref={langue === 'fr' ? languageBtnRef : null}
            className={`free-language-btn free-btn ${langue === 'fr' ? 'focus' : ''}`}
            id='french'
            onClick={() => setLangue('fr')}
          >
            Français
          </button>
          <button
            type="button"
            ref={langue === 'en' ? languageBtnRef : null}
            className={`free-language-btn free-btn ${langue === 'en' ? 'focus' : ''}`}
            id='english'
            onClick={() => setLangue('en')}
          >
            Anglais
          </button>
        </div>
        <div className="form-input-files">
          <label htmlFor="fichier-el" className="free-label file-label" id='fichier-label-el'>
            <span className="custom-file-upload" id="custom-file-upload">Insérez votre fichier audio<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
          </label>
          <input type="file" className="free-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => { setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el', "file", "mic"); }} />

          <label htmlFor="support-el" className="free-label file-label" id='support-label-el'>
            <span className="custom-support-upload" id="custom-support-upload">(Optionnel) Insérez votre support de présentation<ion-icon name="document-outline" id="support-uploading-el"></ion-icon></span>
          </label>
          <input type="file" className="free-input" name="support-el" id="support-el" style={{ display: 'none' }} accept="application/pdf" onChange={(e) => { setSupport(e.target.files[0]); aestheticFileChange(e, 'support-label-el', "support", "document"); }} />
        </div>
        <div className="form-input-context">
          <label id="who-label" htmlFor="who-el free-input" className="free-label">
            Qui êtes-vous ?
          </label>
          <Inputs
            id="who"
            name="who-el free-input"
            label="Un professeur de médecine expert en ..."
            onChange={(e) => setWho(e.target.value)}
          />

          <label id="context-label" htmlFor="context-el free-input" className="free-label">
            Contexte
          </label>
          <Inputs
            id="context"
            name="context-el free-input"
            label="Congrès français de ..."
            onChange={(e) => setContext(e.target.value)}
          />

          <label id="public-label" htmlFor="public-el free-input" className="free-label">
            Public
          </label>
          <Inputs
            id="public"
            name="public-el free-input"
            label="Un public de chercheurs ..."
            onChange={(e) => setPublicValue(e.target.value)}
          />

          <label id="aim-label" htmlFor="aim-el free-input" className="free-label">
            Objectif
          </label>
          <Inputs
            id="aim"
            name="aim-el free-input"
            label="Vulgariser et transmettre les dernières avancées en ..."
            onChange={(e) => setAim(e.target.value)}
          />
        </div>
        <button type="button" className="launchbtn free-btn" id="launchbtn" onClick={launchAnalysis}>Analysez mon discours</button>
      </form>
      {isLoading ? (
        <div className='free-loading-div'>
          <h3 className='free-h3'>Chargement... Veuillez ne pas quitter la page</h3>
          <div className='free-loader-div'>
            <PulseLoader
              color={'#315f72'}
              loading={isLoading}
              size={20}
            />
          </div>
        </div>
      ) : null}
      <button type="button" className="free-btn copy-btn" onClick={copyToClipboard}>Copier le texte complet</button>
      <div className='response-container' id='response-container' style={{ display: 'none' }}></div>
    </main>
  );
}
