import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLoginModal } from "../context/LoginModalContext";
import "./LoginModal.css";

const REMEMBERED_CREDENTIALS_KEY = "zottry.auth.rememberedCredentials";
const ANIMATION_DURATION = 250;

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "India",
  "Brazil"
];

const MINIMUM_AGE = 18;

const EMPTY_REGISTER_FORM = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "",
  dateOfBirth: "",
  acceptTerms: false
};

const formatDateForInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateAge = (dateString) => {
  if (!dateString) {
    return 0;
  }

  const birthDate = new Date(dateString);
  if (Number.isNaN(birthDate.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};

const computePasswordStrength = (password) => {
  if (!password) {
    return "";
  }

  if (password.length < 8) {
    return "weak";
  }

  let score = 0;
  if (/[a-z]/.test(password)) {
    score += 1;
  }
  if (/[A-Z]/.test(password)) {
    score += 1;
  }
  if (/[0-9]/.test(password)) {
    score += 1;
  }
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  if (score >= 3) {
    return "strong";
  }

  if (score === 2) {
    return "medium";
  }

  return "weak";
};

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
  const { isLoginOpen, closeLoginModal, activeView, setActiveView, modalMessage } = useLoginModal();
  const {
    user,
    login,
    register: registerUser,
    logout,
    demoCredentials,
    isAuthenticating
  } = useAuth();
  const [shouldRender, setShouldRender] = useState(false);
  const [animationState, setAnimationState] = useState("idle");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerForm, setRegisterForm] = useState({ ...EMPTY_REGISTER_FORM });
  const [registerErrors, setRegisterErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const dialogRef = useRef(null);
  const closingTimerRef = useRef(null);
  const rafRef = useRef(null);

  const emailPattern = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/, []);
  const todayISO = useMemo(() => formatDateForInput(new Date()), []);
  const passwordStrength = useMemo(
    () => computePasswordStrength(registerForm.password),
    [registerForm.password]
  );
  const isRegisterFormReady = useMemo(() => {
    const fullName = registerForm.fullName.trim();
    const username = registerForm.username.trim();
    const email = registerForm.email.trim();
    const country = registerForm.country.trim();
    const dateOfBirth = registerForm.dateOfBirth;

    if (!fullName || !username || !email || !country || !dateOfBirth) {
      return false;
    }

    if (!registerForm.password || !registerForm.confirmPassword) {
      return false;
    }

    if (!registerForm.acceptTerms) {
      return false;
    }

    if (!emailPattern.test(email)) {
      return false;
    }

    if (registerForm.password.length < 8) {
      return false;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      return false;
    }

    return calculateAge(dateOfBirth) >= MINIMUM_AGE;
  }, [registerForm, emailPattern]);

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
      setRegisterForm({ ...EMPTY_REGISTER_FORM });
      setRegisterErrors({});
      setRegisterError("");
      setRegisterStatus("");
      setShowRegisterSuccess(false);
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
    if (user && isLoginOpen && activeView === "login" && !showRegisterSuccess) {
      closeLoginModal();
    }
  }, [user, isLoginOpen, activeView, showRegisterSuccess, closeLoginModal]);

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
    const { name, value, type, checked } = event.target;
    setRegisterForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));

    if (registerErrors[name]) {
      setRegisterErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const validateRegister = () => {
    const nextErrors = {};

    if (!registerForm.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!registerForm.username.trim()) {
      nextErrors.username = "Choose a username for your profile.";
    } else if (registerForm.username.trim().length < 3) {
      nextErrors.username = "Usernames need at least 3 characters.";
    }

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

    if (!registerForm.country.trim()) {
      nextErrors.country = "Select your country.";
    }

    if (!registerForm.dateOfBirth) {
      nextErrors.dateOfBirth = "Enter your date of birth.";
    } else if (calculateAge(registerForm.dateOfBirth) < MINIMUM_AGE) {
      nextErrors.dateOfBirth = "You must be at least 18 years old to register.";
    }

    if (!registerForm.acceptTerms) {
      nextErrors.acceptTerms = "You must confirm you are 18+ and accept the policies.";
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

    const trimmedFullName = registerForm.fullName.trim();
    const [firstName = "", ...rest] = trimmedFullName.split(/\s+/);
    const payload = {
      email: registerForm.email.trim(),
      password: registerForm.password,
      username: registerForm.username.trim(),
      fullName: trimmedFullName,
      firstName,
      lastName: rest.join(" "),
      country: registerForm.country.trim(),
      dateOfBirth: registerForm.dateOfBirth
    };

    const result = await registerUser(payload);

    if (!result.ok) {
      setRegisterError(result.message);
      return;
    }

    setRegisterForm({ ...EMPTY_REGISTER_FORM });
    setRegisterErrors({});
    setRegisterStatus("Account created successfully. Please verify your email before logging in.");
    setShowRegisterSuccess(true);

    if (typeof logout === "function") {
      await logout();
    }
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
      setShowRegisterSuccess(false);
    } else {
      setLoginErrors({});
      setLoginError("");
      setLoginStatus("");
    }
  };

  const handleRegisterSuccessContinue = () => {
    setShowRegisterSuccess(false);
    setRegisterStatus("");
    setActiveView("login");
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
        {modalMessage && (
          <div className="login-modal__status" role="alert" aria-live="assertive">
            {modalMessage}
          </div>
        )}
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
            {registerStatus && !showRegisterSuccess && (
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
              <label htmlFor="register-modal-full-name">Full name</label>
              <input
                type="text"
                id="register-modal-full-name"
                name="fullName"
                placeholder="Your full name"
                value={registerForm.fullName}
                onChange={handleRegisterChange}
                aria-invalid={Boolean(registerErrors.fullName)}
                aria-describedby={
                  registerErrors.fullName ? "register-modal-full-name-error" : undefined
                }
                required
              />
              {registerErrors.fullName && (
                <p className="login-modal__field-error" id="register-modal-full-name-error" role="alert">
                  {registerErrors.fullName}
                </p>
              )}

              <label htmlFor="register-modal-username">Username</label>
              <input
                type="text"
                id="register-modal-username"
                name="username"
                placeholder="Pick a display name"
                value={registerForm.username}
                onChange={handleRegisterChange}
                aria-invalid={Boolean(registerErrors.username)}
                aria-describedby={
                  registerErrors.username ? "register-modal-username-error" : undefined
                }
                required
              />
              {registerErrors.username && (
                <p className="login-modal__field-error" id="register-modal-username-error" role="alert">
                  {registerErrors.username}
                </p>
              )}

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
              {registerForm.password && (
                <p
                  className={`login-modal__password-strength login-modal__password-strength--${passwordStrength}`}
                  role="status"
                  aria-live="polite"
                >
                  Password strength: {passwordStrength === "strong"
                    ? "Strong"
                    : passwordStrength === "medium"
                    ? "Medium"
                    : "Weak"}
                </p>
              )}
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

              <label htmlFor="register-modal-country">Country</label>
              <select
                id="register-modal-country"
                name="country"
                value={registerForm.country}
                onChange={handleRegisterChange}
                aria-invalid={Boolean(registerErrors.country)}
                aria-describedby={
                  registerErrors.country ? "register-modal-country-error" : undefined
                }
                required
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {registerErrors.country && (
                <p className="login-modal__field-error" id="register-modal-country-error" role="alert">
                  {registerErrors.country}
                </p>
              )}

              <label htmlFor="register-modal-dob">Date of birth</label>
              <input
                type="date"
                id="register-modal-dob"
                name="dateOfBirth"
                value={registerForm.dateOfBirth}
                onChange={handleRegisterChange}
                max={todayISO}
                aria-invalid={Boolean(registerErrors.dateOfBirth)}
                aria-describedby={
                  registerErrors.dateOfBirth ? "register-modal-dob-error" : undefined
                }
                required
              />
              {registerErrors.dateOfBirth && (
                <p className="login-modal__field-error" id="register-modal-dob-error" role="alert">
                  {registerErrors.dateOfBirth}
                </p>
              )}

              <label className="login-modal__checkbox">
                <input
                  type="checkbox"
                  id="register-modal-terms"
                  name="acceptTerms"
                  checked={registerForm.acceptTerms}
                  onChange={handleRegisterChange}
                  aria-invalid={Boolean(registerErrors.acceptTerms)}
                  aria-describedby={
                    registerErrors.acceptTerms ? "register-modal-terms-error" : undefined
                  }
                  required
                />
                <span>I confirm I am 18+ and accept the Terms & Privacy Policy</span>
              </label>
              {registerErrors.acceptTerms && (
                <p className="login-modal__field-error" id="register-modal-terms-error" role="alert">
                  {registerErrors.acceptTerms}
                </p>
              )}

              <div className="login-modal__actions">
                <button
                  type="submit"
                  className="login-modal__register-btn"
                  disabled={isAuthenticating || !isRegisterFormReady}
                >
                  {isAuthenticating ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
            {showRegisterSuccess && (
              <div
                className="login-modal__success-overlay"
                role="alertdialog"
                aria-live="assertive"
                aria-modal="true"
                aria-labelledby="register-success-title"
                aria-describedby="register-success-message"
              >
                <div className="login-modal__success-card">
                  <h3 id="register-success-title">Account created</h3>
                  <p id="register-success-message">
                    Account created successfully. Please verify your email before logging in.
                  </p>
                  <button
                    type="button"
                    className="login-modal__primary-btn"
                    onClick={handleRegisterSuccessContinue}
                  >
                    Go to login
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
