// Context for storing user data 30-9-2024 Tuesday 4:28

"use client"


import { createContext, useState } from "react";

export const userContext = createContext(null);

function AuthProvider({ children }) {
    const [userr, setUser] = useState();
  
    return (
      <userContext.Provider value={{ userr, setUser }}>
        {children}
      </userContext.Provider>
    );
  }

export default AuthProvider;