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

// Import model images
import obamaImg from '../assets/obama.jpeg'
import macronImg from '../assets/macron.jpg'
import merkelImg from '../assets/merkel.jpg'
import trudeauImg from '../assets/trudeau.jpg'
import pikettyImg from '../assets/piketty.jpg'
import dufloImg from '../assets/esther-duflo.jpg'
import stiglitzImg from '../assets/stiglitz.jpg'
import krugmanImg from '../assets/krugman.jpg'
import senImg from '../assets/sen.jpg'
import badinterImg from '../assets/badinter.jpg'
import clooneyImg from '../assets/amal-clooney.jpeg'
import morettiImg from '../assets/dupont-moretti.jpg'
import taubiraImg from '../assets/taubira.jpg'
import watsonImg from '../assets/emma-watson.jpg'
import mandelaImg from '../assets/mandela.jpg'
import malalaImg from '../assets/malala-yousafzai.jpg'
import dicaprioImg from '../assets/dicaprio.jpeg'
import besseImg from '../assets/benjamin-besse.jpeg'
import barlesiImg from '../assets/fabrice-barlesi.jpg'
import mokImg from '../assets/tony-mok.jpeg'
import hirschImg from '../assets/martin-hirsch.jpg'
import soriaImg from '../assets/jean-charles-soria.jpeg'

import { initializeApp, getApp }  from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore"

import CircleLoader from "react-spinners/CircleLoader";

// Create a mapping of image filenames to their imported values
const imageMap = {
  'obama.jpeg': obamaImg,
  'macron.jpg': macronImg,
  'merkel.jpg': merkelImg,
  'trudeau.jpg': trudeauImg,
  'piketty.jpg': pikettyImg,
  'esther-duflo.jpg': dufloImg,
  'stiglitz.jpg': stiglitzImg,
  'krugman.jpg': krugmanImg,
  'sen.jpg': senImg,
  'badinter.jpg': badinterImg,
  'amal-clooney.jpeg': clooneyImg,
  'dupont-moretti.jpg': morettiImg,
  'taubira.jpg': taubiraImg,
  'emma-watson.jpg': watsonImg,
  'mandela.jpg': mandelaImg,
  'malala-yousafzai.jpg': malalaImg,
  'dicaprio.jpeg': dicaprioImg,
  'benjamin-besse.jpeg': besseImg,
  'fabrice-barlesi.jpg': barlesiImg,
  'tony-mok.jpeg': mokImg,
  'martin-hirsch.jpg': hirschImg,
  'jean-charles-soria.jpeg': soriaImg
};

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

Models.propTypes = {
  category: PropTypes.string.isRequired,
  modelChosen: PropTypes.string,
  setModelChosen: PropTypes.func.isRequired,
  setModelStyle: PropTypes.func.isRequired,
};

export function Models({category, modelChosen, setModelChosen , setModelStyle}) {
  
  const cards = data[0][category].map((item) => {
    // Get the imported image from our map
    const imagePath = imageMap[item.coverImg];
    
    return (
        <Card
            key={item.id}
            id={item.id}
            coverImg={imagePath}
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
  const [support, setSupport]= useState('Support not submited');
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

  // Ajout d'un useEffect pour scroller en haut de la page au montage du composant
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'au montage du composant

  return (
  <main id="lab-main" data-theme={isDarkMode ? "dark" : "light"} >
    <h1 className='lab-h1'>The Lab</h1>
    <h2 className='lab-h2'>Choose your model</h2>
    <div className='model-select-el'>
      <select className="select-box" id="categories-el" name="categories-el" size="1" onChange={(e) => {setCategory(e.target.value)}}>
        <option className ="lab-option" value = "Politiques">Political Figures</option>
        <option className ="lab-option" value = "Economistes">Economists</option>
        <option className ="lab-option" value = "Avocats">Lawyers</option>
        <option className ="lab-option" value = "Celebrites">Celebrities</option>
        <option className ="lab-option" value = "Medecins">Doctors</option>
      </select>
      <Models
        category={category}
        modelChosen={modelChosen} 
        setModelChosen={setModelChosen}
        setModelStyle={setModelStyle}
      />
    </div>
    <h2 className='lab-h2'>Your presentation</h2>
    <div className='lab-language'>
      <button
        ref={langue === 'fr' ? languageBtnRef : null}
        className={`lab-language-btn lab-btn ${langue === 'fr' ? 'focus' : ''}`}
        id='french'
        onClick={() => setLangue('fr')}
      >
        French
      </button>
      <button
        ref={langue === 'en' ? languageBtnRef : null}
        className={`lab-language-btn lab-btn ${langue === 'en' ? 'focus' : ''}`}
        id='english'
        onClick={() => setLangue('en')}
      >
        English
      </button>
    </div>
    <form className="formBase" action="" method="post" encType="multipart/form-data" id="baseForm">
      <input type="file" className="lab-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => { setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el',"file","mic") }}/>
      <label htmlFor="fichier-el" className="lab-label" id ='fichier-label-el'>
          <span className="custom-file-upload" id="custom-file-upload">Insert your audio file<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>
      <input type="file" className="lab-input" name="fichier-model-el" id="fichier-model-el" style={{ display: 'none' }} onChange={(e) => {setSupport(e.target.files[0]);aestheticFileChange(e, 'fichier-model-label-el',"file-model","mic") }}/>
      <label htmlFor="fichier-model-el" className="lab-label" id ='fichier-model-label-el'>
          <span className="custom-file-model-upload" id="custom-file-model-upload">(Optional) Insert an excerpt of your model's speech<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>       

      <button type="button" className="launchbtn lab-btn" id="launchbtn" onClick={launchAnalysis}>Analyze my speech by comparing with my model</button>
    </form>
    {isLoading ? (
      <div className='lab-loading-div'>
        <h3 className='lab-h3'>Loading... Please do not leave the page</h3>
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