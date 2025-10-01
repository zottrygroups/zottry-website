import React from "react";
import "./LotteryCard.css";

function LotteryCard({ title, price, frequency, prize }) {
  return (
    <div className="lottery-card">
      <h2>{title}</h2>
      <p className="price">Ticket: {price}</p>
      <p>{frequency}</p>
      <p className="prize">Top Prize: {prize}</p>
      <button className="buy-btn">Play Now</button>
    </div>
  );
}

export default LotteryCard;
