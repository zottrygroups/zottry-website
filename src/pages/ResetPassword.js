import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AuthLayout.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");
    const nextErrors = {};

    if (!password || password.length < 8) {
      nextErrors.password = "Create a password with at least 8 characters.";
    }

    if (password !== confirm) {
      nextErrors.confirmPassword = "Passwords need to match exactly.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("Password updated. Redirecting you to login...");

    window.setTimeout(() => {
      setIsSubmitting(false);
      navigate("/login", { state: { email } });
    }, 900);
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Set a new password</h1>
        <p>
          {email ? (
            <>Choose a strong password for <strong>{email}</strong>.</>
          ) : (
            "Choose a strong password for your account."
          )}
        </p>
        {statusMessage && (
          <div className="form-status" role="status" aria-live="polite">
            {statusMessage}
          </div>
        )}
        {Object.keys(errors).length > 0 && !statusMessage && (
          <div className="form-error" role="alert" aria-live="assertive">
            Please fix the highlighted fields and try again.
          </div>
        )}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="new-password">New password</label>
          <input
            type="password"
            id="new-password"
            name="password"
            placeholder="Enter new password"
            minLength="8"
            onChange={() => {
              if (errors.password) {
                setErrors((previous) => ({ ...previous, password: undefined }));
              }
            }}
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "new-password-error" : undefined}
            required
          />
          {errors.password && (
            <p className="field-error" id="new-password-error" role="alert">
              {errors.password}
            </p>
          )}

          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Re-enter new password"
            minLength="8"
            onChange={() => {
              if (errors.confirmPassword) {
                setErrors((previous) => ({
                  ...previous,
                  confirmPassword: undefined
                }));
              }
            }}
            aria-invalid={Boolean(errors.confirmPassword)}
            aria-describedby={
              errors.confirmPassword ? "confirm-password-error" : undefined
            }
            required
          />
          {errors.confirmPassword && (
            <p
              className="field-error"
              id="confirm-password-error"
              role="alert"
            >
              {errors.confirmPassword}
            </p>
          )}

          <button type="submit" className="btn auth-btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Update password"}
          </button>
        </form>
        <p className="auth-callout">
          Remembered it? <Link to="/login">Return to login</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
