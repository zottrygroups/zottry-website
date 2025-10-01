import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthLayout.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();

    if (!email) {
      return;
    }

    navigate("/verify-code", { state: { email } });
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Forgot your password?</h1>
        <p>
          Enter the email address linked to your account and we&apos;ll send you a
          verification code to reset your password.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="forgot-email">Email</label>
          <input
            type="email"
            id="forgot-email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <button type="submit" className="btn auth-btn">
            Send verification code
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
