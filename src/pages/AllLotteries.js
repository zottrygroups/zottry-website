import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LotteryCard from "../components/LotteryCard";
import { useLotteryData } from "../context/LotteryDataContext";
import { toPriceValue } from "../services/lotteryService";
import { getLotteryCtaLabel, getLotteryRoute } from "../constants/lotteries";
import "./AllLotteries.css";

function AllLotteries() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lotteries, loading, error } = useLotteryData();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("any");
  const [sortOrder, setSortOrder] = useState(
    location.state?.highlight === "featured" ? "jackpot-desc" : "recommended"
  );
  const [cadenceFilter, setCadenceFilter] = useState("all");

  const cadenceOptions = [
    { value: "all", label: "All rhythms" },
    { value: "daily", label: "Daily & rapid" },
    { value: "weekly", label: "Weekly" },
    { value: "twice-weekly", label: "Every few days" },
    { value: "monthly", label: "Monthly mega" }
  ];

  const filteredLotteries = useMemo(() => {
    let next = [...lotteries];

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      next = next.filter((lottery) =>
        [lottery.title, lottery.description, lottery.frequency]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(term))
      );
    }

    if (cadenceFilter !== "all") {
      next = next.filter((lottery) => {
        const cadenceMatches = lottery.cadence === cadenceFilter;
        const tagMatches = lottery.tags?.includes(cadenceFilter);

        if (cadenceFilter === "twice-weekly") {
          return (
            cadenceMatches ||
            lottery.cadence === "alternate-days" ||
            lottery.tags?.includes("fast")
          );
        }

        if (cadenceFilter === "daily") {
          return (
            cadenceMatches ||
            lottery.cadence === "alternate-days" ||
            lottery.tags?.includes("daily")
          );
        }

        return cadenceMatches || tagMatches;
      });
    }

    if (priceFilter !== "any") {
      next = next.filter((lottery) => {
        const priceValue = toPriceValue(lottery.priceValue ?? lottery.price);
        if (priceFilter === "under-2") {
          return priceValue < 2;
        }
        if (priceFilter === "2-4") {
          return priceValue >= 2 && priceValue <= 4;
        }
        return priceValue > 4;
      });
    }

    next.sort((a, b) => {
      const priceA = toPriceValue(a.priceValue ?? a.price);
      const priceB = toPriceValue(b.priceValue ?? b.price);
      const jackpotA = a.prizeValue ?? 0;
      const jackpotB = b.prizeValue ?? 0;

      switch (sortOrder) {
        case "price-asc":
          return priceA - priceB;
        case "price-desc":
          return priceB - priceA;
        case "jackpot-desc":
          return jackpotB - jackpotA;
        case "jackpot-asc":
          return jackpotA - jackpotB;
        default:
          return 0;
      }
    });

    return next.map((lottery) => ({
      ...lottery,
      ctaLabel: getLotteryCtaLabel(lottery.title),
      onAction: () => navigate(getLotteryRoute(lottery.id))
    }));
  }, [lotteries, searchTerm, cadenceFilter, priceFilter, sortOrder, navigate]);

  return (
    <div className="page all-lotteries">
      <header className="all-lotteries__intro">
        <h1>All Lotteries</h1>
        <p>
          Choose from daily sparks, blazing jackpots, and legendary super draws.
          Every ticket you buy is protected by secure checkout and instant
          result notifications.
        </p>
      </header>

      <section className="lottery-controls" aria-label="Filter lotteries">
        <div className="control-block search-block">
          <label htmlFor="lottery-search">Search draws</label>
          <input
            id="lottery-search"
            type="search"
            placeholder="Search by name or jackpot"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="control-block">
          <label htmlFor="price-filter">Ticket price</label>
          <select
            id="price-filter"
            value={priceFilter}
            onChange={(event) => setPriceFilter(event.target.value)}
          >
            <option value="any">Any price</option>
            <option value="under-2">Under $2</option>
            <option value="2-4">$2 - $4</option>
            <option value="above-4">$4 and above</option>
          </select>
        </div>
        <div className="control-block">
          <label htmlFor="sort-order">Sort by</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="recommended">Recommended</option>
            <option value="jackpot-desc">Jackpot (high to low)</option>
            <option value="jackpot-asc">Jackpot (low to high)</option>
            <option value="price-asc">Ticket price (low to high)</option>
            <option value="price-desc">Ticket price (high to low)</option>
          </select>
        </div>
      </section>

      <section className="lottery-filters">
        <span className="filters-label">Draw cadence</span>
        <div className="chip-row" role="group" aria-label="Filter by cadence">
          {cadenceOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`chip ${
                cadenceFilter === option.value ? "chip--active" : ""
              }`.trim()}
              onClick={() => setCadenceFilter(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </section>

      <div className="lottery-meta-bar">
        <span>
          Showing {filteredLotteries.length} {filteredLotteries.length === 1 ? "draw" : "draws"}
        </span>
        {loading && <span className="loading-pill">Updating…</span>}
        {error && !loading && (
          <span className="error-pill" role="alert">
            We couldn't refresh draws. Try again shortly.
          </span>
        )}
      </div>

      <section className="lottery-grid">
        {filteredLotteries.length ? (
          filteredLotteries.map((lottery) => (
            <LotteryCard key={lottery.id} {...lottery} />
          ))
        ) : (
          <div className="empty-state" role="status">
            <h3>No draws match your filters</h3>
            <p>Try widening your search to see more options.</p>
            <button
              type="button"
              className="btn btn-outline btn-dark"
              onClick={() => {
                setSearchTerm("");
                setPriceFilter("any");
                setCadenceFilter("all");
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>

      <section className="all-lotteries__help">
        <h2>Need help picking a draw?</h2>
        <ul>
          <li>
            Try <strong>Z-Spark</strong> if you enjoy low-cost daily plays with
            frequent wins.
          </li>
          <li>
            Step up to <strong>Z-Blaze</strong> when you're ready for six-figure
            jackpots every few days.
          </li>
          <li>
            Reserve <strong>Z-Legend</strong> or <strong>Z-Cosmo</strong> for
            special occasions and syndicate plays.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AllLotteries;
