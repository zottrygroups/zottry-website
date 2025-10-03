import React, { useEffect, useMemo, useState } from "react";

function getRemainingParts(targetDate, referenceDate = new Date()) {
  const totalMs = targetDate.getTime() - referenceDate.getTime();
  if (totalMs <= 0) {
    return { finished: true, parts: ["00", "00", "00", "00"] };
  }

  const totalSeconds = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    finished: false,
    parts: [
      String(days).padStart(2, "0"),
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0")
    ]
  };
}

function Countdown({ nextDrawDate }) {
  const target = useMemo(() => new Date(nextDrawDate), [nextDrawDate]);
  const [{ finished, parts }, setState] = useState(() => getRemainingParts(target));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(getRemainingParts(target));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [target]);

  return (
    <div className="lottery-countdown-card" role="timer" aria-live="polite">
      <span className="lottery-countdown-card__label">Next draw begins in</span>
      <div className="lottery-countdown-card__values">
        {parts.map((value, index) => (
          <div key={index} className="lottery-countdown-card__segment">
            <span className="lottery-countdown-card__value">{value}</span>
            <span className="lottery-countdown-card__caption">{["Days", "Hours", "Minutes", "Seconds"][index]}</span>
          </div>
        ))}
      </div>
      {finished ? (
        <p className="lottery-countdown-card__status">Draw is happening now. Good luck!</p>
      ) : null}
    </div>
  );
}

export default Countdown;
