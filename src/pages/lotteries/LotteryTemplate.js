import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import "../../styles/account.css";

const prizeColumns = [
  { key: "tier", header: "Tier" },
  { key: "matches", header: "Matches" },
  {
    key: "payout",
    header: "Prize",
    render: (row) => row.payout
  }
];

const formatCountdown = (targetTimestamp, currentTimestamp) => {
  const diff = targetTimestamp - currentTimestamp;
  if (diff <= 0) {
    return { label: "Draw in progress", expired: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    label: `${days}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`,
    expired: false
  };
};

function LotteryTemplate({
  name,
  price,
  frequencyText,
  description,
  rules,
  prizeTable,
  getNextDraw,
  jackpotText
}) {
  const [now, setNow] = useState(() => Date.now());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const nextDraw = useMemo(() => {
    const reference = new Date(now);
    return getNextDraw(reference);
  }, [getNextDraw, now]);

  const countdown = useMemo(() => formatCountdown(nextDraw.getTime(), now), [nextDraw, now]);

  const formattedNextDraw = useMemo(() => {
    if (!nextDraw || Number.isNaN(nextDraw.getTime())) {
      return "TBC";
    }
    return nextDraw.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, [nextDraw]);

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>{name}</h1>
        <p>{description}</p>
      </header>

      <Card spacing="compact" title="Draw overview">
        <div className="lottery-overview">
          <div>
            <span className="lottery-overview__label">Ticket price</span>
            <p className="lottery-overview__value">{price}</p>
          </div>
          <div>
            <span className="lottery-overview__label">Draw frequency</span>
            <p className="lottery-overview__value">{frequencyText}</p>
          </div>
          <div>
            <span className="lottery-overview__label">Next draw</span>
            <p className="lottery-overview__value">{formattedNextDraw}</p>
          </div>
          {jackpotText ? (
            <div>
              <span className="lottery-overview__label">Jackpot</span>
              <p className="lottery-overview__value">{jackpotText}</p>
            </div>
          ) : null}
        </div>
        <div className="lottery-countdown">
          <span className="lottery-countdown__label">Time until draw</span>
          <strong className="lottery-countdown__value">{countdown.label}</strong>
          <button
            type="button"
            className="account-button account-button--warning"
            onClick={() => setIsModalOpen(true)}
          >
            Buy ticket
          </button>
        </div>
      </Card>

      <Card title="How to play" description="Follow these quick steps before the draw closes.">
        <ol className="lottery-rules">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </Card>

      <Card title="Prize table">
        <DataTable
          columns={prizeColumns}
          rows={prizeTable}
          getRowKey={(row) => `${row.tier}-${row.payout}`}
          ariaLabel={`${name} prize table`}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ticket sales opening soon"
        description="We are finalising payments with our provider before ticket purchases go live."
        footer={(
          <button type="button" className="account-button" onClick={() => setIsModalOpen(false)}>
            Close
          </button>
        )}
      >
        <p style={{ margin: 0 }}>
          You will receive an email from Zottry as soon as {name} tickets are available to purchase
          online. In the meantime, add funds to your wallet and explore other draws.
        </p>
      </Modal>
    </div>
  );
}

export default LotteryTemplate;
