import React, { useState } from "react";
import "../styles/account.css";

function SelfExclusion() {
  const [temporaryDate, setTemporaryDate] = useState("");

  const handleTemporarySubmit = (event) => {
    event.preventDefault();
  };

  const handlePermanentSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Self Exclusion</h1>
        <p>
          Control your access to Lotto247 by activating a temporary break or closing your account
          permanently.
        </p>
      </header>

      <section className="account-card">
        <div className="account-section">
          <h2>Temporary self exclusion</h2>
          <p>
            Choose a date until which your account will remain blocked. You can always reach out to
            our support team if you need assistance.
          </p>
        </div>
        <form className="account-section" onSubmit={handleTemporarySubmit}>
          <label htmlFor="self-exclusion-date">
            Block my account until
            <input
              id="self-exclusion-date"
              type="date"
              value={temporaryDate}
              onChange={(event) => setTemporaryDate(event.target.value)}
            />
          </label>
          <button type="submit" className="account-button account-button--warning">
            Block account temporarily
          </button>
        </form>
      </section>

      <section className="account-card" style={{ marginTop: "1.5rem" }}>
        <div className="account-section">
          <h2>Permanent self exclusion</h2>
          <p>
            Permanently closing your account will forfeit any remaining bonuses and you will not be
            able to reopen it. Please make sure this is the right option for you.
          </p>
        </div>
        <form onSubmit={handlePermanentSubmit} className="account-flex">
          <button type="submit" className="account-button account-button--danger">
            Close my account
          </button>
          <button type="button" className="account-button account-button--secondary">
            Contact support
          </button>
        </form>
      </section>
    </div>
  );
}

export default SelfExclusion;
