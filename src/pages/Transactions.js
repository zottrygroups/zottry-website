import React, { useMemo, useState } from "react";
import Card from "../components/ui/Card";
import DataTable from "../components/ui/DataTable";
import "../styles/account.css";

const transactionData = [
  {
    orderId: "ZDEP-001245",
    type: "Deposit",
    date: "2024-05-24",
    amount: 50,
    status: "Settled",
    balance: 188.5,
    description: "Deposit via Visa ending 4412"
  },
  {
    orderId: "ZSP-000981",
    type: "Ticket Purchase — Spark",
    date: "2024-05-22",
    amount: -1,
    status: "Settled",
    balance: 187.5,
    description: "Spark daily draw ticket"
  },
  {
    orderId: "ZWIN-000652",
    type: "Win — Spark",
    date: "2024-05-22",
    amount: 12,
    status: "Settled",
    balance: 199.5,
    description: "Spark prize credited to wallet"
  },
  {
    orderId: "ZBL-000742",
    type: "Ticket Purchase — Blaze",
    date: "2024-05-19",
    amount: -2.5,
    status: "Settled",
    balance: 197,
    description: "Blaze five-day draw ticket"
  },
  {
    orderId: "ZWD-000318",
    type: "Withdrawal",
    date: "2024-05-18",
    amount: -25,
    status: "Pending",
    balance: 172,
    description: "Withdrawal via Local Transfer"
  },
  {
    orderId: "ZLG-000514",
    type: "Ticket Purchase — Legend",
    date: "2024-05-01",
    amount: -5,
    status: "Settled",
    balance: 220.5,
    description: "Legend monthly draw ticket"
  }
];

const formatCurrency = (value) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(value);

const columns = [
  {
    key: "type",
    header: "Type",
    render: (row) => (
      <div>
        <strong>{row.type}</strong>
        <p className="transaction-note">{row.description}</p>
      </div>
    )
  },
  {
    key: "date",
    header: "Date",
    render: (row) => {
      const date = new Date(row.date);
      if (Number.isNaN(date.getTime())) {
        return row.date;
      }
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
  },
  {
    key: "amount",
    header: "Amount",
    align: "right",
    render: (row) => (
      <span
        className={`transaction-amount ${row.amount >= 0 ? "transaction-amount--credit" : "transaction-amount--debit"}`.trim()}
      >
        {row.amount >= 0 ? "+" : ""}
        {formatCurrency(Math.abs(row.amount))}
      </span>
    )
  },
  {
    key: "status",
    header: "Status",
    render: (row) => {
      const statusClassName =
        row.status === "Pending"
          ? "account-status account-status--pending"
          : row.status === "Failed"
          ? "account-status account-status--failed"
          : "account-status";
      return <span className={statusClassName}>{row.status}</span>;
    }
  },
  {
    key: "balance",
    header: "Balance",
    align: "right",
    render: (row) => formatCurrency(row.balance)
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
        <p>Review your deposits, withdrawals, wins, and ticket purchases.</p>
      </header>

      <Card title="Filter by date" spacing="compact" as="form" onSubmit={(event) => event.preventDefault()}>
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
            Apply
          </button>
        </div>
      </Card>

      <Card title="Wallet movements" description="Up to 50 of your latest transactions." role="region" aria-live="polite">
        <DataTable
          columns={columns}
          rows={results}
          enablePagination
          pageSize={5}
          getRowKey={(row) => row.orderId}
          ariaLabel="Transaction history"
          emptyMessage="No transactions found for the selected range."
        />
      </Card>
    </div>
  );
}

export default Transactions;
