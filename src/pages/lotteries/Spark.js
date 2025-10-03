import React from "react";
import LotteryTemplate from "./LotteryTemplate";

function Spark() {
  return (
    <LotteryTemplate
      name="Z-Spark"
      ticketPrice="$1"
      firstPrize="$1,000"
      frequency="Daily"
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
