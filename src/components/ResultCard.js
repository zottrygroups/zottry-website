import React from "react";
import "./ResultCard.css";

function ResultCard({ title, drawDate, winningNumbers, jackpot, winners }) {
  return (
    <article className="result-card">
      <header>
        <h3>{title}</h3>
        <span className="result-card__date">{drawDate}</span>
      </header>
      <ul className="result-card__numbers">
        {winningNumbers.map((number) => (
          <li key={number}>{number}</li>
        ))}
      </ul>
      <div className="result-card__footer">
        <span className="result-card__jackpot">Jackpot {jackpot}</span>
        <span className="result-card__winners">{winners}</span>
      </div>
    </article>
  );
}

export default ResultCard;
