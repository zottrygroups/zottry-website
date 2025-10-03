import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeView, setActiveView] = useState("login");
  const [modalMessage, setModalMessage] = useState("");

  const openLoginModal = useCallback((view = "login", options = {}) => {
    const message =
      typeof options === "string"
        ? options
        : typeof options === "object" && options !== null
        ? options.message
        : "";
    setActiveView(view);
    setModalMessage(message || "");
    setIsLoginOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginOpen(false);
    setModalMessage("");
  }, []);

  const value = useMemo(
    () => ({
      isLoginOpen,
      openLoginModal,
      closeLoginModal,
      activeView,
      setActiveView,
      modalMessage,
      setModalMessage
    }),
    [isLoginOpen, openLoginModal, closeLoginModal, activeView, modalMessage]
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
