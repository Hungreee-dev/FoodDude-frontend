import React, { useContext, useState, useEffect } from 'react';
import app, { auth } from '../firebase';
import firebase from 'firebase';

// import {useHistory} from 'react-router-dom'
//import axios from 'axios';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [cartUpdated, setCartUpdated] = useState();
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    function updateCart() {
        setCartUpdated(Math.random());
        console.log('hi');
    }
    function loginwithphone(phoneNumber, appVerifier = window.recaptchaVerifier) {
        auth.signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            })
            .catch((error) => {});
    }

    function sendotp(phone) {
        app.auth().useDeviceLanguage();
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            size: 'invisible',
            callback: (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                loginwithphone(phone);
            },
        });
    }
    function signInWithOTP(code) {
        window.confirmationResult
            .confirm(code)
            .then((result) => {
                const user = result.user;
                return user;
            })
            .catch((error) => {
                alert("Couldn't Login!");
            });
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        cartUpdated,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        setCurrentUser,
        updateCart,
        sendotp,
        signInWithOTP,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
