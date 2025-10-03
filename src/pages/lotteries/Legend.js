import React from "react";
import LotteryPage from "../../components/lottery/LotteryPage";

function Legend() {
  return (
    <LotteryPage
      name="Z-Legend"
      tagline="$5 Draw every 15 days"
      ticketPrice="$5.00"
      frequency="Draws every 15 days at 21:15 UTC"
      firstPrize="$600,000"
      nextDrawDate="2025-01-15T21:15:00Z"
      pastResults={[
        { date: "2024-12-15", numbers: [3, 12, 26, 34, 47, 55] },
        { date: "2024-11-30", numbers: [8, 19, 24, 33, 44, 50] },
        { date: "2024-11-15", numbers: [5, 22, 31, 38, 46, 54] }
      ]}
    />
  );
}

export default Legend;
