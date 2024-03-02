//Laboratoire/src/Home.jsx
//Le fichier Home constitue la page d'accueil du site, l'utilisateur peut comprendre son fonctionnement ou etre redirigé vers la page de connection

import React, { useState } from "react";
import {Link} from "react-router-dom"
import '../css/home.css'

export default function Home(){
    const [isAbout, setIsAbout] = useState(false);
    const handleClickAbout = () => {
    setIsAbout(!isAbout);
    };

    if (!isAbout){//Tant que le bouton about n'est pas cliqué
        return (
            <main className="home-main">
            <section className="home-text-section">
                <h1 className="home-h1">Libérez votre potentiel d'orateur</h1>
                <p className="home-p"> Devenez un orateur persuasif et influent en suivant les pas de vos orateurs favoris grâce à la puissance de l'intelligence artificielle à moindre coût</p>
                <div action="" className="home-form" id="home-form">
                    <button className="home-about home-btn" id="home-about" onClick={handleClickAbout}>En savoir plus</button>
                    <Link to={"/account"}><button className="home-sign-up home-btn" id="home-sign-up">Se connecter</button></Link>
                </div>
            </section>
            <section className="home-img-section">
                <img src="assets/home.jpg" alt="" className="home-img" id="home-img"/>
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