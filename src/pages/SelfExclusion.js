import React, { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import "../styles/account.css";

const STORAGE_KEY = "zottry.player.selfExclusion";

const periods = [
  {
    id: "7-days",
    label: "Take a 7 day break",
    description: "Access to your account is locked for 7 days.",
    duration: 7
  },
  {
    id: "30-days",
    label: "Pause for 30 days",
    description: "Ideal if you want a longer reset period.",
    duration: 30
  },
  {
    id: "permanent",
    label: "Permanent self exclusion",
    description: "Your account is permanently closed and cannot be reopened.",
    duration: null
  }
];

function SelfExclusion() {
  const [selected, setSelected] = useState(periods[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [savedChoice, setSavedChoice] = useState(null);

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
      if (parsed?.selection) {
        setSavedChoice(parsed);
        setSelected(parsed.selection);
      }
    } catch (error) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const handleConfirm = () => {
    if (typeof window === "undefined") {
      return;
    }

    const payload = {
      selection: selected,
      appliedAt: new Date().toISOString()
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setSavedChoice(payload);
    setFeedback({ status: "success", message: "Self exclusion updated." });
    setModalOpen(false);
  };

  const currentPeriod = periods.find((period) => period.id === selected);
  const savedPeriod = savedChoice
    ? periods.find((period) => period.id === savedChoice.selection)
    : null;

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Self Exclusion</h1>
        <p>Set a cooling-off period if you want to take a break from playing on Zottry.</p>
      </header>

      {savedPeriod ? (
        <Card spacing="compact" title="Active exclusion">
          <p className="self-exclusion-active">
            {savedPeriod.label} — Applied {new Date(savedChoice.appliedAt).toLocaleString()}
          </p>
        </Card>
      ) : null}

      <Card
        title="Choose your break"
        description="Select how long you would like your account access to be suspended."
      >
        <div className="self-exclusion-options">
          {periods.map((option) => (
            <label key={option.id} className="self-exclusion-option" htmlFor={option.id}>
              <input
                id={option.id}
                type="radio"
                name="self-exclusion"
                value={option.id}
                checked={selected === option.id}
                onChange={(event) => setSelected(event.target.value)}
              />
              <div>
                <strong>{option.label}</strong>
                <p>{option.description}</p>
              </div>
            </label>
          ))}
        </div>

        {feedback ? (
          <div
            className={`self-exclusion-feedback self-exclusion-feedback--${feedback.status}`.trim()}
            role="status"
          >
            {feedback.message}
          </div>
        ) : null}

        <button type="button" className="account-button account-button--warning" onClick={() => setModalOpen(true)}>
          Apply self exclusion
        </button>
      </Card>

      <Card title="Need support?" spacing="compact">
        <p className="self-exclusion-support">
          Our customer care team is available 24/7 at support@zottry.com if you need help managing your
          account limits or exclusions.
        </p>
      </Card>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Are you sure?"
        description="Once applied, you will be logged out immediately and access will be suspended for the selected duration."
        footer={(
          <>
            <button
              type="button"
              className="account-button account-button--secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
            <button type="button" className="account-button account-button--warning" onClick={handleConfirm}>
              Confirm exclusion
            </button>
          </>
        )}
      >
        <p style={{ margin: 0 }}>
          {currentPeriod?.label}. During this time you will not be able to log in or purchase tickets. If
          you selected permanent exclusion, your account will be closed for good.
        </p>
      </Modal>
    </div>
  );
}

export default SelfExclusion;
