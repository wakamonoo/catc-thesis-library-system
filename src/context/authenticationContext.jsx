"use client";
import RegistrationModal from "@/components/modals/registrationModal";
import { createContext, useContext, useEffect, useState } from "react";
import SignInModal from "@/components/modals/signInModal";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [showLogInModal, setShowSignInModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  });

  const signOutUser = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        loading,
        signOutUser,
        setShowSignInModal,
        setShowRegistrationModal,
      }}
    >
      {children}
      {showLogInModal && <SignInModal />}
      {showRegistrationModal && <RegistrationModal />}
    </AuthenticationContext.Provider>
  );
};
