import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import Modal from "../../components/ui/Modal";
import "../../styles/account.css";
import "../../styles/lottery-template.css";

const HOW_TO_PLAY_STEPS = ["Register", "Deposit", "Buy Ticket", "Wait for Draw", "Check Results"];

const PRIZE_COLUMNS = [
  { key: "tier", header: "Prize Tier" },
  { key: "details", header: "Details" },
  { key: "payout", header: "Payout", align: "right" }
];

const RESULTS_COLUMNS = [
  { key: "date", header: "Date" },
  { key: "numbers", header: "Winning Numbers" }
];

const computeTimeLeft = (targetDate) => {
  const target = new Date(targetDate);
  if (Number.isNaN(target.getTime())) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { totalMs: diff, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { totalMs: diff, days, hours, minutes, seconds };
};

function LotteryTemplate({
  name,
  ticketPrice,
  firstPrize,
  frequency,
  nextDrawDate,
  pastResults = []
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(nextDrawDate));

  useEffect(() => {
    setTimeLeft(computeTimeLeft(nextDrawDate));
    const timer = window.setInterval(() => {
      setTimeLeft(computeTimeLeft(nextDrawDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [nextDrawDate]);

  const cadence = typeof frequency === "string" ? frequency.toLowerCase() : "regularly";
  const heroTagline = useMemo(
    () => `${firstPrize} up for grabs ${cadence.includes("every") || cadence.includes("daily") ? cadence : `every ${cadence}`}.`,
    [firstPrize, cadence]
  );

  const formattedNextDraw = useMemo(() => {
    const parsed = new Date(nextDrawDate);
    if (Number.isNaN(parsed.getTime())) {
      return "To be confirmed";
    }
    return parsed.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, [nextDrawDate]);

  const prizeRows = useMemo(
    () => [
      {
        id: "first-prize",
        tier: "First Prize",
        details: "Match all numbers",
        payout: firstPrize
      }
    ],
    [firstPrize]
  );

  const resultsRows = useMemo(
    () =>
      pastResults
        .slice(0, 3)
        .map((result, index) => {
          const displayNumbers = Array.isArray(result.numbers)
            ? result.numbers.join(" ")
            : result.numbers;

          let displayDate = result.date;
          const parsed = new Date(result.date);
          if (!Number.isNaN(parsed.getTime())) {
            displayDate = parsed.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric"
            });
          }

          return {
            id: `${result.date}-${index}`,
            date: displayDate,
            numbers: displayNumbers
          };
        }),
    [pastResults]
  );

  const timeSegments = [
    { label: "Days", value: String(timeLeft.days).padStart(2, "0") },
    { label: "Hours", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "Minutes", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "Seconds", value: String(timeLeft.seconds).padStart(2, "0") }
  ];

  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="page lottery-template">
      <Card
        title={name}
        headingLevel={1}
        description={heroTagline}
        actions={
          <button type="button" className="btn btn-secondary" onClick={handleActionClick}>
            Play Now
          </button>
        }
        className="lottery-template__hero"
      >
        <div className="lottery-template__metrics">
          <div className="lottery-template__metric">
            <span className="lottery-template__metric-label">Ticket Price</span>
            <span className="lottery-template__metric-value">{ticketPrice}</span>
          </div>
          <div className="lottery-template__metric">
            <span className="lottery-template__metric-label">First Prize</span>
            <span className="lottery-template__metric-value">{firstPrize}</span>
          </div>
          <div className="lottery-template__metric">
            <span className="lottery-template__metric-label">Frequency</span>
            <span className="lottery-template__metric-value">{frequency}</span>
          </div>
        </div>
      </Card>

      <section className="lottery-template__primary">
        <Card title="Next draw" className="lottery-template__countdown-card" spacing="compact">
          <p className="lottery-template__next-draw">Next draw: {formattedNextDraw}</p>
          {timeLeft.totalMs <= 0 ? (
            <p className="lottery-template__countdown-status">The next draw is underway. Check back soon!</p>
          ) : (
            <div className="lottery-template__countdown-grid">
              {timeSegments.map((segment) => (
                <div key={segment.label} className="lottery-template__countdown-segment">
                  <span className="lottery-template__countdown-value">{segment.value}</span>
                  <span className="lottery-template__countdown-label">{segment.label}</span>
                </div>
              ))}
            </div>
          )}
          <button type="button" className="btn" onClick={handleActionClick}>
            Play Now
          </button>
        </Card>

        <Card title="Prize breakdown" className="lottery-template__prize-card" spacing="compact">
          <DataTable
            columns={PRIZE_COLUMNS}
            rows={prizeRows}
            getRowKey={(row) => row.id}
            ariaLabel={`${name} prize breakdown`}
          />
        </Card>
      </section>

      <Card
        title="How to play"
        description="Follow these simple steps to join the next draw."
        className="lottery-template__how-to"
      >
        <ol className="lottery-template__steps">
          {HOW_TO_PLAY_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </Card>

      <Card
        title="Recent results"
        description="Catch up on the last draws and compare winning numbers."
        className="lottery-template__results"
      >
        <DataTable
          columns={RESULTS_COLUMNS}
          rows={resultsRows}
          getRowKey={(row) => row.id}
          ariaLabel={`${name} past results`}
          emptyMessage="No results available yet."
        />
      </Card>

      <Card className="lottery-template__cta-card" spacing="compact">
        <div>
          <h2>Ready to buy your ticket?</h2>
          <p>Secure your spot in the next {name} draw before the countdown hits zero.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleActionClick}>
          Buy Ticket
        </button>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Coming Soon"
        description="Ticket sales for this draw will open shortly."
        footer={
          <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
            Got it
          </button>
        }
      >
        <p>
          We are putting the finishing touches on our secure checkout. In the meantime, explore other
          Zottry games and get ready to play as soon as tickets become available.
        </p>
      </Modal>
    </div>
  );
}

export default LotteryTemplate;
