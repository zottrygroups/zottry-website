import React from "react";
import LotteryPage from "../../components/lottery/LotteryPage";

function Spark() {
  return (
    <LotteryPage
      name="Z-Spark"
      tagline="$1 Daily Draw"
      ticketPrice="$1.00"
      frequency="Draws every day at 20:00 UTC"
      firstPrize="$1,000"
      nextDrawDate="2025-01-01T20:00:00Z"
      pastResults={[
        { date: "2024-12-27", numbers: [3, 11, 18, 24] },
        { date: "2024-12-26", numbers: [5, 8, 19, 32] },
        { date: "2024-12-25", numbers: [2, 14, 21, 27] }
      ]}
    />
  );
}

export default Spark;
