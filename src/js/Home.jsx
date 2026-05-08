//Laboratoire/src/Home.jsx
//Le fichier Home constitue la page d'accueil du site, l'utilisateur peut comprendre son fonctionnement ou etre redirigé vers la page de connection

import React, { useState } from "react";
import { Link } from "react-router-dom"

import '../css/home.css'

// Import home image from assets
import homeImage from '../assets/home-black.jpg'

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
        title: "Progrès Continu",
        description: "Suivez vos progrès et améliorez-vous constamment"
    }
];

export default function Home() {
    const [isAbout, setIsAbout] = useState(false);


    const handleClickAbout = () => {
        setIsAbout(!isAbout);
    };

    if (!isAbout) {
        return (
            <main className="home-main">
                <section className="home-text-section">
                    <div className="home-header">
                        <h1 className="home-h1">The Lab</h1>
                        <p className="home-p">
                            Analysez vos prises de paroles et devenez plus persuasif grâce à la puissance de l'intelligence artificielle à moindre coût
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
                        <img src={homeImage} alt="" className="home-img" id="home-img"/>
                    </div>
                </section>
            </main>
        )
    } else {
        return (
            <main className="home-main-about">
                <h1 className="home-h1">Deux modes disponibles :</h1>
                <div className="home-div-about">
                    <div className="home-analysis">
                        <ion-icon name="analytics-outline" className="feature-icon"></ion-icon>
                        <h2 className="home-h2">Mode Analyse</h2>
                        <p>En utilisant le fichier audio de votre discours et optionnellement votre support de présentation, une IA produit une analyse détaillée et personnalisée de votre discours. Grâce à de multiples spécifications, le résultat sera au plus proche de vos attentes.</p>
                        <div className="feature-benefits">
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Analyse détaillée</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Retour personnalisé</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Résultats rapides</span>
                            </div>
                        </div>
                    </div>
                    <div className="home-lab">
                        <ion-icon name="flask-outline" className="feature-icon"></ion-icon>
                        <h2 className="home-h2">Le Lab'Oratoire</h2>
                        <p>Vous avez probablement un orateur favori que vous essayez d'imiter mais quand le moment vient, vous ne pouvez pas égaler son talent. Grâce au Lab'Oratoire c'est possible, sélectionnez votre orateur parmi ceux disponibles ou soumettez le vôtre, et l'IA vous guidera étape par étape pour qu'un jour peut-être, l'élève dépasse le maître.</p>
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
                    <span>Retour à l'accueil</span>
                </button>
            </main>
        )
    }
}
