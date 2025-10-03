import React from "react";
import LotteryTemplate from "./LotteryTemplate";

function Pulse() {
  return (
    <LotteryTemplate
      name="Z-Pulse"
      ticketPrice="$2"
      firstPrize="$10,000"
      frequency="Every 48 Hours"
      nextDrawDate="2025-01-02T18:00:00Z"
      pastResults={[
        { date: "2024-12-28", numbers: [7, 12, 23, 29, 35] },
        { date: "2024-12-26", numbers: [3, 16, 22, 30, 41] },
        { date: "2024-12-24", numbers: [5, 11, 19, 27, 38] }
      ]}
    />
  );
}

export default Pulse;
