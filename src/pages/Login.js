import React from "react";
import { Link } from "react-router-dom";
import "./AuthLayout.css";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: wire up authentication
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            placeholder="Enter your password"
            required
          />

          <div className="form-links">
            <Link to="/forgot-password">
              Forgot your password?
            </Link>
          </div>

          <button type="submit" className="btn auth-btn">
            Login
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
