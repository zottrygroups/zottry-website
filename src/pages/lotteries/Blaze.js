import React from "react";
import LotteryTemplate from "./LotteryTemplate";

function Blaze() {
  return (
    <LotteryTemplate
      name="Z-Blaze"
      ticketPrice="$2.50"
      firstPrize="$100,000"
      frequency="Every 5 Days"
      nextDrawDate="2025-01-04T21:00:00Z"
      pastResults={[
        { date: "2024-12-25", numbers: [4, 9, 17, 33, 44, 47] },
        { date: "2024-12-20", numbers: [6, 11, 22, 29, 36, 40] },
        { date: "2024-12-15", numbers: [2, 14, 26, 31, 37, 48] }
      ]}
    />
  );
}

export default Blaze;
