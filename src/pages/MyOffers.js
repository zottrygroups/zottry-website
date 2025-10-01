import React, { useMemo, useState } from "react";
import OfferCard from "../components/OfferCard";
import { useLotteryData } from "../context/LotteryDataContext";
import "./MyOffers.css";

function MyOffers() {
  const { offers, updateOfferStatus, loading, error } = useLotteryData();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [processingOffer, setProcessingOffer] = useState(null);
  const [feedback, setFeedback] = useState("");

  const filteredOffers = useMemo(() => {
    let next = offers;

    if (statusFilter !== "all") {
      next = next.filter((offer) => offer.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      next = next.filter((offer) =>
        [offer.title, offer.description]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(term))
      );
    }

    return next;
  }, [offers, statusFilter, searchTerm]);

  const handleAction = async (offer) => {
    setFeedback("");
    setProcessingOffer(offer.id);
    await new Promise((resolve) => setTimeout(resolve, 450));

    const nextStatus =
      offer.status === "Used"
        ? "Active"
        : offer.status === "Active"
        ? "Used"
        : offer.status === "Expiring soon"
        ? "Used"
        : "Used";

    updateOfferStatus(offer.id, nextStatus);
    setProcessingOffer(null);
    setFeedback(
      nextStatus === "Used"
        ? `${offer.title} marked as used.`
        : `${offer.title} reactivated.`
    );
  };

  const getButtonLabel = (offer) => {
    if (processingOffer === offer.id) {
      return "Updating...";
    }

    if (offer.status === "Used") {
      return "Re-activate";
    }

    return offer.ctaLabel || "View details";
  };

  return (
    <div className="page my-offers">
      <header className="my-offers__intro">
        <h1>My Offers</h1>
        <p>
          Hand-picked promotions for your account. Activate bundles, claim
          cashback, and track rewards before they expire.
        </p>
      </header>

      <section className="offer-controls" aria-label="Filter offers">
        <div className="control-block search-block">
          <label htmlFor="offer-search">Search offers</label>
          <input
            id="offer-search"
            type="search"
            placeholder="Search by draw or perk"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="control-block">
          <label htmlFor="offer-status-filter">Status</label>
          <select
            id="offer-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="all">All offers</option>
            <option value="Active">Active</option>
            <option value="Expiring soon">Expiring soon</option>
            <option value="Used">Used</option>
            <option value="New">New</option>
          </select>
        </div>
        <div className="offer-meta">
          <span>
            {filteredOffers.length} {filteredOffers.length === 1 ? "offer" : "offers"}
            {" "}
            available
          </span>
          {loading && <span className="loading-pill">Syncing…</span>}
          {error && !loading && (
            <span className="error-pill" role="alert">
              Unable to refresh offers right now.
            </span>
          )}
        </div>
      </section>

      {feedback && (
        <div className="offer-feedback" role="status" aria-live="polite">
          {feedback}
        </div>
      )}

      {filteredOffers.length ? (
        <section className="offer-grid">
          {filteredOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              {...offer}
              ctaLabel={getButtonLabel(offer)}
              ctaVariant={offer.ctaVariant}
              onAction={() => handleAction(offer)}
            />
          ))}
        </section>
      ) : (
        <div className="empty-offers">
          <h2>No offers just yet</h2>
          <p>
            Play any draw this week and we&apos;ll drop fresh personalised deals into
            this space.
          </p>
        </div>
      )}
    </div>
  );
}

export default MyOffers;
