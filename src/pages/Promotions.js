import React, { useMemo, useState } from "react";
import OfferCard from "../components/OfferCard";
import { useLotteryData } from "../context/LotteryDataContext";
import "./Promotions.css";

function Promotions() {
  const {
    promotions,
    savedPromotions,
    togglePromotionSave,
    loading,
    error
  } = useLotteryData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryOptions = useMemo(() => {
    const categories = new Set(promotions.map((promotion) => promotion.category).filter(Boolean));
    return [
      { value: "all", label: "All focuses" },
      ...Array.from(categories)
        .sort()
        .map((category) => ({ value: category, label: category.replace(/-/g, " ") }))
    ];
  }, [promotions]);

  const filteredPromotions = useMemo(() => {
    let next = promotions;

    if (statusFilter !== "all") {
      next = next.filter((promotion) => promotion.status === statusFilter);
    }

    if (categoryFilter !== "all") {
      next = next.filter((promotion) => promotion.category === categoryFilter);
    }

    if (showSavedOnly) {
      next = next.filter((promotion) => savedPromotions.includes(promotion.id));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      next = next.filter((promotion) =>
        [promotion.title, promotion.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(term))
      );
    }

    return next;
  }, [
    promotions,
    statusFilter,
    categoryFilter,
    showSavedOnly,
    savedPromotions,
    searchTerm
  ]);

  return (
    <div className="page promotions">
      <header className="promotions__intro">
        <h1>Promotions</h1>
        <p>
          Limited-time jackpots, referral rewards, and app exclusives. Keep an
          eye on this page so you never miss a bonus opportunity.
        </p>
      </header>

      <section className="promotion-controls" aria-label="Filter promotions">
        <div className="control-block search-block">
          <label htmlFor="promotion-search">Search promotions</label>
          <input
            id="promotion-search"
            type="search"
            placeholder="Search by name or reward"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="control-block">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="Live">Live</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="control-block">
          <label htmlFor="category-filter">Focus</label>
          <select
            id="category-filter"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <label className="toggle-row" htmlFor="saved-filter">
          <input
            id="saved-filter"
            type="checkbox"
            checked={showSavedOnly}
            onChange={(event) => setShowSavedOnly(event.target.checked)}
          />
          <span>Show saved only</span>
        </label>
      </section>

      <div className="promotion-meta">
        <span>
          {filteredPromotions.length} {filteredPromotions.length === 1 ? "promotion" : "promotions"} found
        </span>
        {loading && <span className="loading-pill">Updating…</span>}
        {error && !loading && (
          <span className="error-pill" role="alert">
            Something went wrong loading promotions.
          </span>
        )}
      </div>

      <section className="offer-grid">
        {filteredPromotions.length ? (
          filteredPromotions.map((promotion) => (
            <OfferCard
              key={promotion.id}
              {...promotion}
              isSaved={savedPromotions.includes(promotion.id)}
              onToggleSave={() => togglePromotionSave(promotion.id)}
              ctaVariant={promotion.ctaVariant}
            />
          ))
        ) : (
          <div className="empty-state" role="status">
            <h3>No promotions match those filters</h3>
            <p>Try adjusting status, focus, or search keywords.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Promotions;
