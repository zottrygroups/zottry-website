import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AuthLayout.css";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  const handleSubmit = (event) => {
    event.preventDefault();
    const code = event.target.code.value.trim();

    if (code.length < 4) {
      return;
    }

    navigate("/reset-password", { state: { email } });
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Enter verification code</h1>
        <p>
          We sent a 6-digit code to <strong>{email}</strong>. Enter it below to
          continue.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
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
            required
          />
          <span className="code-input-hint">
            Didn't receive anything? Check your spam folder or request a new
            code.
          </span>
          <button type="submit" className="btn auth-btn">
            Verify code
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
