import React from "react";
import "./LotteryCard.css";

function LotteryCard({
  title,
  price,
  frequency,
  prize,
  description,
  nextDraw,
  badge,
  ctaLabel = "Play Now",
  onAction
}) {
  return (
    <article className="lottery-card">
      {badge && <span className="lottery-badge">{badge}</span>}
      <h2>{title}</h2>
      {frequency && <p className="lottery-subtitle">{frequency}</p>}
      {description && <p className="lottery-description">{description}</p>}
      <div className="lottery-meta">
        {price && <span className="price">Ticket {price}</span>}
        {prize && <span className="prize">Top Prize {prize}</span>}
      </div>
      {nextDraw && <p className="lottery-next">Next draw · {nextDraw}</p>}
      <button type="button" className="buy-btn" onClick={onAction}>
        {ctaLabel}
      </button>
    </article>
  );
}

export default LotteryCard;
