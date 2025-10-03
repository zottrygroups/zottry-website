import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeView, setActiveView] = useState("login");

  const openLoginModal = useCallback((view = "login") => {
    setActiveView(view);
    setIsLoginOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isLoginOpen, openLoginModal, closeLoginModal, activeView, setActiveView }),
    [isLoginOpen, openLoginModal, closeLoginModal, activeView]
  );

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
}

export function useLoginModal() {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within a LoginModalProvider");
  }
  return context;
}
