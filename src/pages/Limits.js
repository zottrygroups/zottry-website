import React, { useState } from "react";
import "../styles/account.css";

const limitOptions = [
  "No Limit",
  "€50",
  "€100",
  "€200",
  "Custom"
];

function Limits() {
  const [limits, setLimits] = useState({
    daily: "€100",
    weekly: "€200",
    monthly: "No Limit"
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLimits((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>My Limits</h1>
        <p>Stay in control of your play with flexible daily, weekly, and monthly deposit limits.</p>
      </header>

      <form className="account-card" onSubmit={handleSubmit}>
        <div className="account-section">
          <h2>Why set limits?</h2>
          <p>
            Setting deposit limits helps you manage your play responsibly. Adjust them any time to
            match your budget.
          </p>
        </div>

        <div className="account-limit-grid">
          {[
            { key: "daily", label: "Daily limit" },
            { key: "weekly", label: "Weekly limit" },
            { key: "monthly", label: "Monthly limit" }
          ].map(({ key, label }) => (
            <div key={key} className="account-card" style={{ padding: "1.2rem" }}>
              <h3 className="account-card__title" style={{ marginBottom: "0.65rem" }}>
                {label}
              </h3>
              <select
                name={key}
                className="account-select"
                value={limits[key]}
                onChange={handleChange}
                aria-label={`${label} selection`}
              >
                {limitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {limits[key] === "Custom" && (
                <input
                  type="number"
                  min="0"
                  step="10"
                  placeholder="Enter custom amount"
                  style={{ marginTop: "0.75rem" }}
                />
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="account-button account-button--warning" style={{ marginTop: "1.5rem" }}>
          Set limits
        </button>
      </form>
    </div>
  );
}

export default Limits;
