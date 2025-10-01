import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthLayout.css";

function Login() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { login, demoCredentials, isAuthenticating } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({
      ...previous,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!formValues.email.trim()) {
      nextErrors.email = "Please enter the email linked to your account.";
    } else if (!emailPattern.test(formValues.email.trim())) {
      nextErrors.email = "That email address looks incorrect.";
    }

    if (!formValues.password.trim()) {
      nextErrors.password = "Enter your password to continue.";
    } else if (formValues.password.length < 8) {
      nextErrors.password = "Passwords must be at least 8 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setStatusMessage("");

    if (!validate()) {
      return;
    }

    const result = await login({
      email: formValues.email.trim(),
      password: formValues.password
    });

    if (!result.ok) {
      setSubmitError(result.message);
      return;
    }

    setStatusMessage(`Welcome back, ${result.user.name || "player"}!`);
  };

  const handleUseDemo = () => {
    setFormValues({ ...demoCredentials });
    setErrors({});
    setStatusMessage("Demo credentials loaded.");
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Sign in with your credentials or try the demo account.</p>
        {statusMessage && (
          <div className="form-status" role="status" aria-live="polite">
            {statusMessage}
          </div>
        )}
        {submitError && (
          <div className="form-error" role="alert" aria-live="assertive">
            {submitError}
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="you@example.com"
            value={formValues.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "login-email-error" : undefined}
            required
          />

          {errors.email && (
            <p className="field-error" id="login-email-error" role="alert">
              {errors.email}
            </p>
          )}

          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Enter your password"
            value={formValues.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={
              errors.password ? "login-password-error" : undefined
            }
            required
          />

          {errors.password && (
            <p
              className="field-error"
              id="login-password-error"
              role="alert"
            >
              {errors.password}
            </p>
          )}

          <div className="form-links">
            <Link to="/forgot-password">
              Forgot your password?
            </Link>
            <button
              type="button"
              className="link-button"
              onClick={handleUseDemo}
            >
              Use demo account
            </button>
          </div>

          <button
            type="submit"
            className="btn auth-btn"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? "Checking..." : "Login"}
          </button>
        </form>

        <p className="auth-callout">
          Don't have an account yet? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
