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
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile } from "firebase/auth"

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
const provider = new GoogleAuthProvider()

function authSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then(() => {
            console.log("Signed in with Google")
        }).catch((error) => {
            console.error(error.message)
        })
}

function authSignInWithEmail(emailInputEl, passwordInputEl) {

    signInWithEmailAndPassword(auth, emailInputEl, passwordInputEl)
      .then(() => {
        console.log('Signed In with email')
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message); 
      });
  }
  
  function authCreateAccountWithEmail(emailInputEl, passwordInputEl) {
  
    createUserWithEmailAndPassword(auth, emailInputEl, passwordInputEl)
      .then(() => {
        console.log('Account created')
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
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            if (user) {
                console.log("current user : " + user.displayName)
              }
        });
        return () => unsubscribe();
    }, []);

    const handleSignIn = () => {
        authSignInWithEmail(email, password);
        updateProfile(auth.currentUser, {
            displayName:firstName,
          }).then(() => {
          }).catch((error) => {
            // An error occurred
          });
    }

    const handleCreateAccount = () => {
        authCreateAccountWithEmail(email, password);
        updateProfile(auth.currentUser, {
            displayName:firstName
          }).then(() => {
            console.log(user.displayName)
          }).catch((error) => {
            // An error occurred
          });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
    }

    return(
        <main className="account-main-login">
            <h1 className="account-h1">Mon compte</h1>
            {!isLoggedIn ? 
                // Login view
                (<section id="logged-in-view">
                    <form className="account-form-login" id="account-form-login" onSubmit={handleSubmit}>
                        <label htmlFor="name" className="account-label" >
                            Nom
                        </label>
                        <input 
                            type="name" 
                            className="account-input" 
                            id="name" 
                            name="name" 
                            placeholder="Votre nom" 
                            onChange={(e)=>setName(e.target.value)} 
                            autoComplete="family-name"
                        />
                    
                        <label htmlFor="firstname" className="account-label" >
                                Prénom
                        </label>
                        <input 
                            type="firstname" 
                            className="account-input" 
                            id="firstname" 
                            name="firstname" 
                            placeholder="Votre prénom" 
                            onChange={(e)=>setFirstName(e.target.value)} 
                            autoComplete="name"
                        />
                        
                        <label htmlFor="email" className="account-label" >
                            Email
                        </label>
                        <input 
                            type="email" 
                            className="account-input" 
                            id="email" 
                            name="email" 
                            placeholder="Votre email" 
                            onChange={(e)=>setEmail(e.target.value)} 
                            autoComplete="username"
                        />
                        
                        <label htmlFor="password" className="account-label">
                            Mot de passe
                        </label>
                        <input 
                            type="password" 
                            className="account-input" 
                            id="password" 
                            name="password" 
                            placeholder="Votre mot de passe" 
                            autoComplete="current-password" 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        
                        <button className="account-btn" id="account-connect" onClick={handleSignIn}>Se connecter</button>
                        <button className="account-btn" id="account-create" onClick={handleCreateAccount}>Créer un compte</button>
                        <button className="account-btn" id="account-google" onClick={authSignInWithGoogle}>Se connecter avec Google</button>

                    </form>
                </section>
             ) : (
                // Logout view
                <section id="logged-out-view">
                    <h2 className="account-h1">Bienvenue chez vous</h2>
                    <button className="account-btn" id="account-disconnect" onClick={authSignOut}>Se déconnecter</button>
                </section>
             )}
            
            
        </main>
        )
}