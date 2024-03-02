// Laboratoire/src/Account.jsx 
import React, { useState } from "react";
import {Link} from "react-router-dom"
import '../css/Account.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBH4fHeMgD8yY7s6uF3OwWwBEXqlIrPwjQ",
  authDomain: "thelab-d1229.firebaseapp.com",
  projectId: "thelab-d1229",
  storageBucket: "thelab-d1229.appspot.com",
  appId: "1:334167578954:web:a87c19aee3a4d8f31ac9b3",
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <main className="account-main-login">
            <h1 className="account-h1">Mon compte</h1>
            <form className="account-form-login" id="account-form-login">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Votre email" onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" placeholder="Votre mot de passe" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="home-connect" id="home-connect" onClick={(e)=>authSignInWithEmail(email,password)}>Se connecter</button>
                <button className="home-create" id="home-create" onClick={(e)=>authCreateAccountWithEmail(email,password)}>Créer un compte</button>
            </form>
        </main>
        )
}