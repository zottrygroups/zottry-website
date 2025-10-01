import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./AuthLayout.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");

    if (password !== confirm) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    navigate("/login", { state: { email } });
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
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="new-password">New password</label>
          <input
            type="password"
            id="new-password"
            name="password"
            placeholder="Enter new password"
            minLength="8"
            required
          />

          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Re-enter new password"
            minLength="8"
            required
          />

          <button type="submit" className="btn auth-btn">
            Update password
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
