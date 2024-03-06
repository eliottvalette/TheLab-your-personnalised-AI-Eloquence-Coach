// Laboratoire/src/Account.jsx 
import React, { useState , useEffect} from "react";
import '../css/Account.css'
import useLocalStorage from "use-local-storage"

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"
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
const db = getFirestore(app)

async function authSignInWithGoogle(name,firstName) {
    signInWithPopup(auth, provider)
        .then(() => {
            console.log("Signed in with Google")
        }).catch((error) => {
            console.error(error.message)
        })
}
function authSignInWithEmail(emailInputEl, passwordInputEl) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, emailInputEl, passwordInputEl)
            .then(() => {
                console.log('Signed In with email');
                resolve(); // Résoudre la promesse en cas de succès
            })
            .catch((error) => {
                console.error(error.message);
                alert(error.message);
                reject(error); // Rejeter la promesse en cas d'erreur
            });
    });
}

async function authCreateAccountWithEmail(name, firstName, emailInputEl, passwordInputEl) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, emailInputEl, passwordInputEl);

        const user = userCredential.user;
        const userData = {
            name: name,
            firstName: firstName,
            email: user.email,
        };
        await addDoc(collection(db, "users"), userData);
    } catch (error) {
        console.error("Error creating account:", error);
    }
}
function authSignOut() {
    signOut(auth)
        .then(() => {
            console.log('Signed Out')
        }).catch((error) => {
            console.error(error.message)
        })
}
function authUpdateProfile(username) {    
    updateProfile(auth.currentUser, {
            displayName: username,
        }).then(() => {
            console.log("Profile updated")
            console.log("current user : " + auth.currentUser.displayName)
        }).catch((error) => {
        })
}


export default function Account(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [userData, setUserData] = useState({
        name: "",
        firstName: "",
      });
    const [isDarkMode] = useLocalStorage("isDarkMode",true);


    const handleSignIn = () => {
        authSignInWithEmail(email, password)
        .then(()=>{
            authUpdateProfile(`${name} ${firstName}`);
        })
        .catch((error) => {
        });
    }

    const handleCreateAccount = async () => {
        try {
          await authCreateAccountWithEmail(name, firstName, email, password);
          await authUpdateProfile(`${name} ${firstName}`);
          console.log("Account created and user data added to Firestore!");
        } catch (error) {
          console.error("Error creating account:", error);
        }
      };
    const handleSubmit = async (e)=>{
        e.preventDefault()
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            if (user) {
                setUserData({
                  name: user.displayName ? user.displayName.split(" ")[0] : "",
                  firstName: user.displayName ? user.displayName.split(" ")[1] : "",
                });
              }
        });
        return () => unsubscribe();
    }, [isLoggedIn]);
    
    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? "var(--wall-background-color)" : "var(--light-box-background-color)"; // Use CSS variables for customization
    }, [isDarkMode]);

    return(
        <main className="account-main-login" data-theme={isDarkMode ? "dark" : "light"}>
            <h1 className="account-h1">Mon compte</h1>
            {!isLoggedIn ? 
                // Not logged in view
                (<section className="logged-out-view" id="logged-out-view">
                    <form className="account-form-login" id="account-form-login" onSubmit={handleSubmit}>
                        <label id="name-label" htmlFor="name" className="account-label" >
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
                    
                        <label id="firstname-label" htmlFor="firstname" className="account-label" >
                                Prénom
                        </label>
                        <input 
                            type="firstname" 
                            className="account-input" 
                            id="firstname" 
                            name="firstname" 
                            placeholder="Votre prénom" 
                            onChange={(e)=>setFirstName(e.target.value)} 
                            autoComplete="given-name"
                        />
                        
                        <label id="email-label" htmlFor="email" className="account-label" >
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
                        
                        <label id="password-label" htmlFor="password" className="account-label">
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
                // Logged in view
                <section className="logged-in-view" id="logged-in-view">

                    <p className="account-p">Nom : {userData.name}</p>
                    <p className="account-p">Prénom : {userData.firstName}</p>
                    <p className="account-p">Email : {auth.currentUser.email}</p>
                    <button className="account-btn" id="account-disconnect" onClick={authSignOut}>Se déconnecter</button>
                </section>
             )}
            
            
        </main>
        )
}