import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";
import "./LoginModal.css";

const REMEMBERED_CREDENTIALS_KEY = "zottry.auth.rememberedCredentials";
const ANIMATION_DURATION = 250;

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch (error) {
    return null;
  }
};

const loadRememberedCredentials = () => {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(REMEMBERED_CREDENTIALS_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    storage.removeItem(REMEMBERED_CREDENTIALS_KEY);
    return null;
  }
};

const saveRememberedCredentials = (credentials) => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(REMEMBERED_CREDENTIALS_KEY, JSON.stringify(credentials));
};

const clearRememberedCredentials = () => {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.removeItem(REMEMBERED_CREDENTIALS_KEY);
};

function LoginModal() {
  const navigate = useNavigate();
  const { isLoginOpen, closeLoginModal, activeView, setActiveView } = useLoginModal();
  const { user, login, register: registerUser, demoCredentials, isAuthenticating } = useAuth();
  const [shouldRender, setShouldRender] = useState(false);
  const [animationState, setAnimationState] = useState("idle");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const dialogRef = useRef(null);
  const closingTimerRef = useRef(null);
  const rafRef = useRef(null);

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);

  useEffect(() => {
    if (isLoginOpen) {
      if (closingTimerRef.current) {
        window.clearTimeout(closingTimerRef.current);
        closingTimerRef.current = null;
      }
      setShouldRender(true);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = window.requestAnimationFrame(() => {
        setAnimationState("enter");
        rafRef.current = null;
      });
      return;
    }

    if (shouldRender) {
      setAnimationState("exit");
      closingTimerRef.current = window.setTimeout(() => {
        setShouldRender(false);
        setAnimationState("idle");
        closingTimerRef.current = null;
      }, ANIMATION_DURATION);
    }
  }, [isLoginOpen, shouldRender]);

  useEffect(() => () => {
    if (closingTimerRef.current) {
      window.clearTimeout(closingTimerRef.current);
    }
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isLoginOpen) {
      setLoginForm({ email: "", password: "" });
      setLoginErrors({});
      setLoginError("");
      setLoginStatus("");
      setRegisterForm({ email: "", password: "", confirmPassword: "" });
      setRegisterErrors({});
      setRegisterError("");
      setRegisterStatus("");
      setRememberMe(false);
      return;
    }

    const remembered = loadRememberedCredentials();
    if (remembered) {
      setLoginForm({
        email: remembered.email || "",
        password: remembered.password || ""
      });
      setRememberMe(true);
      setLoginStatus("Saved credentials loaded.");
    } else {
      setLoginForm({ email: "", password: "" });
      setRememberMe(false);
      setLoginStatus("");
    }
  }, [isLoginOpen]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLoginModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldRender, closeLoginModal]);

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender || !dialogRef.current) {
      return;
    }

    const selector = activeView === "register" ? "#register-panel input" : "#login-panel input";
    const firstInput = dialogRef.current.querySelector(selector);
    if (firstInput && typeof firstInput.focus === "function") {
      firstInput.focus();
    }
  }, [shouldRender, activeView]);

  useEffect(() => {
    if (user && isLoginOpen) {
      closeLoginModal();
    }
  }, [user, isLoginOpen, closeLoginModal]);

  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      closeLoginModal();
    }
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((previous) => ({
      ...previous,
      [name]: value
    }));

    if (loginErrors[name]) {
      setLoginErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const validateLogin = () => {
    const nextErrors = {};

    if (!loginForm.email.trim()) {
      nextErrors.email = "Please enter the email linked to your account.";
    } else if (!emailPattern.test(loginForm.email.trim())) {
      nextErrors.email = "That email address looks incorrect.";
    }

    if (!loginForm.password.trim()) {
      nextErrors.password = "Enter your password to continue.";
    } else if (loginForm.password.length < 8) {
      nextErrors.password = "Passwords must be at least 8 characters.";
    }

    setLoginErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");
    setLoginStatus("");

    if (!validateLogin()) {
      return;
    }

    const result = await login({
      email: loginForm.email.trim(),
      password: loginForm.password
    });

    if (!result.ok) {
      setLoginError(result.message);
      return;
    }

    if (rememberMe) {
      saveRememberedCredentials({
        email: loginForm.email.trim(),
        password: loginForm.password
      });
    } else {
      clearRememberedCredentials();
    }

    closeLoginModal();
  };

  const handleRememberToggle = (event) => {
    const { checked } = event.target;
    setRememberMe(checked);
    if (!checked) {
      clearRememberedCredentials();
    }
  };

  const handleUseDemo = () => {
    setLoginForm({ ...demoCredentials });
    setLoginErrors({});
    setLoginStatus("Demo credentials loaded.");
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm((previous) => ({
      ...previous,
      [name]: value
    }));

    if (registerErrors[name]) {
      setRegisterErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const validateRegister = () => {
    const nextErrors = {};

    if (!registerForm.email.trim()) {
      nextErrors.email = "Please enter an email address.";
    } else if (!emailPattern.test(registerForm.email.trim())) {
      nextErrors.email = "That email address looks incorrect.";
    }

    if (!registerForm.password.trim()) {
      nextErrors.password = "Create a password with at least 8 characters.";
    } else if (registerForm.password.length < 8) {
      nextErrors.password = "Passwords must be at least 8 characters.";
    }

    if (!registerForm.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (registerForm.confirmPassword !== registerForm.password) {
      nextErrors.confirmPassword = "Passwords need to match exactly.";
    }

    setRegisterErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setRegisterStatus("");

    if (!validateRegister()) {
      return;
    }

    const result = await registerUser({
      email: registerForm.email.trim(),
      password: registerForm.password
    });

    if (!result.ok) {
      setRegisterError(result.message);
      return;
    }

    setRegisterStatus("Account created. You're all set!");
    setActiveView("login");
    closeLoginModal();
  };

  const handleForgotPassword = () => {
    closeLoginModal();
    navigate("/forgot-password");
  };

  const handleTabChange = (view) => {
    if (view === activeView) {
      return;
    }
    setActiveView(view);
    if (view === "login") {
      setRegisterErrors({});
      setRegisterError("");
      setRegisterStatus("");
    } else {
      setLoginErrors({});
      setLoginError("");
      setLoginStatus("");
    }
  };

  if (!shouldRender) {
    return null;
  }

  const overlayClassName = [
    "login-modal__overlay",
    animationState === "enter" ? "login-modal__overlay--enter" : "",
    animationState === "exit" ? "login-modal__overlay--exit" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const modalClassName = [
    "login-modal",
    animationState === "enter" ? "login-modal--enter" : "",
    animationState === "exit" ? "login-modal--exit" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClassName}
      role="presentation"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className={modalClassName}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className="login-modal__close"
          aria-label="Close login"
          onClick={closeLoginModal}
        >
          ×
        </button>
        <h2 className="login-modal__title" id="login-modal-title">
          Access your Zottry account
        </h2>
        <div className="login-modal__tabs" role="tablist" aria-label="Authentication options">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "login"}
            className={`login-modal__tab ${activeView === "login" ? "login-modal__tab--active" : ""}`.trim()}
            onClick={() => handleTabChange("login")}
            id="login-tab"
            aria-controls="login-panel"
          >
            Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "register"}
            className={`login-modal__tab ${activeView === "register" ? "login-modal__tab--active" : ""}`.trim()}
            onClick={() => handleTabChange("register")}
            id="register-tab"
            aria-controls="register-panel"
          >
            Register
          </button>
          <span
            aria-hidden="true"
            className={`login-modal__tab-indicator login-modal__tab-indicator--${activeView}`}
          />
        </div>
        {activeView === "login" ? (
          <div
            id="login-panel"
            role="tabpanel"
            aria-labelledby="login-tab"
            className="login-modal__panel"
          >
            <p>Sign in with your credentials or try the demo account.</p>
            {loginStatus && (
              <div className="login-modal__status" role="status" aria-live="polite">
                {loginStatus}
              </div>
            )}
            {loginError && (
              <div className="login-modal__error" role="alert" aria-live="assertive">
                {loginError}
              </div>
            )}
            <form className="login-modal__form" onSubmit={handleLoginSubmit} noValidate>
              <label htmlFor="login-modal-email">Email</label>
              <input
                type="email"
                id="login-modal-email"
                name="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={handleLoginChange}
                aria-invalid={Boolean(loginErrors.email)}
                aria-describedby={loginErrors.email ? "login-modal-email-error" : undefined}
                required
              />
              {loginErrors.email && (
                <p className="login-modal__field-error" id="login-modal-email-error" role="alert">
                  {loginErrors.email}
                </p>
              )}

              <label htmlFor="login-modal-password">Password</label>
              <input
                type="password"
                id="login-modal-password"
                name="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={handleLoginChange}
                aria-invalid={Boolean(loginErrors.password)}
                aria-describedby={
                  loginErrors.password ? "login-modal-password-error" : undefined
                }
                required
              />
              {loginErrors.password && (
                <p className="login-modal__field-error" id="login-modal-password-error" role="alert">
                  {loginErrors.password}
                </p>
              )}

              <div className="login-modal__remember-row">
                <label className="login-modal__remember">
                  <input
                    type="checkbox"
                    id="login-modal-remember"
                    name="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberToggle}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  className="login-modal__link-button"
                  onClick={handleForgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <div className="login-modal__actions">
                <button
                  type="submit"
                  className="login-modal__primary-btn"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? "Checking..." : "Login"}
                </button>
                <button
                  type="button"
                  className="login-modal__demo-btn"
                  onClick={handleUseDemo}
                >
                  Use demo account
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div
            id="register-panel"
            role="tabpanel"
            aria-labelledby="register-tab"
            className="login-modal__panel"
          >
            <p>Create your account to start playing Zottry.</p>
            {registerStatus && (
              <div className="login-modal__status" role="status" aria-live="polite">
                {registerStatus}
              </div>
            )}
            {registerError && (
              <div className="login-modal__error" role="alert" aria-live="assertive">
                {registerError}
              </div>
            )}
            <form className="login-modal__form" onSubmit={handleRegisterSubmit} noValidate>
              <label htmlFor="register-modal-email">Email</label>
              <input
                type="email"
                id="register-modal-email"
                name="email"
                placeholder="you@example.com"
                value={registerForm.email}
                onChange={handleRegisterChange}
                aria-invalid={Boolean(registerErrors.email)}
                aria-describedby={
                  registerErrors.email ? "register-modal-email-error" : undefined
                }
                required
              />
              {registerErrors.email && (
                <p className="login-modal__field-error" id="register-modal-email-error" role="alert">
                  {registerErrors.email}
                </p>
              )}

              <label htmlFor="register-modal-password">Password</label>
              <input
                type="password"
                id="register-modal-password"
                name="password"
                placeholder="Create a password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                aria-invalid={Boolean(registerErrors.password)}
                aria-describedby={
                  registerErrors.password ? "register-modal-password-error" : undefined
                }
                required
              />
              {registerErrors.password && (
                <p className="login-modal__field-error" id="register-modal-password-error" role="alert">
                  {registerErrors.password}
                </p>
              )}

              <label htmlFor="register-modal-confirm">Confirm password</label>
              <input
                type="password"
                id="register-modal-confirm"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                aria-invalid={Boolean(registerErrors.confirmPassword)}
                aria-describedby={
                  registerErrors.confirmPassword ? "register-modal-confirm-error" : undefined
                }
                required
              />
              {registerErrors.confirmPassword && (
                <p
                  className="login-modal__field-error"
                  id="register-modal-confirm-error"
                  role="alert"
                >
                  {registerErrors.confirmPassword}
                </p>
              )}

              <div className="login-modal__actions">
                <button
                  type="submit"
                  className="login-modal__register-btn"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? "Creating..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
