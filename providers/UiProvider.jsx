"use client";
import { createContext, useContext, useState } from "react";

const UiContext = createContext();
export const UiProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <UiContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </UiContext.Provider>
  );
};

export const useUi = () => useContext(UiContext);
