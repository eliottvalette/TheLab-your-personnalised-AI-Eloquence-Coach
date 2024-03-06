// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll} from 'firebase/storage';
import { getDatabase, ref as dbRef, push } from 'firebase/database';
import {GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtSpp4gJw5edabZ2pv74Lnu7Otepzvtxg",
  authDomain: "thelab-247b2.firebaseapp.com",
  projectId: "thelab-247b2",
  storageBucket: "thelab-247b2.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth()
const db = getFirestore()
const googleProvider = new GoogleAuthProvider();

export const signInWithGooglePopUp = async () => {
  try {
    // Connexion avec Google
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Enregistrement de l'utilisateur dans Firestore
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)
    if (!userDoc.exists())
    {
      await saveUserToFirestore(user);
    }

    return user;
  } catch (error) {
    console.error('Erreur de connexion avec Google :', error);
    throw error;
  }
};

const saveUserToFirestore = async (user) => {
  const usersCollectionRef = doc(db, 'users', user.uid);

  // Vous pouvez personnaliser les données que vous souhaitez stocker dans Firestore
  const userData = {
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    nombrePrompt: 3,
  };

  await setDoc(usersCollectionRef, userData, { merge: true });
};

export const updateRequestCounter = async (user) => {
  try {
    const usersCollectionRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(usersCollectionRef);

    if (userDoc.exists()) {
      const oldNumber = userDoc.data().nombrePrompt || 0;

      // Mettez à jour le nombre de demandes dans Firestore
      await updateDoc(usersCollectionRef, { nombrePrompt: oldNumber - 1 });

    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
  }
};
export const accederRequestCounter = async (user) => {
  const usersCollectionRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(usersCollectionRef)

  if (userDoc.exists()) 
  {
    return userDoc.data().nombrePrompt || 0
  }
}
export const googleSignOut = () => signOut(auth)

export const useAuthListener = (setUser) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
      else{
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])
}

const storage = getStorage()
const database = getDatabase()

export const savePdf = async (pdf, name) => {
  // Générez votre PDF (remplacez par votre propre logique)
  const pdfFile = pdf
  let pdfFileName = name;

  // Référence au dossier où vous souhaitez stocker les PDF dans Firebase Storage
  const storageRef = ref(storage, 'pdfs/');
  const filesInStorage = await listAll(storageRef)
  const existingFileNames = filesInStorage.items.map(item => item.name) 
  let suffix = 1
  while (existingFileNames.includes(pdfFileName)) {
    pdfFileName = pdfFileName +`${suffix}.pdf`
    suffix ++
  }

  const newStorageRef = ref(storage, 'pdfs/' + pdfFileName)
  // Upload du PDF dans Firebase Storage
  uploadBytes(newStorageRef, pdfFile).then(snapshot => {
    // L'upload est terminé, récupérez l'URL du fichier
    getDownloadURL(snapshot.ref).then(downloadURL => {
      const pdfDatabaseRef = dbRef(database, 'pdfs');
      push(pdfDatabaseRef, {
        pdfURL: downloadURL,
      });

      // Vous pouvez également utiliser l'URL comme vous le souhaitez ici
    }).catch(error => {
      console.error("Erreur lors de la récupération de l'URL : ", error);
    });
  }).catch(error => {
    console.error("Erreur d'upload : ", error);
  });
}