import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";
import PrizeTable from "./PrizeTable";
import PastResultsTable from "./PastResultsTable";
import BuyTicketButton from "./BuyTicketButton";
import "../../styles/lottery.css";

const howToPlaySteps = [
  "Register",
  "Deposit",
  "Buy Ticket",
  "Wait for Draw",
  "Check Results"
];

function LotteryPage({
  name,
  tagline,
  ticketPrice,
  frequency,
  firstPrize,
  nextDrawDate,
  pastResults
}) {
  return (
    <div className="lottery-page">
      <header className="lottery-hero">
        <div>
          <p className="lottery-hero__eyebrow">Zottry Lottery</p>
          <h1 className="lottery-hero__title">{name}</h1>
          <p className="lottery-hero__tagline">{tagline}</p>
        </div>
        <Link to="/" className="lottery-hero__back">
          ← Back to Home
        </Link>
      </header>

      <section className="lottery-grid">
        <Countdown nextDrawDate={nextDrawDate} />
        <PrizeTable ticketPrice={ticketPrice} frequency={frequency} firstPrize={firstPrize} />
        <div className="lottery-card">
          <h2 className="lottery-card__title">How to Play</h2>
          <ol className="lottery-steps">
            {howToPlaySteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <BuyTicketButton lotteryName={name} />
        </div>
      </section>

      <PastResultsTable pastResults={pastResults} />
    </div>
  );
}

export default LotteryPage;
