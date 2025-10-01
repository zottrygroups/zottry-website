import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AuthLayout.css";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const code = event.target.code.value.trim();

    if (!/^\d{4,6}$/.test(code)) {
      setError("Enter the 6-digit code we just sent you.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setStatusMessage("Code accepted. Redirecting you to reset your password.");

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/reset-password", { state: { email } });
    }, 700);
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Enter verification code</h1>
        <p>
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below to
          continue.
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
          <label htmlFor="verification-code">Verification code</label>
          <input
            type="text"
            id="verification-code"
            name="code"
            inputMode="numeric"
            pattern="[0-9]{4,6}"
            maxLength="6"
            className="code-input"
            placeholder="••••••"
            onChange={() => {
              if (error) {
                setError("");
              }
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={`verification-code-hint${error ? " verification-code-error" : ""}`}
            required
          />
          <span className="code-input-hint" id="verification-code-hint">
            Didn't receive anything? Check your spam folder or request a new
            code.
          </span>
          {error && (
            <p
              className="field-error"
              id="verification-code-error"
              role="alert"
            >
              {error}
            </p>
          )}
          <button type="submit" className="btn auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Verifying..." : "Verify code"}
          </button>
        </form>
        <Link to="/forgot-password" className="resend-link">
          Resend code
        </Link>
      </div>
    </div>
  );
}

export default VerifyCode;
