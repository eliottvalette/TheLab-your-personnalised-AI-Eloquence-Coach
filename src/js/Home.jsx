//Laboratoire/src/Home.jsx
//Le fichier Home constitue la page d'accueil du site, l'utilisateur peut comprendre son fonctionnement ou etre redirigé vers la page de connection

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
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

const features = [
    {
        icon: "mic-outline",
        title: "Analyse Vocale",
        description: "Analysez votre voix et votre diction pour une meilleure communication"
    },
    {
        icon: "school-outline",
        title: "Apprentissage IA",
        description: "Apprenez des meilleurs orateurs grâce à l'intelligence artificielle"
    },
    {
        icon: "trending-up-outline",
        title: "Progression Continue",
        description: "Suivez votre progression et améliorez-vous constamment"
    }
];

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);
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
        document.body.style.backgroundColor = isDarkMode ? "var(--wall-background-color)" : "var(--light-box-background-color)";
    }, [isDarkMode]);

    const handleClickAbout = () => {
        setIsAbout(!isAbout);
    };

    if (!isAbout) {
        return (
            <main className="home-main" data-theme={isDarkMode ? "dark" : "light"}>
                <section className="home-text-section">
                    <div className="home-header">
                        <h1 className="home-h1">Libérez votre potentiel d'orateur</h1>
                        <p className="home-p">
                            Devenez un orateur persuasif et influent en suivant les pas de vos orateurs favoris grâce à la puissance de l'intelligence artificielle à moindre coût
                        </p>
                        <div className="home-form" id="home-form">
                            <button className="home-about home-btn primary-btn" id="home-about" onClick={handleClickAbout}>
                                <ion-icon name="information-circle-outline"></ion-icon>
                                <span>En savoir plus</span>
                            </button>
                            <Link to={"/account"}>
                                <button className="home-sign-up home-btn secondary-btn" id="home-sign-up">
                                    <ion-icon name="log-in-outline"></ion-icon>
                                    <span>Se connecter</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="home-features">
                        {features.map((feature, index) => (
                            <div key={index} className="feature-item">
                                <ion-icon name={feature.icon}></ion-icon>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="home-img-section">
                    <div className="home-img-wrapper">
                        <img src={imageUrl} alt="" className="home-img" id="home-img"/>
                    </div>
                </section>
            </main>
        )
    } else {
        return (
            <main className="home-main-about" data-theme={isDarkMode ? "dark" : "light"}>
                <h1 className="home-h1">Deux modes à disposition :</h1>
                <div className="home-div-about">
                    <div className="home-analysis">
                        <ion-icon name="analytics-outline" class="feature-icon"></ion-icon>
                        <h2 className="home-h2">Le mode Analyse</h2>
                        <p>À partir du fichier audio de votre prise de parole et éventuellement votre support, une IA vous produit une analyse détaillée, personnalisée sur votre prise de parole. En effet grâce aux multiples précisions, le résultat sera au plus proche de vos attentes.</p>
                        <div className="feature-benefits">
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Analyse détaillée</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Feedback personnalisé</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Résultats rapides</span>
                            </div>
                        </div>
                    </div>
                    <div className="home-lab">
                        <ion-icon name="flask-outline" class="feature-icon"></ion-icon>
                        <h2 className="home-h2">The Lab</h2>
                        <p>Vous avez sans doute un orateur favori, que vous tentez d'imiter mais le jour-j vous ne parvenez pas à égaler son talent. Grâce à The Lab c'est possible, sélectionnez votre orateur parmi ceux disponibles ou soumettez le vôtre, et l'IA vous guidera pas à pas pour qu'un jour peut-être, l'élève dépasse le maître.</p>
                        <div className="feature-benefits">
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Modèles d'orateurs</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Guidage IA</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Progression guidée</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="home-about-btn home-btn" id="home-about" onClick={handleClickAbout}>
                    <span>Revenir à l'accueil</span>
                </button>
            </main>
        )
    }
}