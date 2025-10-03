import React from "react";
import Card from "../../components/ui/Card";
import "../../styles/account.css";

function Privacy() {
  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Privacy Policy</h1>
        <p>How we collect, use, and protect your personal information.</p>
      </header>

      <Card title="Data we collect" spacing="compact">
        <ul className="limits-list">
          <li>Registration details such as name, email, and verified address.</li>
          <li>Play history, wallet transactions, and support interactions.</li>
          <li>Device and usage insights that help us improve the platform.</li>
        </ul>
      </Card>

      <Card title="Your controls">
        <p>
          You can update contact details, request data exports, and revoke marketing consent at any time
          from your profile settings. Contact privacy@zottry.com for dedicated support requests.
        </p>
      </Card>
    </div>
  );
}

export default Privacy;
