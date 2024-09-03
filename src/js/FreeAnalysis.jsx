import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import useLocalStorage from "use-local-storage";

import '../css/freeAnalysis.css';
import whisperApi from './components/api_whisper.js';
import freeApi from './components/api_mistral.js';
import { extractText } from './components/pdf_reader.js';

import { initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import CircleLoader from "react-spinners/CircleLoader";

const firebaseConfig = {
  apiKey: "AIzaSyBH4fHeMgD8yY7s6uF3OwWwBEXqlIrPwjQ",
  authDomain: "thelab-d1229.firebaseapp.com",
  projectId: "thelab-d1229",
  storageBucket: "thelab-d1229.appspot.com",
  appId: "1:334167578954:web:a87c19aee3a4d8f31ac9b3",
};

const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
const auth = getAuth(app);
const db = getFirestore(app);

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
    let mail = auth.currentUser ? auth.currentUser.email : "Unknown user";
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
  const [audiofile, setAudiofile] = useState(null);  // Initialize as null
  const [langue, setLangue] = useState('fr');
  const languageBtnRef = useRef(null);
  const [support, setSupport] = useState(null);  // Initialize as null
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const launchAnalysis = async () => {
    setIsLoading(true);

    // Get the transcription of the audio file using whisperApi
    const audioTranscription = await whisperApi(audiofile, langue);

    // Check if a support file is provided and extract text if available
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

    console.log("MistResponse:", MistResponse);
    setIsLoading(false);
    saveResponse(MistResponse);
    document.getElementById('response-container').innerHTML =
      `<strong>Audio Transcription:</strong> ${audioTranscription}<br/><br/>
       <strong>Mistral Response:</strong> ${MistResponse}`;
    document.getElementById('response-container').style.display = 'block';
  };

  const aestheticFileChange = (e, labelId, id, icon) => {
    const fileName = e.target.value.split('\\').pop().split('.')[0];
    document.getElementById(labelId).innerHTML = `<span class="custom-${id}-upload" id="custom-${id}-upload">${fileName}<ion-icon name="${icon}"></ion-icon></span>`;
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "var(--wall-background-color)" : "var(--light-box-background-color)";
  }, [isDarkMode]);

  useEffect(() => {
    const handleFocus = () => {
      if (languageBtnRef.current) {
        languageBtnRef.current.focus();
      }
    };
    handleFocus();
  }, []);

  console.log("langue:", langue);

  return (
    <main className='free-main' data-theme={isDarkMode ? "dark" : "light"}>
      <h1 className='free-h1'>Analyse Libre</h1>
      <form className="free-form" action="" method="post" encType="multipart/form-data" id="baseForm" onSubmit={handleSubmit}>
        <div className='free-language'>
          <button
            ref={langue === 'fr' ? languageBtnRef : null}
            className={`free-language-btn free-btn ${langue === 'fr' ? 'focus' : ''}`}
            id='french'
            onClick={() => setLangue('fr')}
          >
            Français
          </button>
          <button
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
            <span className="custom-file-upload" id="custom-file-upload">Inserez votre fichier audio<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
          </label>
          <input type="file" className="free-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => { setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el', "file", "mic"); }} />

          <label htmlFor="support-el" className="free-label file-label" id='support-label-el'>
            <span className="custom-support-upload" id="custom-support-upload">(Recommandé) Inserez votre support de présentation<ion-icon name="document-outline" id="support-uploading-el"></ion-icon></span>
          </label>
          <input type="file" className="free-input" name="support-el" id="support-el" style={{ display: 'none' }} accept="application/pdf" onChange={(e) => { setSupport(e.target.files[0]); aestheticFileChange(e, 'support-label-el', "support", "document"); }} />
        </div>
        <div className="form-input-context">
          <label id="who-label" htmlFor="who-el free-input" className="free-label">
            Qui êtes vous ?
          </label>
          <Inputs
            id="who"
            name="who-el free-input"
            label="Une professeur de médecine experte en ..."
            onChange={(e) => setWho(e.target.value)}
          />

          <label id="context-label" htmlFor="context-el free-input" className="free-label">
            Contexte
          </label>
          <Inputs
            id="context"
            name="context-el free-input"
            label="Congrès francais de ..."
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
        <button type="button" className="launchbtn free-btn" id="launchbtn" onClick={launchAnalysis}>Analyse mon discours</button>
      </form>
      {isLoading ? (
        <div className='free-loading-div'>
          <h3 className='free-h3'>Chargement en cours... Veuillez ne pas quitter la page</h3>
          <div className='free-loader-div'>
            <CircleLoader
              color={isDarkMode ? 'rgb(249, 249, 200)' : 'rgb(29, 29, 29)'}
              loading={isLoading}
              size={200}
              data-testid="loader"
            />
          </div>
        </div>
      ) : null}
      <div className='response-container' id='response-container' style={{ display: 'none' }}></div>
    </main>
  );
}
