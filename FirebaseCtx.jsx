import React, { useState, createContext, useEffect } from "react"
import { auth, db } from "./FirebaseConfig"
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"

export const firebaseCtx = createContext();

export default function FirebaseCtxProvider({ children }) {
    const [lightMode, setLightMode] = useState(false)
    const [user, setUser] = useState(null)

    const updateCurrentUser = (newUserName, newPhoto) => {
        updateProfile(auth.currentUser, {
            displayName: newUserName ? newUserName : auth.currentUser.displayName,
            photoURL: newPhoto ? newPhoto : auth.currentUser.photoURL
        })
    }

    const sendEmailVerif = () => {
        sendEmailVerification(auth.currentUser)
            .then((e) => {
                console.log(e)
            })
    }

    function signIn(email, pass) {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password);
        setDoc((doc(db, "users", email)), {
            faveChars: []
        })
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setUser(null)
        }).catch((error) => {
            return
        });
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("change")
        })
        return () => unsub()
    })

    return <firebaseCtx.Provider value={{ lightMode, setLightMode, signUp, user, logOut, sendEmailVerif, signIn, updateCurrentUser }}>
        {children}
    </firebaseCtx.Provider>
}
