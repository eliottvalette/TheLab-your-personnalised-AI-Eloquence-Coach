// Laboratoire/src/Account.jsx 
import React, { useState , useEffect} from "react";
import {Link} from "react-router-dom"
import '../css/Account.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged } from "firebase/auth"

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

function authSignInWithEmail(emailInputEl, passwordInputEl) {
    const email = emailInputEl;
    const password = passwordInputEl;
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('You are now connected to you account');
        console.log(userCredential)
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message); 
      });
  }
  
  function authCreateAccountWithEmail(emailInputEl, passwordInputEl) {
    const email = emailInputEl;
    const password = passwordInputEl;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created');
        console.log(userCredential)
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message); 
      });
  }

function authSignOut() {
    signOut(auth)
        .then(() => {
            console.log('Signed Out')
        }).catch((error) => {
            console.error(error.message)
        })
}


export default function Account(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log(isLoggedIn)
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    return(
        <main className="account-main-login">
            <h1 className="account-h1">Mon compte</h1>
            {!isLoggedIn ? 
                // Login view
                (<section id="logged-in-view">
                    <form className="account-form-login" id="account-form-login">
                        <label htmlFor="email" className="account-label" >Email</label>
                        <input type="email" className="account-input" id="email" name="email" placeholder="Votre email" onChange={(e)=>setEmail(e.target.value)} autoComplete="username"/>
                        <label htmlFor="password" className="account-label">Mot de passe</label>
                        <input type="password" className="account-input" id="password" name="password" placeholder="Votre mot de passe" autoComplete="current-password" onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="account-btn" id="home-connect" onClick={() => {authSignInWithEmail(email,password)}}>Se connecter</button>
                        <button className="account-btn" id="home-create" onClick={() => {authCreateAccountWithEmail(email,password)}}>Créer un compte</button>
                    </form>
                </section>
             ) : (
                // Logout view
                <section id="logged-out-view">
                    <h2 className="account-h1">Bienvenue chez vous</h2>
                    <button className="account-btn" id="home-disconnect" onClick={() => {authSignOut()}}>Se déconnecter</button>f
                </section>
             )}
            
            
        </main>
        )
}