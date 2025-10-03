import React from "react";
import Card from "../../components/ui/Card";
import "../../styles/account.css";

function About() {
  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>About Zottry</h1>
        <p>We build digital lottery experiences that prioritise transparency and responsible play.</p>
      </header>

      <Card title="Our mission" spacing="compact">
        <p>
          Zottry launched in 2022 with a goal to modernise global lotteries. Our team combines
          decades of lottery operations expertise with a passion for customer-first digital products.
        </p>
      </Card>

      <Card title="How we operate">
        <ul className="limits-list">
          <li>Drawing equipment is certified to GLI-11 standards and audited quarterly.</li>
          <li>All ticket funds are held in safeguarded accounts monitored by Curaçao eGaming.</li>
          <li>Player security is enforced with bank-grade encryption and strict KYC procedures.</li>
        </ul>
      </Card>
    </div>
  );
}

export default About;
