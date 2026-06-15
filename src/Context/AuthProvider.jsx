import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.init';

const googleProvider=new GoogleAuthProvider();

const AuthProvider = ({children}) => {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  // createUser
    const createUser = (email,password)=>{
      setLoading(true);
     return  createUserWithEmailAndPassword(auth,email,password)
    };

    // LogIn
    const signIn = (email,password)=>{
      setLoading(true);
      return signInWithEmailAndPassword(auth,email,password)
    };

    // googleSignIn
  

    const googleSignIn = () =>{
      setLoading(true);
      return signInWithPopup(auth,googleProvider);
    }


    // logOut
    const logOut=()=>{
     setLoading(true);
     return signOut(auth);
    }


    useEffect(()=>{
  const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
  setUser(currentUser);
  setLoading(false);
  });

  return ()=>{
    unSubscribe() 
  } 
    },[]);


    const authInfo = {
    createUser,
    signIn,
    logOut,
    user,
    googleSignIn,
    setUser
    }
    return (
<AuthContext value={authInfo}>
  {children}
</AuthContext>
    );
};

export default AuthProvider;