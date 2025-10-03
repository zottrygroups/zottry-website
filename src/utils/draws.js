export const createDailyDrawCalculator = ({ hour = 20, minute = 0 } = {}) => (fromDate) => {
  const next = new Date(fromDate);
  next.setHours(hour, minute, 0, 0);
  if (next <= fromDate) {
    next.setDate(next.getDate() + 1);
  }
  return next;
};

export const createIntervalDrawCalculator = ({
  baseDate,
  intervalDays,
  hour = 20,
  minute = 0
}) => {
  const anchor = new Date(baseDate);
  anchor.setHours(hour, minute, 0, 0);

  return (fromDate) => {
    const next = new Date(anchor);
    while (next <= fromDate) {
      next.setDate(next.getDate() + intervalDays);
    }
    return next;
  };
};

export const createSemiMonthlyDrawCalculator = ({
  days = [1, 15],
  hour = 21,
  minute = 0
}) => (fromDate) => {
  const reference = new Date(fromDate);
  const candidates = [];

  days.forEach((day) => {
    const candidate = new Date(reference.getFullYear(), reference.getMonth(), day, hour, minute, 0, 0);
    candidates.push(candidate);
  });

  days.forEach((day) => {
    const candidate = new Date(
      reference.getFullYear(),
      reference.getMonth() + 1,
      day,
      hour,
      minute,
      0,
      0
    );
    candidates.push(candidate);
  });

  const upcoming = candidates
    .filter((date) => date > reference)
    .sort((a, b) => a.getTime() - b.getTime());

  return upcoming[0] || new Date(reference);
};
