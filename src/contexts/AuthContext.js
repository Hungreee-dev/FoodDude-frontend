import React, { useContext, useState, useEffect } from "react"
import { auth} from '../firebase'
import {useHistory} from 'react-router-dom'
//import axios from 'axios';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const [cartUpdated,setCartUpdated]=React.useState()
  function signup(email, password) {
    return (
    auth.createUserWithEmailAndPassword(email, password)
      )
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

 function updateCart(){
   setCartUpdated(Math.random())
   console.log('hi')
 }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user != null){
         user.getIdTokenResult(true);
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

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
    updateCart
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
