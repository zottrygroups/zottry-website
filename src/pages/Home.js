import React from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import LotteryCard from "../components/LotteryCard";
import { useLoginModal } from "../context/LoginModalContext";

const draws = [
  {
    id: "spark",
    title: "Z-SPARK",
    frequency: "Daily",
    price: "$1",
    prize: "$1,000",
    description: "High-energy daily draw with instant digital tickets.",
    route: "/spark"
  },
  {
    id: "pulse",
    title: "Z-PULSE",
    frequency: "Every 48 hours",
    price: "$2",
    prize: "$10,000",
    description: "Double the suspense, double the thrill in every 48-hour cycle.",
    route: "/pulse"
  },
  {
    id: "blaze",
    title: "Z-BLAZE",
    frequency: "Every 5 days",
    price: "$2.50",
    prize: "$100,000",
    description: "Mid-week crescendo with blazing-hot prize tiers.",
    route: "/blaze"
  },
  {
    id: "cosmo",
    title: "Z-COSMO",
    frequency: "Wednesdays",
    price: "$3",
    prize: "$250,000",
    description: "Orbit a constellation of rewards with mid-week cosmic wins.",
    route: "/cosmo"
  },
  {
    id: "legend",
    title: "Z-LEGEND",
    frequency: "Every 15 days",
    price: "$5",
    prize: "$600,000",
    description: "Epic jackpots designed for those who dream bigger.",
    route: "/legend"
  }
];

function Home() {
  const navigate = useNavigate();
  const { openLoginModal } = useLoginModal();

  const heroHighlight = draws.slice(0, 3).map((draw) => ({
    label: draw.title,
    value: draw.prize
  }));

  return (
    <main className="bg-white">
      <HeroSection
        title="Play. Win. Celebrate."
        subtitle="Your global gateway to life-changing jackpots with transparent odds, secure payouts, and instant notifications."
        primaryAction={{ label: "Explore Lotteries", onClick: () => navigate("/lotteries") }}
        secondaryAction={{ label: "Learn How to Play", onClick: () => navigate("/how-to-play") }}
        highlight={heroHighlight}
      />

      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 lg:py-20">
          <header className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-heading font-bold text-brand-blue sm:text-4xl">
              Our Draws
            </h2>
            <p className="mx-auto max-w-2xl text-base text-brand-dark/70">
              Discover the Zottry lineup — curated draws designed to match every playing style. Pick the frequency
              that fits your rhythm and chase prizes that grow with every ticket.
            </p>
          </header>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {draws.map((draw) => (
              <LotteryCard
                key={draw.id}
                title={draw.title}
                frequency={draw.frequency}
                price={draw.price}
                prize={draw.prize}
                description={draw.description}
                onAction={() => navigate(draw.route)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-blue">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center text-white sm:px-10 lg:flex-row lg:justify-between lg:text-left">
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-semibold text-white sm:text-3xl">
              Join thousands of winners worldwide!
            </h3>
            <p className="max-w-xl text-base text-white/80">
              Set your limits, pick your draw, and watch the results roll in. Zottry keeps every ticket secure and every
              prize transparent.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openLoginModal("register")}
            className="inline-flex items-center justify-center rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white shadow-md shadow-brand-red/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Register Now
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
