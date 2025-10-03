import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import "../styles/account.css";

const STORAGE_KEY = "zottry.player.limits";

const defaultLimits = {
  deposits: {
    daily: 100,
    weekly: 400,
    monthly: 1000
  },
  losses: {
    daily: 50,
    weekly: 200,
    monthly: 600
  }
};

const sections = [
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" }
];

function Limits() {
  const [limits, setLimits] = useState(defaultLimits);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored);
      setLimits({
        deposits: { ...defaultLimits.deposits, ...parsed?.deposits },
        losses: { ...defaultLimits.losses, ...parsed?.losses }
      });
    } catch (error) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const handleChange = (group, key, value) => {
    setLimits((previous) => ({
      ...previous,
      [group]: {
        ...previous[group],
        [key]: Number(value)
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback(null);

    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(limits));
      setFeedback({ status: "success", message: "Limits saved successfully." });
    } catch (error) {
      setFeedback({ status: "error", message: "Unable to save your preferences." });
    }
  };

  const formattedSummary = useMemo(
    () =>
      sections.map(({ key }) => `${key.charAt(0).toUpperCase() + key.slice(1)}: $${limits.deposits[key]}`),
    [limits.deposits]
  );

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>My Limits</h1>
        <p>Set the maximum amounts you can deposit or lose over a chosen time period.</p>
      </header>

      <Card
        title="Why limits help"
        description="Deposit and loss limits keep play fun and within your comfort zone. Adjust them any time — changes apply immediately."
      >
        <ul className="limits-list">
          <li>Daily limits apply to the last 24 hours and refresh at midnight.</li>
          <li>Weekly limits track the previous 7 days of deposits and losses.</li>
          <li>Monthly limits span the last 30 days to give a broader safety net.</li>
        </ul>
      </Card>

      <Card
        as="form"
        onSubmit={handleSubmit}
        title="Set deposit and loss limits"
        description="Enter the maximum USD amounts you are comfortable with."
      >
        <div className="limits-grid">
          <section>
            <h3 className="limits-heading">Deposit limits</h3>
            <div className="limits-fields">
              {sections.map(({ key, label }) => (
                <label key={`deposit-${key}`} className="limits-field">
                  {label}
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={limits.deposits[key]}
                    onChange={(event) => handleChange("deposits", key, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>

          <section>
            <h3 className="limits-heading">Loss limits</h3>
            <div className="limits-fields">
              {sections.map(({ key, label }) => (
                <label key={`loss-${key}`} className="limits-field">
                  {label}
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={limits.losses[key]}
                    onChange={(event) => handleChange("losses", key, event.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>
        </div>

        {feedback ? (
          <div
            role="status"
            className={`limits-feedback limits-feedback--${feedback.status}`.trim()}
          >
            {feedback.message}
          </div>
        ) : null}

        <button type="submit" className="account-button account-button--warning">
          Save limits
        </button>
      </Card>

      <Card title="Current deposit plan" spacing="compact">
        <p className="limits-summary">{formattedSummary.join(" · ")}</p>
      </Card>
    </div>
  );
}

export default Limits;
