"use client";
import RegistrationModal from "@/components/modals/registrationModal";
import { createContext, useContext, useState } from "react";
import SignInModal from "@/components/modals/signInModal";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [showLogInModal, setShowSignInModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
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
