import {
  accountOffers,
  archivedResults,
  latestResults,
  lotteryCatalog,
  seasonalPromotions
} from "../data/lotteryData";

const delay = (ms = 400) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const clone = (value) => JSON.parse(JSON.stringify(value));

export async function fetchLotteries() {
  await delay();
  return clone(lotteryCatalog);
}

export async function fetchResults(scope = "latest") {
  await delay();
  if (scope === "archived") {
    return clone(archivedResults);
  }
  return clone(latestResults);
}

export async function fetchPromotions() {
  await delay();
  return clone(seasonalPromotions);
}

export async function fetchOffers() {
  await delay();
  return clone(accountOffers);
}

export function toPriceValue(value) {
  if (typeof value === "number") {
    return value;
  }

  const numeric = parseFloat(String(value).replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

export function toJackpotValue(value) {
  if (typeof value === "number") {
    return value;
  }
  const withoutSeparators = String(value).replace(/[$,]/g, "");
  const numeric = parseFloat(withoutSeparators);
  return Number.isNaN(numeric) ? 0 : numeric;
}

export function formatDateISO(isoDateString) {
  const date = new Date(isoDateString);
  if (Number.isNaN(date.getTime())) {
    return isoDateString;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
