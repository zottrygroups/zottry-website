import React from "react";
import PropTypes from "prop-types";

function LotteryCard({
  title,
  frequency,
  price,
  prize,
  description,
  badge,
  ctaLabel,
  onAction
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-gray/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-brand-card">
      <div className="relative bg-brand-blue px-6 py-4 text-white sm:px-8">
        {badge && (
          <span className="absolute -top-3 right-4 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-red shadow-md">
            {badge}
          </span>
        )}
        <h3 className="text-lg font-semibold uppercase tracking-[0.35em] text-white/90">
          {title}
        </h3>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-6 py-6 sm:px-8 sm:py-8">
        {description && <p className="text-sm text-brand-dark/70">{description}</p>}
        <dl className="space-y-3 text-sm text-brand-dark/80">
          {frequency && (
            <div className="flex items-center justify-between rounded-2xl bg-brand-light px-4 py-3">
              <dt className="font-medium text-brand-blue">Frequency</dt>
              <dd className="font-semibold">{frequency}</dd>
            </div>
          )}
          {price && (
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
              <dt className="font-medium text-brand-blue">Ticket Price</dt>
              <dd className="font-semibold">{price}</dd>
            </div>
          )}
          {prize && (
            <div className="flex items-center justify-between rounded-2xl bg-brand-light px-4 py-3">
              <dt className="font-medium text-brand-blue">Grand Prize</dt>
              <dd className="text-lg font-bold text-brand-red">{prize}</dd>
            </div>
          )}
        </dl>
        <div className="mt-auto flex">
          <button
            type="button"
            onClick={onAction}
            className="w-full rounded-full bg-brand-red px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand-red/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </article>
  );
}

LotteryCard.propTypes = {
  title: PropTypes.string.isRequired,
  frequency: PropTypes.string,
  price: PropTypes.string,
  prize: PropTypes.string,
  description: PropTypes.string,
  badge: PropTypes.string,
  ctaLabel: PropTypes.string,
  onAction: PropTypes.func
};

LotteryCard.defaultProps = {
  frequency: undefined,
  price: undefined,
  prize: undefined,
  description: undefined,
  badge: undefined,
  ctaLabel: "Play Now",
  onAction: undefined
};

export default LotteryCard;
