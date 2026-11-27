"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "@/context/authenticationContext";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { firebaseUser } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!firebaseUser) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const idToken = await firebaseUser.getIdToken();
        const res = await fetch("/api/users/getUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch user.");
        }

        setUser(data.user);
      } catch (err) {
        console.error("failed to fetch user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, [firebaseUser]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
