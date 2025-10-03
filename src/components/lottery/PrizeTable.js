import React from "react";

function PrizeTable({ ticketPrice, frequency, firstPrize }) {
  const rows = [
    { label: "First Prize", value: firstPrize },
    { label: "Ticket Price", value: ticketPrice },
    { label: "Draw Frequency", value: frequency }
  ];

  return (
    <div className="lottery-card">
      <h2 className="lottery-card__title">Prize Overview</h2>
      <ul className="lottery-prize-list">
        {rows.map((row) => (
          <li key={row.label} className="lottery-prize-list__item">
            <span className="lottery-prize-list__label">{row.label}</span>
            <span className="lottery-prize-list__value">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrizeTable;
