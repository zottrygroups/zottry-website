import React, { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import { useWallet } from "../context/WalletContext";
import "../styles/account.css";

const paymentMethods = [
  {
    id: "crypto",
    label: "Crypto Wallet",
    description: "Send funds to your verified Bitcoin or USDT wallet.",
    details: "Processed within 24 hours"
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Withdraw to your linked PayPal account.",
    details: "Arrives instantly"
  },
  {
    id: "card",
    label: "Debit / Credit Card",
    description: "Transfer back to the cards used for deposits.",
    details: "1-3 business days"
  }
];

function Withdrawal() {
  const { balance, formattedBalance, requestWithdrawal } = useWallet();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(paymentMethods[0].id);
  const [feedback, setFeedback] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const parsedAmount = Number(amount);
  const isAmountInvalid = Number.isNaN(parsedAmount) || parsedAmount <= 0;
  const exceedsBalance = !isAmountInvalid && parsedAmount > balance;
  const disableSubmit = isAmountInvalid || exceedsBalance;

  const summary = useMemo(
    () => ({
      method: paymentMethods.find((item) => item.id === method)
    }),
    [method]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setFeedback(null);

    const result = requestWithdrawal(parsedAmount);
    if (!result.ok) {
      setFeedback({ status: "error", message: result.message });
      return;
    }

    setAmount("");
    setFeedback({ status: "success", message: "Withdrawal Request Submitted" });
  };

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Withdrawal</h1>
        <p>Choose a payout method and confirm your withdrawal request.</p>
      </header>

      <Card
        title="Wallet overview"
        description="You can withdraw up to your available wallet balance."
        spacing="compact"
      >
        <div className="withdrawal-summary">
          <div>
            <span className="withdrawal-label">Available balance</span>
            <p className="withdrawal-amount">{formattedBalance}</p>
          </div>
          <button type="button" className="account-button account-button--secondary" onClick={() => setShowComingSoon(true)}>
            Add funds
          </button>
        </div>
      </Card>

      <Card
        as="form"
        onSubmit={handleSubmit}
        title="Withdrawal details"
        description="Select where to send your funds and enter the amount to withdraw."
      >
        <div className="account-radio-group">
          {paymentMethods.map((option) => (
            <label key={option.id} className="account-radio-option" htmlFor={option.id}>
              <input
                id={option.id}
                type="radio"
                name="withdrawal-method"
                value={option.id}
                checked={method === option.id}
                onChange={(event) => setMethod(event.target.value)}
              />
              <div>
                <strong>{option.label}</strong>
                <p className="withdrawal-option__description">{option.description}</p>
                <span className="account-status">{option.details}</span>
              </div>
            </label>
          ))}
        </div>

        <label htmlFor="withdrawal-amount" className="withdrawal-input">
          Withdrawal amount (USD)
          <input
            id="withdrawal-amount"
            type="number"
            step="0.01"
            min="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter amount"
            aria-describedby="withdrawal-help"
          />
        </label>
        <p id="withdrawal-help" className="withdrawal-help-text">
          Minimum withdrawal is $1.00. Requests above your wallet balance are not allowed.
        </p>

        {feedback ? (
          <div
            role="status"
            className={`withdrawal-feedback withdrawal-feedback--${feedback.status}`.trim()}
          >
            {feedback.message}
          </div>
        ) : null}
        {exceedsBalance ? (
          <p className="withdrawal-error" role="alert">
            Withdrawal amount exceeds your wallet balance.
          </p>
        ) : null}

        <button type="submit" className="account-button" disabled={disableSubmit}>
          Submit withdrawal
        </button>
      </Card>

      <Card
        title="What happens next?"
        spacing="compact"
        description={`We will send a confirmation email once your ${summary.method?.label.toLowerCase()} withdrawal is processed.`}
      >
        <ul className="withdrawal-tips">
          <li>Withdrawals are reviewed by our risk team before release.</li>
          <li>Ensure the destination account matches your verified details.</li>
          <li>Contact support if you need to update your payout information.</li>
        </ul>
      </Card>

      <Modal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Funding coming soon"
        description="Direct deposits from this screen will be available shortly."
        footer={(
          <button
            type="button"
            className="account-button"
            onClick={() => setShowComingSoon(false)}
          >
            Got it
          </button>
        )}
      >
        <p style={{ margin: 0 }}>
          You can still top up using the Add Funds shortcut in the navigation bar. We will notify you
          the moment instant deposits launch here.
        </p>
      </Modal>
    </div>
  );
}

export default Withdrawal;
