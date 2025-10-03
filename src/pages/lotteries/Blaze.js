import React from "react";
import LotteryPage from "../../components/lottery/LotteryPage";

function Blaze() {
  return (
    <LotteryPage
      name="Z-Blaze"
      tagline="$2.5 Draw every 5 days"
      ticketPrice="$2.50"
      frequency="Draws every 5 days at 19:30 UTC"
      firstPrize="$100,000"
      nextDrawDate="2025-01-04T19:30:00Z"
      pastResults={[
        { date: "2024-12-20", numbers: [5, 12, 27, 33, 41] },
        { date: "2024-12-15", numbers: [8, 19, 24, 31, 45] },
        { date: "2024-12-10", numbers: [3, 17, 26, 38, 42] }
      ]}
    />
  );
}

export default Blaze;
