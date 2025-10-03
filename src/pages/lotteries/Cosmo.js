import React from "react";
import LotteryTemplate from "./LotteryTemplate";

function Cosmo() {
  return (
    <LotteryTemplate
      name="Z-Cosmo"
      ticketPrice="$3"
      firstPrize="$250,000"
      frequency="Every Wednesday"
      nextDrawDate="2025-01-01T19:30:00Z"
      pastResults={[
        { date: "2024-12-25", numbers: [8, 13, 21, 34, 42, 47] },
        { date: "2024-12-18", numbers: [5, 16, 24, 31, 39, 46] },
        { date: "2024-12-11", numbers: [2, 14, 29, 33, 41, 48] }
      ]}
    />
  );
}

export default Cosmo;
