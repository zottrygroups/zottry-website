import React from "react";
import Card from "../../components/ui/Card";
import "../../styles/account.css";

function Terms() {
  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Terms & Conditions</h1>
        <p>Key rules that govern your use of the Zottry platform.</p>
      </header>

      <Card title="Essential terms">
        <ol className="lottery-rules">
          <li>Players must be 18+ and comply with the laws of their jurisdiction.</li>
          <li>All ticket sales are final; cancellations are only possible before the draw closes.</li>
          <li>Winnings are credited to your Zottry wallet within 24 hours of result confirmation.</li>
          <li>Zottry may request additional identity verification before processing withdrawals.</li>
        </ol>
      </Card>
    </div>
  );
}

export default Terms;
