import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const { openLoginModal, isLoginOpen, modalMessage } = useLoginModal();

  useEffect(() => {
    if (!user && !isLoginOpen && !modalMessage) {
      openLoginModal("login");
    }
  }, [user, isLoginOpen, modalMessage, openLoginModal]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
