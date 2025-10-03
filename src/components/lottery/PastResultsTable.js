import React from "react";

function PastResultsTable({ pastResults }) {
  return (
    <div className="lottery-card">
      <h2 className="lottery-card__title">Recent Winning Numbers</h2>
      <table className="lottery-results-table">
        <thead>
          <tr>
            <th scope="col">Draw Date</th>
            <th scope="col">Winning Numbers</th>
          </tr>
        </thead>
        <tbody>
          {pastResults.map((result) => (
            <tr key={result.date}>
              <td>{new Date(result.date).toLocaleDateString()}</td>
              <td>{result.numbers.join(" ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PastResultsTable;
