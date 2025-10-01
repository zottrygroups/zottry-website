import React, { useMemo, useState } from "react";
import ResultCard from "../components/ResultCard";
import { useLotteryData } from "../context/LotteryDataContext";
import { formatDateISO, toJackpotValue } from "../services/lotteryService";
import "./LotteryResults.css";

function LotteryResults() {
  const { latestResults, archivedResults, loading, error } = useLotteryData();
  const [scope, setScope] = useState("latest");
  const [drawFilter, setDrawFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("recent");

  const activeResults = useMemo(() => {
    const source = scope === "latest" ? latestResults : archivedResults;
    let collection = source.map((result) => ({
      ...result,
      drawDate:
        result.drawDateISO && !result.drawDate
          ? formatDateISO(result.drawDateISO)
          : result.drawDate,
      jackpotValue: toJackpotValue(result.jackpotValue ?? result.jackpot)
    }));

    if (drawFilter !== "all") {
      collection = collection.filter((result) => result.title === drawFilter);
    }

    collection.sort((a, b) => {
      if (sortOrder === "recent") {
        return (
          new Date(b.drawDateISO || b.drawDate).getTime() -
          new Date(a.drawDateISO || a.drawDate).getTime()
        );
      }

      if (sortOrder === "jackpot-desc") {
        return b.jackpotValue - a.jackpotValue;
      }

      if (sortOrder === "jackpot-asc") {
        return a.jackpotValue - b.jackpotValue;
      }

      return 0;
    });

    return collection;
  }, [latestResults, archivedResults, scope, drawFilter, sortOrder]);

  const drawOptions = useMemo(() => {
    const uniqueTitles = new Set([
      ...latestResults.map((result) => result.title),
      ...archivedResults.map((result) => result.title)
    ]);

    return [
      { value: "all", label: "All draws" },
      ...Array.from(uniqueTitles)
        .sort()
        .map((title) => ({ value: title, label: title }))
    ];
  }, [latestResults, archivedResults]);

  return (
    <div className="page lottery-results">
      <header className="lottery-results__intro">
        <h1>Lottery Results</h1>
        <p>
          We publish the official winning numbers moments after every draw.
          Track jackpots, share counts, and your personal entries in one place.
        </p>
      </header>

      <section className="results-controls" aria-label="Filter lottery results">
        <div className="tab-group" role="tablist" aria-label="Select results window">
          <button
            type="button"
            role="tab"
            aria-selected={scope === "latest"}
            className={`tab ${scope === "latest" ? "tab--active" : ""}`.trim()}
            onClick={() => setScope("latest")}
          >
            Latest draws
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={scope === "archive"}
            className={`tab ${scope === "archive" ? "tab--active" : ""}`.trim()}
            onClick={() => setScope("archive")}
          >
            Archive (90 days)
          </button>
        </div>

        <div className="control-block">
          <label htmlFor="draw-filter">Draw</label>
          <select
            id="draw-filter"
            value={drawFilter}
            onChange={(event) => setDrawFilter(event.target.value)}
          >
            {drawOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-block">
          <label htmlFor="results-sort">Sort by</label>
          <select
            id="results-sort"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
          >
            <option value="recent">Most recent</option>
            <option value="jackpot-desc">Jackpot (high to low)</option>
            <option value="jackpot-asc">Jackpot (low to high)</option>
          </select>
        </div>
      </section>

      <div className="results-meta">
        <span>
          Showing {activeResults.length} recent {activeResults.length === 1 ? "draw" : "draws"}
        </span>
        {loading && <span className="loading-pill">Refreshing…</span>}
        {error && !loading && (
          <span className="error-pill" role="alert">
            Failed to refresh results. Try again soon.
          </span>
        )}
      </div>

      <section className="results-grid">
        {activeResults.length ? (
          activeResults.map((result) => <ResultCard key={result.id} {...result} />)
        ) : (
          <div className="empty-state" role="status">
            <h3>No results found</h3>
            <p>Adjust your filters to view other draws.</p>
          </div>
        )}
      </section>

      <footer className="lottery-results__footer">
        <p>
          Looking for older draws? View the 90-day archive inside your account
          dashboard and download official PDF certificates for your tickets.
        </p>
      </footer>
    </div>
  );
}

export default LotteryResults;
