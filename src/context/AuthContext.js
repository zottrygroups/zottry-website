import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { registerUser } from "../services/authService";
import {
  getDemoCredentials,
  getSession as getStoredSession,
  login as authenticate,
  logout as clearAuthentication
} from "../services/mockAuth";
import { useLoginModal } from "./LoginModalContext";

const SESSION_TIMEOUT = 15 * 60 * 1000;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredSession());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  const activityTimestampRef = useRef(Date.now());
  const inactivityTimerRef = useRef(null);
  const { openLoginModal } = useLoginModal();

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
      activityTimestampRef.current = Date.now();
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
      activityTimestampRef.current = Date.now();
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

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const updateActivity = () => {
      activityTimestampRef.current = Date.now();
    };

    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, updateActivity, { passive: true }));

    return () => {
      events.forEach((event) => window.removeEventListener(event, updateActivity));
    };
  }, []);

  useEffect(() => {
    if (!user) {
      if (inactivityTimerRef.current) {
        window.clearInterval(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
      return undefined;
    }

    activityTimestampRef.current = Date.now();
    inactivityTimerRef.current = window.setInterval(() => {
      const now = Date.now();
      if (now - activityTimestampRef.current >= SESSION_TIMEOUT) {
        window.clearInterval(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
        clearAuthentication();
        setUser(null);
        setLastAction({ type: "timeout", at: now });
        openLoginModal("login", { message: "Your session has expired. Please log in again." });
      }
    }, 60 * 1000);

    return () => {
      if (inactivityTimerRef.current) {
        window.clearInterval(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
  }, [user, openLoginModal]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
