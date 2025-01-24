import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"

export const AuthContext = createContext()
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loader, setLoader] = useState(true)

    const createUser = (email,password) =>{
        setLoader(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const updateUserInfo = (profile) => {
        return updateProfile(auth.currentUser,profile)
    }
    const signinEmailPass = (email,password) =>{
        setLoader(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const emailVerification = ( ) =>{
        return sendEmailVerification(auth.currentUser)
    }
    const emailReset = (email) =>{
        return sendPasswordResetEmail(auth,email)
    }

    const signinWGoogle = () =>{
        setLoader(true)
        return signInWithPopup(auth,googleProvider)
        
    }

    const logout = () =>{
        setLoader(true)
        return signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser)
            setLoader(false)
        })
        return (() =>{
            return unsubscribe()
        })
    },[])

    
    const authInfo ={
        createUser,
        updateUserInfo,
        signinEmailPass,
        emailVerification,
        emailReset,
        signinWGoogle,
        user,
        logout,
        loader
    }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;