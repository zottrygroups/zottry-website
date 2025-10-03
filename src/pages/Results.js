import React, { useMemo, useState } from "react";
import "../styles/account.css";

const mockResults = [
  {
    orderId: "ZSP-000981",
    drawName: "Spark",
    drawDate: "2024-05-22",
    ticketCost: "$1.00",
    winAmount: "$12.00",
    winningNumbers: [3, 7, 11, 19],
    myNumbers: [3, 7, 13, 18]
  },
  {
    orderId: "ZBL-000742",
    drawName: "Blaze",
    drawDate: "2024-05-19",
    ticketCost: "$2.50",
    winAmount: "$0.00",
    winningNumbers: [5, 16, 22, 31, 44],
    myNumbers: [4, 18, 22, 29, 40]
  },
  {
    orderId: "ZLG-000514",
    drawName: "Legend",
    drawDate: "2024-05-01",
    ticketCost: "$5.00",
    winAmount: "$65.00",
    winningNumbers: [9, 14, 27, 33, 41, 48],
    myNumbers: [9, 22, 27, 33, 37, 44]
  }
];

const tabs = ["Last 20 Entries", "By Draw Date", "Search Order ID"];

function Results() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const filteredResults = useMemo(() => {
    if (activeTab === "Last 20 Entries") {
      return mockResults;
    }
    if (activeTab === "By Draw Date") {
      return [...mockResults].sort((a, b) => (a.drawDate < b.drawDate ? 1 : -1));
    }
    return mockResults;
  }, [activeTab]);

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>My Results</h1>
        <p>Track your latest entries, compare your lucky numbers, and replay winning combinations.</p>
      </header>

      <nav className="account-tabs" aria-label="Result filters">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`account-tabs__button ${tab === activeTab ? "account-tabs__button--active" : ""}`.trim()}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab !== "Last 20 Entries" && (
        <div className="account-card" style={{ marginBottom: "1.5rem" }}>
          {activeTab === "By Draw Date" ? (
            <p>Select a draw date to filter your results. (Filtering coming soon.)</p>
          ) : (
            <form className="account-section" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="order-search">
                Search order ID
                <input id="order-search" type="text" placeholder="e.g. ZSP-000981" />
              </label>
              <button type="submit" className="account-button account-button--secondary">
                Search
              </button>
            </form>
          )}
        </div>
      )}

      <div className="account-card" role="region" aria-live="polite">
        <table className="account-results-table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Draw</th>
              <th scope="col">Date</th>
              <th scope="col">Ticket cost</th>
              <th scope="col">Result</th>
              <th scope="col">Winning Numbers</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((entry) => {
              const winValue = Number(entry.winAmount.replace(/[^0-9.]/g, ""));
              return (
                <tr key={entry.orderId}>
                  <td>
                    <strong>{entry.orderId}</strong>
                  </td>
                  <td>{entry.drawName}</td>
                  <td>{entry.drawDate}</td>
                  <td>{entry.ticketCost}</td>
                  <td>
                    <span
                      className={`account-pill ${
                        winValue > 0 ? "account-pill--win" : "account-pill--loss"
                      }`.trim()}
                    >
                      {winValue > 0 ? entry.winAmount : "Lost"}
                    </span>
                  </td>
                  <td>
                    <div className="account-winning-numbers">
                      {entry.winningNumbers.map((num) => (
                        <span key={num} className="account-pill">
                          {num}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="account-inline-buttons">
                      <button type="button" className="account-button account-button--secondary">
                        My numbers
                      </button>
                      <button type="button" className="account-button account-button--warning">
                        Replay
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Results;
