import React from "react";
import PropTypes from "prop-types";

function ActionButton({ label, onClick, href, variant = "primary" }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants = {
    primary: `${baseClasses} bg-brand-red text-white shadow-md shadow-brand-red/30 hover:-translate-y-0.5 hover:bg-brand-blue focus-visible:outline-brand-red`,
    secondary: `${baseClasses} border border-white/70 bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white`
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} className={variants[variant]}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={variants[variant]}>
      {label}
    </button>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"])
};

ActionButton.defaultProps = {
  onClick: undefined,
  href: undefined,
  variant: "primary"
};

function HeroSection({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  highlight
}) {
  return (
    <section className="relative overflow-hidden bg-brand-blue text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-full max-w-5xl bg-gradient-to-r from-brand-blue via-brand-blue/85 to-brand-red/80" />
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-red/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-10 md:flex-row md:items-center md:justify-between lg:py-24">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
            Global Jackpots
          </p>
          <h1 className="text-4xl font-heading font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl text-base text-white/90 sm:text-lg">
            {subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {primaryAction && <ActionButton {...primaryAction} />}
            {secondaryAction && <ActionButton {...secondaryAction} variant="secondary" />}
          </div>
        </div>
        {highlight && (
          <div className="w-full max-w-sm rounded-3xl bg-white/10 p-6 backdrop-blur-md">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
              Next Draws
            </h3>
            <ul className="mt-4 space-y-3">
              {highlight.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-sm text-white"
                >
                  <span className="font-medium text-white/90">{item.label}</span>
                  <span className="font-semibold text-white">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  primaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string
  }).isRequired,
  secondaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    href: PropTypes.string
  }),
  highlight: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  )
};

HeroSection.defaultProps = {
  secondaryAction: undefined,
  highlight: undefined
};

export default HeroSection;
