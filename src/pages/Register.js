import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AuthLayout.css";

const steps = [
  { id: 1, label: "Details" },
  { id: 2, label: "Contact" },
  { id: 3, label: "Confirm" }
];

const initialFormState = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  dob: "",
  mobile: "",
  address: "",
  city: "",
  zip: "",
  state: "",
  password: "",
  offers: false,
  privacy: false,
  terms: false,
  recaptcha: false
};

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register: registerUser, isAuthenticating } = useAuth();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const validateStep = (currentStep) => {
    const requiredByStep = {
      1: ["title", "firstName", "lastName", "email", "country", "dob"],
      2: ["mobile", "address", "city", "zip", "state"],
      3: ["password", "privacy", "terms", "recaptcha"]
    };

    const missingField = requiredByStep[currentStep]?.find((field) => {
      const value = formData[field];
      return value === "" || value === false;
    });

    if (missingField) {
      setError("Please complete all required fields before continuing.");
      return false;
    }

    if (currentStep === 3 && formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    setError("");
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    setError("");
    const result = await registerUser(formData);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccessMessage(`Welcome to Zottry, ${result.user.name || "player"}!`);
    setStep(1);
    setFormData(initialFormState);
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Create your account</h1>
        <p>Join Zottry to buy tickets, manage your wallet, and follow every draw.</p>

        {successMessage && (
          <div className="form-status" role="status" aria-live="polite">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="form-error" role="alert" aria-live="assertive">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {step === 1 && (
            <>
              <label htmlFor="title">Title</label>
              <select
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select title
                </option>
                <option value="mr">Mr</option>
                <option value="mrs">Mrs</option>
                <option value="ms">Ms</option>
                <option value="mx">Mx</option>
              </select>

              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="country">Country of residence</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />

              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </>
          )}

          {step === 2 && (
            <>
              <label htmlFor="mobile">Mobile number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="+1 555 123 4567"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                placeholder="Street address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <label htmlFor="city">City / Town</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City or Town"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <label htmlFor="zip">Zip / Postal code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                placeholder="Postal code"
                value={formData.zip}
                onChange={handleChange}
                required
              />

              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="State / Region"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </>
          )}

          {step === 3 && (
            <>
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                required
              />

              <label className="checkbox-row" htmlFor="offers">
                <input
                  type="checkbox"
                  id="offers"
                  name="offers"
                  checked={formData.offers}
                  onChange={handleChange}
                />
                <span>I want to receive special offers &amp; Jackpot reminders</span>
              </label>

              <label className="checkbox-row" htmlFor="privacy">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleChange}
                  required
                />
                <span>
                  I have read and accept the <Link to="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <label className="checkbox-row" htmlFor="terms">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I confirm that I am 18+ and have read and accept the
                  {" "}
                  <Link to="/terms">Terms and Conditions</Link>.
                </span>
              </label>

              <div className="recaptcha-placeholder" role="group" aria-label="reCAPTCHA">
                <input
                  type="checkbox"
                  id="recaptcha"
                  name="recaptcha"
                  checked={formData.recaptcha}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="recaptcha">I'm not a robot</label>
              </div>
            </>
          )}

          <div className="form-navigation">
            {step > 1 && (
              <button type="button" className="btn btn-outline btn-dark" onClick={handleBack}>
                Back
              </button>
            )}

            {step < steps.length && (
              <button type="button" className="btn" onClick={handleNext}>
                Next
              </button>
            )}

            {step === steps.length && (
              <button
                type="submit"
                className="btn auth-btn"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? "Creating..." : "Create account"}
              </button>
            )}
          </div>
        </form>

        <p className="auth-callout">
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
