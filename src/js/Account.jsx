// Laboratoire/src/Account.jsx 
import React, { useState } from "react";
import {Link} from "react-router-dom"
import '../css/Account.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBH4fHeMgD8yY7s6uF3OwWwBEXqlIrPwjQ",
  authDomain: "thelab-d1229.firebaseapp.com",
  projectId: "thelab-d1229",
  storageBucket: "thelab-d1229.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

function authSignInWithEmail(emailInputEl, passwordInputEl ) {
    const email = emailInputEl
    const password = passwordInputEl
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Very Great')
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authCreateAccountWithEmail(emailInputEl, passwordInputEl ) {
    const email = emailInputEl
    const password = passwordInputEl

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Great')
        })
        .catch((error) => {
            console.error(error.message)
        })
}

function authSignOut() {
    signOut(auth)
        .then(() => {
            console.log('Bye')
        }).catch((error) => {
            console.error(error.message)
        })
}


export default function Account(){
    return(
        <main className="account-main-login">
            <h1 className="account-h1">Mon compte</h1>
            <form className="account-form-login" id="account-form-login">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Votre email" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Votre mot de passe"/>
                <button className="home-submit" id="home-submit">Se connecter</button>
            </form>
        </main>
        )
}