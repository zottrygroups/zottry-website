import React from "react";
import Card from "../components/ui/Card";
import DataTable from "../components/ui/DataTable";
import "../styles/account.css";

const zottryResults = [
  {
    id: "spark-20240522",
    drawName: "Zottry Spark",
    drawDate: "2024-05-22",
    winningNumbers: [3, 7, 11, 19]
  },
  {
    id: "blaze-20240519",
    drawName: "Zottry Blaze",
    drawDate: "2024-05-19",
    winningNumbers: [5, 16, 22, 31, 44]
  },
  {
    id: "legend-20240501",
    drawName: "Zottry Legend",
    drawDate: "2024-05-01",
    winningNumbers: [9, 14, 27, 33, 41, 48]
  }
];

const columns = [
  { key: "drawName", header: "Draw Name" },
  {
    key: "drawDate",
    header: "Draw Date",
    render: (row) => {
      const date = new Date(row.drawDate);
      if (Number.isNaN(date.getTime())) {
        return row.drawDate;
      }
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  },
  {
    key: "winningNumbers",
    header: "Winning Numbers",
    render: (row) => row.winningNumbers.join(" • ")
  }
];

function Results() {
  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>My Results</h1>
        <p>Review the latest winning numbers for Zottry Spark, Blaze, and Legend draws.</p>
      </header>

      <Card title="Latest Winning Numbers" description="Updated after each official Zottry draw." role="region" aria-live="polite">
        <DataTable
          columns={columns}
          rows={zottryResults}
          ariaLabel="Zottry lottery winning numbers"
          getRowKey={(row) => row.id}
        />
      </Card>
    </div>
  );
}

export default Results;
