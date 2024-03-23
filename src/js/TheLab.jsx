//Laboratoire/src/TheLab.jsx
// Le module TheLab est le deuxième mode a disposition. 
// L'utilisateur peut ici aussi soummetre le fichier audio de sa prise de parole ainsi que son support pdf. 
// Mais l'interet particulier de ce mode et le choix d'un orateur modèle (présent sur les cartes). Le fichier audio est envoyé a l'api whisper pour un speech to text, le tout est ensuite envoyé a l'api mistral pour aider l'utilisateur a perfectionner son discours en suivant les pas de l'orateur choisit.
import React, { useState, useEffect, useRef } from 'react'

import PropTypes from "prop-types";
import DOMPurify from 'dompurify';
import useLocalStorage from "use-local-storage"

import '../css/theLab.css'
import '../css/card.css'

import whisperApi from './components/api_whisper.js';
import { labApi } from './components/api_mistral.js'
import data from './components/models_data.js'
import Card from './components/Cards.jsx'

import { initializeApp, getApp }  from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import CircleLoader from "react-spinners/CircleLoader";

const firebaseConfig = {
    apiKey: "AIzaSyBH4fHeMgD8yY7s6uF3OwWwBEXqlIrPwjQ",
    authDomain: "thelab-d1229.firebaseapp.com",
    projectId: "thelab-d1229",
    storageBucket: "thelab-d1229.appspot.com",
    appId: "1:334167578954:web:a87c19aee3a4d8f31ac9b3",
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const firebaseApp = getApp();
const modelStorage = getStorage(firebaseApp, "gs://thelab-d1229.appspot.com");
const modelImgRef = ref(modelStorage, 'model-images/');

Models.propTypes = {
  category: PropTypes.string.isRequired,
  modelChosen: PropTypes.string,
  setModelChosen: PropTypes.func.isRequired,
  setModelStyle: PropTypes.func.isRequired,
};

export function Models({category, modelChosen, setModelChosen , setModelStyle}) {
  const [modelImages, setModelImages] = useState([]);
  

  useEffect(() => {
    const imagePromises = [];
    data[0][category].forEach(item => {
      const imageRef = ref(modelImgRef, item.coverImg);
      imagePromises.push(getDownloadURL(imageRef));
    });

    Promise.all(imagePromises)
      .then(urls => setModelImages(urls))
      .catch(error => console.error("Error fetching image URLs:", error));
  }, [category]);

  const cards = data[0][category].map((item,index) => {
    return (
        <Card
            key={item.id}
            id={item.id}
            coverImg={modelImages[index]}
            name={item.name}
            description={item.description}
            onClick={() => {setModelChosen(item.name);setModelStyle(item.style)}}
            isSelected={modelChosen === item.name}
        />
      );
    });
  return (
      <section className="cards-list">
          {cards}
      </section>
  );
}

async function saveResponse(response,modelChosen){
  try {
    let mail
    if (auth.currentUser){
      mail = auth.currentUser.email
    }else{
      mail = "Unknown user"
    }
    const userData = {
      email: mail,
      modelChosen: modelChosen,
      Mode: "TheLab",
      MistResponse: response,  
    };
    await addDoc(collection(db, "responses"), userData);
  } catch (error) {
      console.error("Error creating account:", error);
  } 
}

export default function TheLab() {
    
  const [audiofile, setAudiofile]= useState('');
  const [langue, setLangue]= useState('fr');
  const languageBtnRef = useRef(null);
  const [category, setCategory] = useState("Politiques");
  const [modelChosen, setModelChosen] = useState(null);
  const [modelStyle, setModelStyle] = useState(null);
  const [support, setSupport]= useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode",true);

  const launchAnalysis = async () => {
    if(modelChosen){
      console.log(`Lancement de l'analyse avec pour modèle : ${modelChosen}`)
      setIsLoading(true)
      let MistResponse = await labApi({
      modelChosen: modelChosen,
      modelStyle: modelStyle,
      mistralModel: 2,
      maxTokens: 3000,
      userPrompt: await whisperApi(audiofile,langue),
      language: langue,
      support: support,
    });
      MistResponse = DOMPurify.sanitize(MistResponse);
      console.log(`MistralAi Response : \n ${MistResponse}`);
      setIsLoading(false);
      saveResponse(MistResponse,modelChosen);
      document.getElementById('response-container').innerHTML = MistResponse;
      document.getElementById('response-container').style.display = 'block';
    }else{
      const MistResponse = 'Veuillez selectionner un modèle'
      document.getElementById('response-container').innerHTML = MistResponse;
      document.getElementById('response-container').style.display = 'block'
    }
    
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "var(--wall-background-color)" : "var(--light-box-background-color)"; // Use CSS variables for customization
  }, [isDarkMode]);

  const aestheticFileChange = (e, labelId, id , icon) => {
    const fileName = e.target.value.split('\\').pop().split('.')[0];
    document.getElementById(labelId).innerHTML = `<span class="custom-${id}-upload" id="custom-${id}-upload">${fileName}<ion-icon name=${icon}></ion-icon></span>`;
  };

  useEffect(() => {
    const handleFocus = () => {
      if (languageBtnRef.current) {
        languageBtnRef.current.focus();
      }
    };
    handleFocus();
  }, []);

  console.log("langue : " + langue)

  return (
  <main id="lab-main" data-theme={isDarkMode ? "dark" : "light"} >
    <h1 className='lab-h1'>The Lab</h1>
    <h2 className='lab-h2'>Choisissez votre modèle</h2>
    <div className='model-select-el'>
      <aside>
        <select className="select-box" id="categories-el" name="categories-el" size="1" onChange={(e) => {setCategory(e.target.value)}}>
          <option className ="lab-option" value = "Politiques">Personnalités Politiques</option>
          <option className ="lab-option" value = "Economistes">Economistes</option>
          <option className ="lab-option" value = "Avocats">Avocats</option>
          <option className ="lab-option" value = "Celebrites">Célébrités</option>
          <option className ="lab-option" value = "Medecins">Médecins</option>
        </select>
      </aside>
      <Models
      category={category}
      modelChosen={modelChosen} 
      setModelChosen={setModelChosen}
      setModelStyle={setModelStyle}/>
    </div>
    <h2 className='lab-h2'>Votre présentation</h2>
    <div className='lab-language'>
      <button
        ref={langue === 'fr' ? languageBtnRef : null}
        className={`lab-language-btn lab-btn ${langue === 'fr' ? 'focus' : ''}`}
        id='french'
        onClick={() => setLangue('fr')}
      >
        Français
      </button>
      <button
        ref={langue === 'en' ? languageBtnRef : null}
        className={`lab-language-btn lab-btn ${langue === 'en' ? 'focus' : ''}`}
        id='english'
        onClick={() => setLangue('en')}
      >
        Anglais
      </button>
    </div>
    <form className="formBase" action="" method="post" encType="multipart/form-data" id="baseForm">
      <input type="file" className="lab-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => { setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el',"file","mic") }}/>
      <label htmlFor="fichier-el" className="lab-label" id ='fichier-label-el'>
          <span className="custom-file-upload" id="custom-file-upload">Inserez votre fichier audio<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>
      <input type="file" className="lab-input" name="fichier-model-el" id="fichier-model-el" style={{ display: 'none' }} onChange={(e) => {setSupport(e.target.files[0]);aestheticFileChange(e, 'fichier-model-label-el',"file-model","mic") }}/>
      <label htmlFor="fichier-model-el" className="lab-label" id ='fichier-model-label-el'>
          <span className="custom-file-model-upload" id="custom-file-model-upload">(Facultatif) Inserez l'extrait d'un discours de votre modèle<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>       

      <button type="button" className="launchbtn lab-btn" id="launchbtn" onClick={launchAnalysis}>Analyse mon discours en comparant avec mon modèle</button>
    </form>
    {isLoading ? (
      <div className='lab-loading-div'>
        <h3 className='lab-h3'>Chargement en cours... Veuillez ne pas quitter la page</h3>
        <div className='lab-loader-div'>
        <CircleLoader
          color={isDarkMode ? 'rgb(249, 249, 200)' : 'rgb(29, 29, 29)'}
          loading={isLoading}
          size={200}
          data-testid="loader"
        />
        </div>
          
          
      </div>
    ) : (<></>)}
      <div className='response-container' id='response-container' style={{ display: 'none' }}></div>
  </main>


)};