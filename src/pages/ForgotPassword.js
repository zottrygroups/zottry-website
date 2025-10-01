import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthLayout.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!email) {
      setError("Please enter the email linked to your account.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("That email address doesn't look valid. Try again.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setStatusMessage(`Great! If ${email} matches an account we'll send a code right away.`);

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/verify-code", { state: { email } });
    }, 900);
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Forgot your password?</h1>
        <p>
          Enter the email address linked to your account and we&apos;ll send you a
          verification code to reset your password.
        </p>
        {statusMessage && (
          <div className="form-status" role="status" aria-live="polite">
            {statusMessage}
          </div>
        )}
        {error && (
          <div className="form-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="forgot-email">Email</label>
          <input
            type="email"
            id="forgot-email"
            name="email"
            placeholder="you@example.com"
            onChange={() => {
              if (error) {
                setError("");
              }
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "forgot-email-error" : undefined}
            required
          />
          {error && (
            <p className="field-error" id="forgot-email-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send verification code"}
          </button>
        </form>
        <p className="auth-callout">
          Remembered your password? <Link to="/login">Go back to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
