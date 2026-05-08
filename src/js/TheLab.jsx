//Laboratoire/src/TheLab.jsx
// Le module TheLab est le deuxième mode a disposition. 
// L'utilisateur peut ici aussi soummetre le fichier audio de sa prise de parole ainsi que son support pdf. 
// Mais l'interet particulier de ce mode et le choix d'un orateur modèle (présent sur les cartes). Le fichier audio est envoyé a l'api whisper pour un speech to text, le tout est ensuite envoyé a l'api mistral pour aider l'utilisateur a perfectionner son discours en suivant les pas de l'orateur choisit.
import React, { useState, useEffect, useRef } from 'react'

import PropTypes from "prop-types";
import DOMPurify from 'dompurify';

import '../css/theLab.css'
import '../css/card.css'

import whisperApi from './components/api_whisper.js';
import { labApi } from './components/api_mistral.js'
import { buildAnalysisHtml, stripCodeFences } from './components/html_response.js';
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

import { collection, addDoc } from "firebase/firestore"
import { auth, db } from "./utils/firebase.js";

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
      mail = "Utilisateur inconnu"
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
  const [support, setSupport]= useState('Support non soumis');
  const [isLoading, setIsLoading] = useState(false)

  const launchAnalysis = async () => {
    if(modelChosen){
      console.log(`Lancement de l'analyse avec pour modèle : ${modelChosen}`)
      setIsLoading(true)
      const audioTranscription = await whisperApi(audiofile, langue);
      const modelTranscription = support instanceof Blob ? await whisperApi(support, langue) : "";
      let MistResponse = await labApi({
      modelChosen: modelChosen,
      modelStyle: modelStyle,
      mistralModel: 2,
      maxTokens: 3000,
      userPrompt: audioTranscription,
      language: langue,
      support: modelTranscription,
    });
      MistResponse = DOMPurify.sanitize(stripCodeFences(MistResponse));
      const displayedResponse = buildAnalysisHtml({
        transcript: audioTranscription,
        modelTranscript: modelTranscription,
        analysis: MistResponse,
        language: langue,
      });
      console.log(`MistralAi Response : \n ${MistResponse}`);
      setIsLoading(false);
      saveResponse(displayedResponse,modelChosen);
      document.getElementById('response-container').innerHTML = displayedResponse;
      document.getElementById('response-container').style.display = 'block';
    }else{
      const MistResponse = 'Veuillez sélectionner un modèle'
      document.getElementById('response-container').innerHTML = MistResponse;
      document.getElementById('response-container').style.display = 'block'
    }
    
  };


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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
  <main id="lab-main">
    <section className="page-heading">
      <p className="page-eyebrow">Coaching par modèle</p>
      <h1 className='lab-h1'>Le Lab'Oratoire</h1>
      <p className="page-intro">Sélectionnez un orateur, ajoutez votre audio, puis obtenez un retour structuré sur votre prise de parole.</p>
    </section>
    <section className='model-select-el'>
    <h2 className='lab-h2'>Choisissez votre modèle</h2>
      <select className="select-box" id="categories-el" name="categories-el" size="1" onChange={(e) => {setCategory(e.target.value)}}>
        <option className ="lab-option" value = "Politiques">Personnalités Politiques</option>
        <option className ="lab-option" value = "Economistes">Économistes</option>
        <option className ="lab-option" value = "Avocats">Avocats</option>
        <option className ="lab-option" value = "Celebrites">Célébrités</option>
        <option className ="lab-option" value = "Medecins">Médecins</option>
      </select>
      <Models
        category={category}
        modelChosen={modelChosen} 
        setModelChosen={setModelChosen}
        setModelStyle={setModelStyle}
      />
    </section>
    <div className='lab-language'>
      <button
        type="button"
        ref={langue === 'fr' ? languageBtnRef : null}
        className={`lab-language-btn lab-btn ${langue === 'fr' ? 'focus' : ''}`}
        id='french'
        onClick={() => setLangue('fr')}
      >
        Français
      </button>
      <button
        type="button"
        ref={langue === 'en' ? languageBtnRef : null}
        className={`lab-language-btn lab-btn ${langue === 'en' ? 'focus' : ''}`}
        id='english'
        onClick={() => setLangue('en')}
      >
        Anglais
      </button>
    </div>
    <form className="formBase" action="" method="post" encType="multipart/form-data" id="baseForm">
      <h2 className='lab-h2'>Votre présentation</h2>
      <input type="file" className="lab-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => { setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el',"file","mic") }}/>
      <label htmlFor="fichier-el" className="lab-label" id ='fichier-label-el'>
          <span className="custom-file-upload" id="custom-file-upload">Insérez votre fichier audio<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>
      <input type="file" className="lab-input" name="fichier-model-el" id="fichier-model-el" style={{ display: 'none' }} onChange={(e) => {setSupport(e.target.files[0]);aestheticFileChange(e, 'fichier-model-label-el',"file-model","mic") }}/>
      <label htmlFor="fichier-model-el" className="lab-label" id ='fichier-model-label-el'>
          <span className="custom-file-model-upload" id="custom-file-model-upload">(Optionnel) Insérez un extrait du discours de votre modèle<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>       

      <button type="button" className="launchbtn lab-btn" id="launchbtn" onClick={launchAnalysis}>Analysez mon discours en le comparant avec mon modèle</button>
    </form>
    {isLoading ? (
      <div className='lab-loading-div'>
        <h3 className='lab-h3'>Chargement... Veuillez ne pas quitter la page</h3>
        <div className='lab-loader-div'>
        <CircleLoader
          color={'#315f72'}
          loading={isLoading}
          size={200}
          data-testid="loader"
        />
        </div>
      </div>
    ) : (<></>)}
      <div className='response-container' id='response-container' style={{ display: 'none' }}></div>
  </main>

) }
