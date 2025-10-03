import React, { useMemo, useState } from "react";
import "../styles/account.css";

const transactionData = [
  {
    orderId: "ZDEP-001245",
    type: "Deposit",
    date: "2024-05-24",
    amount: "+$50.00",
    status: "Settled",
    balance: "$188.50",
    description: "Deposit via Visa ending 4412"
  },
  {
    orderId: "ZSP-000981",
    type: "Ticket Purchase — Spark",
    date: "2024-05-22",
    amount: "-$1.00",
    status: "Settled",
    balance: "$187.50",
    description: "Spark daily draw ticket"
  },
  {
    orderId: "ZWIN-000652",
    type: "Win — Spark",
    date: "2024-05-22",
    amount: "+$12.00",
    status: "Settled",
    balance: "$199.50",
    description: "Spark prize credited to wallet"
  },
  {
    orderId: "ZBL-000742",
    type: "Ticket Purchase — Blaze",
    date: "2024-05-19",
    amount: "-$2.50",
    status: "Settled",
    balance: "$197.00",
    description: "Blaze five-day draw ticket"
  },
  {
    orderId: "ZWD-000318",
    type: "Withdrawal",
    date: "2024-05-18",
    amount: "-$25.00",
    status: "Pending",
    balance: "$172.00",
    description: "Withdrawal via Local Transfer"
  },
  {
    orderId: "ZLG-000514",
    type: "Ticket Purchase — Legend",
    date: "2024-05-01",
    amount: "-$5.00",
    status: "Settled",
    balance: "$220.50",
    description: "Legend monthly draw ticket"
  }
];

function Transactions() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const results = useMemo(() => {
    return transactionData.filter((transaction) => {
      if (dateFrom && transaction.date < dateFrom) {
        return false;
      }
      if (dateTo && transaction.date > dateTo) {
        return false;
      }
      return true;
    });
  }, [dateFrom, dateTo]);

  return (
    <div className="account-page">
      <header className="account-page__header">
        <h1>Transaction History</h1>
        <p>Review your deposits, ticket purchases, and payouts in one place.</p>
      </header>

      <form className="account-card" onSubmit={(event) => event.preventDefault()}>
        <div className="account-transaction-filters">
          <label htmlFor="date-from">
            From
            <input
              id="date-from"
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
            />
          </label>
          <label htmlFor="date-to">
            To
            <input
              id="date-to"
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
            />
          </label>
          <button type="submit" className="account-button">
            Search
          </button>
        </div>
        <div className="account-transaction-actions">
          <button type="button">View PDF</button>
          <button type="button">View CSV</button>
        </div>
      </form>

      <div className="account-card" role="region" aria-live="polite">
        <table className="account-results-table">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Updated Balance</th>
            </tr>
          </thead>
          <tbody>
            {results.map((transaction) => {
              const statusClassName =
                transaction.status === "Pending"
                  ? "account-status account-status--pending"
                  : transaction.status === "Failed"
                  ? "account-status account-status--failed"
                  : "account-status";

              return (
                <tr key={transaction.orderId}>
                  <td>
                    <strong>{transaction.orderId}</strong>
                    <p style={{ margin: "0.25rem 0 0", color: "rgba(71, 85, 105, 0.8)" }}>
                      {transaction.description}
                    </p>
                  </td>
                  <td>{transaction.type}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <span className={statusClassName}>{transaction.status}</span>
                  </td>
                  <td>{transaction.balance}</td>
                </tr>
              );
            })}
            {results.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "1.5rem" }}>
                  No transactions found for the selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
