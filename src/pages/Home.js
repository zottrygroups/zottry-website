import React from "react";
import { Link } from "react-router-dom";
import LotteryCard from "../components/LotteryCard";
import "./Home.css";

const draws = [
  {
    title: "Z-Spark",
    price: "$1",
    frequency: "Daily draw",
    prize: "$1,000"
  },
  {
    title: "Z-Blaze",
    price: "$2.50",
    frequency: "Every 5 days",
    prize: "$100,000"
  },
  {
    title: "Z-Legend",
    price: "$5",
    frequency: "Twice a month",
    prize: "$600,000"
  }
];

const winners = [
  { name: "Maria P.", draw: "Z-Spark", amount: "$1,000", location: "Austin, USA" },
  { name: "Samuel K.", draw: "Z-Blaze", amount: "$25,000", location: "Toronto, CA" },
  { name: "Amina R.", draw: "Z-Legend", amount: "$250,000", location: "Dubai, UAE" }
];

function Home() {
  return (
    <main className="home">
      <section className="banner">
        <div className="banner-content">
          <h1>Every ticket sparks a new legend</h1>
          <p>Play Z-Spark, Z-Blaze, or Z-Legend for a chance to win life-changing jackpots every day, every week, and every month.</p>
          <div className="banner-actions">
            <a className="btn" href="#our-draws">Play Now</a>
            <Link className="btn btn-outline" to="/all-lotteries">Explore Lotteries</Link>
          </div>
        </div>
      </section>

      <section id="our-draws" className="our-draws page">
        <h2>Our Draws</h2>
        <p className="section-intro">Select your favourite draw, pick your lucky numbers, and we’ll handle the rest.</p>
        <div className="draw-grid">
          {draws.map((draw) => (
            <LotteryCard key={draw.title} {...draw} />
          ))}
        </div>
      </section>

      <section className="winners page">
        <h2>Winners Spotlight</h2>
        <p className="section-intro">Congratulations to our recent champions from around the world.</p>
        <div className="winners-grid">
          {winners.map((winner) => (
            <article key={winner.name} className="winner-card">
              <h3>{winner.name}</h3>
              <p className="winner-amount">{winner.amount}</p>
              <p>{winner.draw}</p>
              <p className="winner-location">{winner.location}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
