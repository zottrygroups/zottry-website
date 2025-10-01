import React, { createContext, useContext, useMemo, useState } from "react";
import {
  getDemoCredentials,
  loginUser,
  logoutUser,
  registerUser
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const login = async (credentials) => {
    setIsAuthenticating(true);
    try {
      const result = await loginUser(credentials);
      setUser(result.user);
      setLastAction({ type: "login", at: Date.now() });
      return { ok: true, user: result.user };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async (formData) => {
    setIsAuthenticating(true);
    try {
      const result = await registerUser(formData);
      setUser(result.user);
      setLastAction({ type: "register", at: Date.now() });
      return { ok: true, user: result.user };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    try {
      await logoutUser();
      setUser(null);
      setLastAction({ type: "logout", at: Date.now() });
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticating,
      lastAction,
      login,
      register,
      logout,
      demoCredentials: getDemoCredentials()
    }),
    [user, isAuthenticating, lastAction]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
