import React from "react";

function Card({
  title,
  description,
  actions,
  headingLevel = 2,
  as: Component = "section",
  className = "",
  spacing = "default",
  children,
  ...rest
}) {
  const HeadingTag = `h${Math.min(Math.max(headingLevel, 1), 6)}`;
  const classes = [
    "account-card",
    spacing === "compact" ? "account-card--compact" : "",
    spacing === "flush" ? "account-card--flush" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...rest}>
      {(title || description || actions) && (
        <div className="account-card__header">
          <div>
            {title ? <HeadingTag className="account-card__title">{title}</HeadingTag> : null}
            {description ? (
              <p className="account-card__description">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="account-card__actions">{actions}</div> : null}
        </div>
      )}
      {children}
    </Component>
  );
}

export default Card;
