import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { registerUser } from "../services/authService";
import {
  getDemoCredentials,
  getSession as getStoredSession,
  login as authenticate,
  logout as clearAuthentication
} from "../services/mockAuth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredSession());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [lastAction, setLastAction] = useState(null);

  const login = async (credentials) => {
    setIsAuthenticating(true);
    try {
      const account = authenticate(credentials.email, credentials.password);

      if (!account) {
        return {
          ok: false,
          message: "We couldn't match those login details."
        };
      }

      setUser(account);
      setLastAction({ type: "login", at: Date.now() });
      return { ok: true, user: account };
    } catch (error) {
      return {
        ok: false,
        message: error.message || "We couldn't match those login details."
      };
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
      clearAuthentication();
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

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleStorageChange = () => {
      setUser(getStoredSession());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
