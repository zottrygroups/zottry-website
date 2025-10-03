import React from "react";
import LotteryPage from "../../components/lottery/LotteryPage";

function Cosmo() {
  return (
    <LotteryPage
      name="Z-Cosmo"
      tagline="$3 Draw every Wednesday"
      ticketPrice="$3.00"
      frequency="Draws every Wednesday at 21:00 UTC"
      firstPrize="$250,000"
      nextDrawDate="2025-01-08T21:00:00Z"
      pastResults={[
        { date: "2024-12-25", numbers: [6, 18, 24, 33, 41, 52] },
        { date: "2024-12-18", numbers: [4, 11, 19, 37, 42, 48] },
        { date: "2024-12-11", numbers: [9, 16, 28, 35, 47, 51] }
      ]}
    />
  );
}

export default Cosmo;
