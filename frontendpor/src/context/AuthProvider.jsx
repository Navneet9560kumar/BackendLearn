import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

// create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // ✅ Hooks must be inside a component or custom hook
  const [userData, setUserData] = useState(null);

  // Fetch data from local storage
useEffect(() => {
   setLocalStorage();

    const { employees, admin } = getLocalStorage();
  setUserData({ employees, admin });
  }, []);

  // Optionally, you can set it in useEffect:
  // useEffect(() => {
  //   const storedData = getLocalStorage();
  //   setUserData(storedData);
  // }, []);

  return (
    <AuthContext.Provider value={{ userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
