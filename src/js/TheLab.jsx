//Laboratoire/src/TheLab.jsx
// Le module TheLab est le deuxième mode a disposition. 
// L'utilisateur peut ici aussi soummetre le fichier audio de sa prise de parole ainsi que son support pdf. 
// Mais l'interet particulier de ce mode et le choix d'un orateur modèle (présent sur les cartes). Le fichier audio est envoyé a l'api whisper pour un speech to text, le tout est ensuite envoyé a l'api mistral pour aider l'utilisateur a perfectionner son discours en suivant les pas de l'orateur choisit.
import React, { useState } from 'react'
import '../css/theLab.css'
import '../css/card.css'
import PropTypes from "prop-types";
import whisperApi from './components/api_whisper.js';
import { labApi } from './components/api_mistral.js'
import data from './components/models_data.js'
import Card from './components/Cards.jsx'
import DOMPurify from 'dompurify';

Models.propTypes = {
  category: PropTypes.string.isRequired,
  modelChosen: PropTypes.string,
  setModelChosen: PropTypes.func.isRequired,
  setModelStyle: PropTypes.func.isRequired,
  
};

export function Models({category, modelChosen, setModelChosen , setModelStyle}) {
  const cards = data[0][category].map(item => {
      return (
          <Card
              key={item.id}
              id={item.id}
              coverImg={item.coverImg}
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

export default function TheLab() {
    
  const [audiofile, setAudiofile]= useState('');
  const [category, setCategory] = useState("Politiques");
  const [modelChosen, setModelChosen] = useState(null);
  const [modelStyle, setModelStyle] = useState(null);

  const launchAnalysis = async () => {
    if(modelChosen){
      console.log(`Lancement de l'analyse avec pour modèle : ${modelChosen}`)
      let MistResponse = await labApi({
      modelChosen: modelChosen,
      modelStyle: modelStyle,
      mistralModel: 0,
      maxTokens: 5000,
      userPrompt: await whisperApi(audiofile),
    });
      MistResponse = DOMPurify.sanitize(MistResponse);
      document.getElementById('response-container').innerHTML = MistResponse
      console.log(`MistralAi Response : \n ${MistResponse}`)
      document.getElementById('response-container').style.display = 'block'
    }else{
      const MistResponse = 'Veuillez selectionner un modèle'
      document.getElementById('response-container').innerHTML = MistResponse;
      document.getElementById('response-container').style.display = 'block'
    }

    
  };

  const aestheticFileChange = (e, labelId, id , icon) => {
    const fileName = e.target.value.split('\\').pop().split('.')[0];
    document.getElementById(labelId).innerHTML = `<span class="custom-${id}-upload" id="custom-${id}-upload">${fileName}<ion-icon name=${icon}></ion-icon></span>`;
  };

  return (
  <main>
    <h1>Le Lab'oratoire</h1>
    <h2>Choisissez votre modèle</h2>
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
    <form className="formBase" action="" method="post" encType="multipart/form-data" id="baseForm">
      <h2>Votre présentation</h2>
      
      <input type="file" className="lab-input" name="fichier-el" id="fichier-el" style={{ display: 'none' }} onChange={(e) => { setAudiofile(e.target.files[0]); aestheticFileChange(e, 'fichier-label-el',"file","mic") }}/>
      <label htmlFor="fichier-el" className="lab-label" id ='fichier-label-el'>
          <span className="custom-file-upload" id="custom-file-upload">Inserez votre fichier audio<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>
      <input type="file" className="lab-input" name="fichier-model-el" id="fichier-model-el" style={{ display: 'none' }} onChange={(e) => {aestheticFileChange(e, 'fichier-model-label-el',"file-model","mic") }}/>
      <label htmlFor="fichier-model-el" className="lab-label" id ='fichier-model-label-el'>
          <span className="custom-file-model-upload" id="custom-file-model-upload">(Facultatif) Inserez l'extrait d'un discours de votre modèle<ion-icon name="mic-outline" id="file-uploading-el"></ion-icon></span>
      </label>       

      <button type="button" className="launchbtn lab-btn" id="launchbtn" onClick={launchAnalysis}>Analyse mon discours en comparant avec mon modèle</button>
    </form>
    <div className='response-container' id='response-container' style={{ display: 'none' }}></div>
  </main>


)};

