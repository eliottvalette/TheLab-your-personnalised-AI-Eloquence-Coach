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
        title: "Voice Analysis",
        description: "Analyze your voice and diction for better communication"
    },
    {
        icon: "school-outline",
        title: "AI Learning",
        description: "Learn from the best speakers through artificial intelligence"
    },
    {
        icon: "trending-up-outline",
        title: "Continuous Progress",
        description: "Track your progress and improve constantly"
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
                        <h1 className="home-h1">Unleash your speaking potential</h1>
                        <p className="home-p">
                            Become a persuasive and influential speaker by following in the footsteps of your favorite speakers through the power of artificial intelligence at minimal cost
                        </p>
                        <div className="home-form" id="home-form">
                            <button className="home-about home-btn primary-btn" id="home-about" onClick={handleClickAbout}>
                                <ion-icon name="information-circle-outline"></ion-icon>
                                <span>Learn more</span>
                            </button>
                            <Link to={"/account"}>
                                <button className="home-sign-up home-btn secondary-btn" id="home-sign-up">
                                    <ion-icon name="log-in-outline"></ion-icon>
                                    <span>Sign in</span>
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
                <h1 className="home-h1">Two modes available:</h1>
                <div className="home-div-about">
                    <div className="home-analysis">
                        <ion-icon name="analytics-outline" class="feature-icon"></ion-icon>
                        <h2 className="home-h2">Analysis Mode</h2>
                        <p>Using the audio file of your speech and optionally your support material, an AI produces a detailed, personalized analysis of your speech. Thanks to multiple specifications, the result will be as close as possible to your expectations.</p>
                        <div className="feature-benefits">
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Detailed analysis</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Personalized feedback</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Quick results</span>
                            </div>
                        </div>
                    </div>
                    <div className="home-lab">
                        <ion-icon name="flask-outline" class="feature-icon"></ion-icon>
                        <h2 className="home-h2">The Lab</h2>
                        <p>You probably have a favorite speaker that you try to imitate but when the time comes, you can't match their talent. Thanks to The Lab it's possible, select your speaker from those available or submit your own, and AI will guide you step by step so that one day perhaps, the student surpasses the master.</p>
                        <div className="feature-benefits">
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Speaker models</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>AI guidance</span>
                            </div>
                            <div className="benefit-item">
                                <ion-icon name="checkmark-circle-outline"></ion-icon>
                                <span>Guided progression</span>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="home-about-btn home-btn" id="home-about" onClick={handleClickAbout}>
                    <span>Back to home</span>
                </button>
            </main>
        )
    }
}