import React from "react";
import Card from "../../components/ui/Card";
import "../../styles/account.css";

function ResponsiblePlay() {
  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Responsible Play</h1>
        <p>Tools and support to help you stay in control of your lottery entertainment.</p>
      </header>

      <Card title="Support tools">
        <ul className="limits-list">
          <li>Set deposit and loss limits that suit your budget.</li>
          <li>Activate self-exclusion for cooling-off periods from 7 days to permanent.</li>
          <li>Track your spending and results in My Profile &gt; Wallet activity.</li>
        </ul>
      </Card>

      <Card title="Need to talk?" spacing="compact">
        <p className="self-exclusion-support">
          Reach trained advisors 24/7 via support@zottry.com or the live chat widget. We also partner
          with BeGambleAware.org for confidential guidance in your region.
        </p>
      </Card>
    </div>
  );
}

export default ResponsiblePlay;
