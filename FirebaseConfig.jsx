import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

    authDomain: "i-have-no-idea-what-i-m-f1607.firebaseapp.com",
    projectId: "i-have-no-idea-what-i-m-f1607",
    storageBucket: "i-have-no-idea-what-i-m-f1607.appspot.com",
    messagingSenderId: "972410165015",
    appId: "1:972410165015:web:e86311658ee742eeda4952",
    measurementId: "G-2742PKX67T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
