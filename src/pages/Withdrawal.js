import React, { useState } from "react";
import "../styles/account.css";

const methods = [
  {
    id: "local-transfer",
    label: "Local Transfer",
    description: "Transfer directly to your verified bank account.",
    badge: "No fees"
  },
  {
    id: "icash",
    label: "iCash.one",
    description: "Fast payout to your iCash.one wallet.",
    badge: "Instant"
  }
];

function Withdrawal() {
  const [selectedMethod, setSelectedMethod] = useState(methods[0].id);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Withdrawal</h1>
        <p>Choose a payout method and confirm your withdrawal request.</p>
      </header>

      <form className="account-card" onSubmit={handleSubmit}>
        <div className="account-section">
          <h2>Select a payout method</h2>
          <p>Available options depend on your verified details and recent activity.</p>
        </div>
        <div className="account-radio-group">
          {methods.map((method) => (
            <label key={method.id} className="account-radio-option" htmlFor={method.id}>
              <input
                id={method.id}
                type="radio"
                name="withdrawal-method"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={(event) => setSelectedMethod(event.target.value)}
              />
              <div>
                <strong>{method.label}</strong>
                <p>{method.description}</p>
                <span className="account-status">{method.badge}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="account-section">
          <label htmlFor="withdrawal-amount">
            Withdrawal amount
            <input
              id="withdrawal-amount"
              type="number"
              step="0.01"
              min="10"
              placeholder="Enter amount"
            />
          </label>
          <button type="submit" className="account-button">Submit withdrawal</button>
        </div>
      </form>
    </div>
  );
}

export default Withdrawal;
