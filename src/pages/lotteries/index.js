import React from "react";
import { Link } from "react-router-dom";
import "../../styles/lottery-index.css";

const lotteryCards = [
  {
    name: "Z-Spark",
    ticketPrice: "$1",
    firstPrize: "$1,000",
    frequency: "Daily draw",
    to: "/spark"
  },
  {
    name: "Z-Pulse",
    ticketPrice: "$2",
    firstPrize: "$10,000",
    frequency: "Every 48 hours",
    to: "/pulse"
  },
  {
    name: "Z-Blaze",
    ticketPrice: "$2.5",
    firstPrize: "$100,000",
    frequency: "Every 5 days",
    to: "/blaze"
  },
  {
    name: "Z-Cosmo",
    ticketPrice: "$3",
    firstPrize: "$250,000",
    frequency: "Every Wednesday",
    to: "/cosmo"
  },
  {
    name: "Z-Legend",
    ticketPrice: "$5",
    firstPrize: "$600,000",
    frequency: "Every 15 days",
    to: "/legend"
  }
];

function LotteryIndex() {
  return (
    <div className="lottery-index">
      <header className="lottery-index__header">
        <h1>All Zottry Lotteries</h1>
        <p>Pick your favourite draw and secure your ticket for the next game.</p>
      </header>
      <div className="lottery-index__grid">
        {lotteryCards.map((card) => (
          <article key={card.name} className="lottery-index__card">
            <h2>{card.name}</h2>
            <dl>
              <div>
                <dt>Ticket Price</dt>
                <dd>{card.ticketPrice}</dd>
              </div>
              <div>
                <dt>First Prize</dt>
                <dd>{card.firstPrize}</dd>
              </div>
              <div>
                <dt>Frequency</dt>
                <dd>{card.frequency}</dd>
              </div>
            </dl>
            <Link className="lottery-index__cta" to={card.to}>
              Play Now
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default LotteryIndex;
