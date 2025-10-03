import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import "./Lotteries.css";

const LOTTERIES = [
  {
    name: "Z-Spark",
    ticketPrice: "$1",
    firstPrize: "$1,000",
    frequency: "Daily",
    route: "/spark"
  },
  {
    name: "Z-Pulse",
    ticketPrice: "$2",
    firstPrize: "$10,000",
    frequency: "Every 48 Hours",
    route: "/pulse"
  },
  {
    name: "Z-Blaze",
    ticketPrice: "$2.50",
    firstPrize: "$100,000",
    frequency: "Every 5 Days",
    route: "/blaze"
  },
  {
    name: "Z-Cosmo",
    ticketPrice: "$3",
    firstPrize: "$250,000",
    frequency: "Every Wednesday",
    route: "/cosmo"
  },
  {
    name: "Z-Legend",
    ticketPrice: "$5",
    firstPrize: "$600,000",
    frequency: "Every 15 Days",
    route: "/legend"
  }
];

function Lotteries() {
  return (
    <div className="page lotteries-page">
      <header className="lotteries-page__header">
        <h1>Our Lotteries</h1>
        <p>
          Explore signature Zottry draws, compare prize levels, and jump straight into
          the next round with a single click.
        </p>
      </header>

      <div className="lotteries-page__grid">
        {LOTTERIES.map((lottery) => (
          <Card
            key={lottery.name}
            title={lottery.name}
            headingLevel={3}
            className="lotteries-page__card"
            actions={
              <Link className="btn btn-secondary lotteries-page__cta" to={lottery.route}>
                Play Now
              </Link>
            }
          >
            <dl className="lotteries-page__details">
              <div>
                <dt>Ticket Price</dt>
                <dd>{lottery.ticketPrice}</dd>
              </div>
              <div>
                <dt>First Prize</dt>
                <dd>{lottery.firstPrize}</dd>
              </div>
              <div>
                <dt>Frequency</dt>
                <dd>{lottery.frequency}</dd>
              </div>
            </dl>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Lotteries;
