"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/context/authenticationContext";

export const AccountContext = createContext(null);

export const AccountProvider = ({ children }) => {
  const { firebaseUser } = useContext(AuthenticationContext);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (!firebaseUser) {
      setAccount(null);
      return;
    }

    const fetchAccount = async () => {
      try {
        const idToken = await firebaseUser.getIdToken();

        const adminRes = await fetch("/api/admin/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: "no-store",
        });

        let endpoint = "/api/users/getUser";

        if (adminRes.ok) {
          endpoint = "/api/admin/getAdmin";
        } else if (adminRes.status !== 403) {
          const data = await adminRes.json();
          throw new Error(data.message || "Failed to verify account.");
        }

        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch account.");
        }

        setAccount(data.account);
      } catch (err) {
        console.error("Failed to fetch account:", err);
        setAccount(null);
      }
    };

    fetchAccount();
  }, [firebaseUser]);

  return (
    <AccountContext.Provider value={{ account }}>
      {children}
    </AccountContext.Provider>
  );
};
