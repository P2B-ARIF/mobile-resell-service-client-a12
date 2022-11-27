import React, { createContext, useEffect, useState } from "react";
import app from "../../Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [spinner, setSpinner] = useState(true);

  const loginWithGoogle = (provider) => {
    setSpinner(true);
    return signInWithPopup(auth, provider);
  };

  const logOut = () => {
    setSpinner(true);
    return signOut(auth);
  };

  const createNewAccount = (email, password) => {
    setSpinner(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setSpinner(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userUpdate = (profile) => {
    setSpinner(true);
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setSpinner(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const value = {
    user,
    loginWithGoogle,
    logOut,
    userLogin,
    createNewAccount,
    userUpdate,
    spinner,
  };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
