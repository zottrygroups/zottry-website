import React from "react";
import "./OfferCard.css";

function normalizeStatus(status) {
  if (!status) {
    return "";
  }

  return status.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function OfferCard({
  title,
  description,
  expires,
  status,
  tag,
  ctaLabel = "View details",
  ctaVariant = "outline",
  isSaved = false,
  onToggleSave,
  onAction
}) {
  const statusClassName = status
    ? `offer-status offer-status--${normalizeStatus(status)}`
    : "offer-status";
  const buttonClassName =
    ctaVariant === "primary" ? "btn" : "btn btn-outline btn-dark";

  return (
    <article className="offer-card">
      {tag && <span className="offer-tag">{tag}</span>}
      {onToggleSave && (
        <button
          type="button"
          className={`save-toggle ${isSaved ? "save-toggle--active" : ""}`.trim()}
          onClick={onToggleSave}
          aria-pressed={isSaved}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      )}
      <h3>{title}</h3>
      <p className="offer-description">{description}</p>
      <div className="offer-meta">
        {expires && <span className="offer-expiry">Expires {expires}</span>}
        {status && <span className={statusClassName}>{status}</span>}
      </div>
      <button
        type="button"
        className={buttonClassName}
        onClick={onAction}
      >
        {ctaLabel}
      </button>
    </article>
  );
}

export default OfferCard;
