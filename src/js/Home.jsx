//Laboratoire/src/Home.jsx
//Le fichier Home constitue la page d'accueil du site, l'utilisateur peut comprendre son fonctionnement ou etre redirigé vers la page de connection

import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import useLocalStorage from "use-local-storage"

import '../css/home.css'
import { initializeApp, getApp } from "firebase/app"
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBH4fHeMgD8yY7s6uF3OwWwBEXqlIrPwjQ",
    authDomain: "thelab-d1229.firebaseapp.com",
    projectId: "thelab-d1229",
    storageBucket: "thelab-d1229.appspot.com",
    appId: "1:334167578954:web:a87c19aee3a4d8f31ac9b3",
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
const homeStorage = getStorage(firebaseApp, "gs://thelab-d1229.appspot.com");
const homeImg = ref(homeStorage, 'home-image/home.jpg');


export default function Home(){
    const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode",true);
    const [imageUrl, setImageUrl] = useState('');
    const [isAbout, setIsAbout] = useState(false);

    useEffect(() => {
        getDownloadURL(homeImg)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.error("Error downloading image: ", error);
            });
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? "var(--wall-background-color)" : "var(--light-box-background-color)"; // Use CSS variables for customization
    }, [isDarkMode]);
    
    const handleClickAbout = () => {
    setIsAbout(!isAbout);
    };

    if (!isAbout){//Tant que le bouton about n'est pas cliqué
        return (
            <main className="home-main" data-theme={isDarkMode ? "dark" : "light"}>
            <section className="home-text-section">
                <h1 className="home-h1">Libérez votre potentiel d'orateur</h1>
                <p className="home-p"> Devenez un orateur persuasif et influent en suivant les pas de vos orateurs favoris grâce à la puissance de l'intelligence artificielle à moindre coût</p>
                <div action="" className="home-form" id="home-form">
                    <button className="home-about home-btn" id="home-about" onClick={handleClickAbout}>En savoir plus</button>
                    <Link to={"/account"}><button className="home-sign-up home-btn" id="home-sign-up">Se connecter</button></Link>
                </div>
            </section>
            <section className="home-img-section">
                <img src={imageUrl} alt="" className="home-img" id="home-img"/>
            </section>
          </main>
        )
    } else {
        return (
            <main className="home-main-about">
                <h1 className="home-h1">Deux modes à disposition :</h1>
                <div className="home-div-about">
                    <p className="home-analysis"><strong className="home-h2">Le mode Analyse</strong><br/>A partir du fichier audio de votre prise de parole et éventuellement votre support, une IA vous produit une analyse détaillée, personnalisée sur votre prise de parole. En effet grace aux multiples précisions, le résultat sera au plus proche de vos attentes</p>
                    <p className="home-lab"><strong className="home-h2">The Lab</strong><br/>Vous avez sans doute un orateur favoris, que vous tentez d'imiter mais le jour-j vous ne parvenez pas a égaler son talent. Grace à the Lab c'est possible, sélectionner votre orateur parmi ceux disponible au soummetez le votre, et l'IA vous guidera pas à pas pour qu'un jour peut-être, l'élève dépasse le maître</p>
                </div>
                <button className="home-about-btn home-btn" id="home-about" onClick={handleClickAbout}>Revenir à l'accueil</button>
            </main>
        )
    }
}