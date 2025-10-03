export const LOTTERY_ROUTE_MAP = {
  "z-spark": "/spark",
  "z-pulse": "/pulse",
  "z-blaze": "/blaze",
  "z-cosmo": "/cosmo",
  "z-legend": "/legend"
};

export function getLotteryRoute(id) {
  return LOTTERY_ROUTE_MAP[id] || "/lotteries";
}

export function getLotteryCtaLabel(title) {
  return title ? `Play ${title}` : "Play Now";
}
