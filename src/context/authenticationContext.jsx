"use client";
import RegistrationModal from "@/components/modals/registrationModal";
import { createContext, useContext, useEffect, useState } from "react";
import SignInModal from "@/components/modals/signInModal";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import SignOutModal from "@/components/modals/signOutModal";
import ResetPasswordModal from "@/components/modals/resetPasswordModal";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [resetEmailPassword, setResetEmailPassword] = useState("");
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isSignedIn = !!firebaseUser;

  const isEmailVerified = firebaseUser?.emailVerified ?? false;

  const signOutUser = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        firebaseUser,
        loading,
        isSignedIn,
        isEmailVerified,
        signOutUser,
        resetEmailPassword,
        setResetEmailPassword,
        setShowSignInModal,
        setShowSignOutModal,
        setShowRegistrationModal,
        setShowResetPasswordModal,
      }}
    >
      {children}
      {showSignInModal && <SignInModal />}
      {showSignOutModal && <SignOutModal />}
      {showRegistrationModal && <RegistrationModal />}
      {showResetPasswordModal && <ResetPasswordModal />}
    </AuthenticationContext.Provider>
  );
};
