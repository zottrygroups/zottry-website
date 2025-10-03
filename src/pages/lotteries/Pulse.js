import React from "react";
import LotteryPage from "../../components/lottery/LotteryPage";

function Pulse() {
  return (
    <LotteryPage
      name="Z-Pulse"
      tagline="$2 Draw every 48 hours"
      ticketPrice="$2.00"
      frequency="Draws every 48 hours at 18:00 UTC"
      firstPrize="$10,000"
      nextDrawDate="2025-01-02T18:00:00Z"
      pastResults={[
        { date: "2024-12-28", numbers: [7, 13, 29, 34, 42] },
        { date: "2024-12-26", numbers: [4, 16, 23, 38, 41] },
        { date: "2024-12-24", numbers: [2, 9, 26, 35, 44] }
      ]}
    />
  );
}

export default Pulse;
