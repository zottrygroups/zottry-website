import React from "react";
import LotteryTemplate from "./LotteryTemplate";

function Legend() {
  return (
    <LotteryTemplate
      name="Z-Legend"
      ticketPrice="$5"
      firstPrize="$600,000"
      frequency="Every 15 Days"
      nextDrawDate="2025-01-10T20:00:00Z"
      pastResults={[
        { date: "2024-12-20", numbers: [9, 18, 27, 33, 41, 45, 49] },
        { date: "2024-12-05", numbers: [4, 12, 25, 30, 38, 42, 47] },
        { date: "2024-11-20", numbers: [7, 15, 21, 32, 40, 44, 48] }
      ]}
    />
  );
}

export default Legend;
