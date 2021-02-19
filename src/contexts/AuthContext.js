import React, { useContext, useState, useEffect } from 'react';
import { auth, phoneProvider } from '../firebase';
// import firebase from 'firebase';

// import {useHistory} from 'react-router-dom'
//import axios from 'axios';

const asyncLocalStorage = {
    setItem: async function (key, value) {
        return Promise.resolve().then(function () {
            localStorage.setItem(key, value);
        });
    },
    getItem: async function (key) {
        return Promise.resolve().then(function () {
            return localStorage.getItem(key);
        });
    },
    removeItem: async function () {
        return Promise.resolve().then(function () {
            return localStorage.clear();
        });
    },
};

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userDat, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cartUpdated, setCartUpdated] = useState();
    const [verifiedPhone, setUVP] = useState(true);
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    async function logout() {
        await asyncLocalStorage.removeItem();
        setUVP(true);
        setCurrentUser(null);
        setUserData(null);
        await auth.signOut();
        console.log('You have been logged out securly.');
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
    function linkPhoneNumber() {
        return auth.currentUser.linkWithPopup(phoneProvider);
    }
    function updateCart() {
        setCartUpdated(Math.random());
        console.log('hi');
    }

    function signinWithPhone(phoneNumber, verifier) {
        return auth.signInWithPhoneNumber(phoneNumber, verifier);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user != null && currentUser) {
                user.getIdTokenResult(true);
                setCurrentUser(user);
            }
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
        signinWithPhone,
        linkPhoneNumber,
        verifiedPhone,
        setUVP,
        userDat,
        setUserData,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
