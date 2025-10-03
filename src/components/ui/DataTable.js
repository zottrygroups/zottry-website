import React, { useEffect, useMemo, useState } from "react";

function DataTable({
  columns,
  rows,
  emptyMessage = "No records found.",
  enablePagination = false,
  pageSize = 10,
  initialPage = 1,
  getRowKey,
  ariaLabel
}) {
  const [page, setPage] = useState(initialPage);

  const totalPages = useMemo(() => {
    if (!enablePagination) {
      return 1;
    }
    return Math.max(1, Math.ceil(rows.length / pageSize));
  }, [enablePagination, rows.length, pageSize]);

  useEffect(() => {
    if (!enablePagination) {
      return;
    }
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages, enablePagination]);

  const pageRows = useMemo(() => {
    if (!enablePagination) {
      return rows;
    }
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, enablePagination, page, pageSize]);

  const handlePrevious = () => {
    setPage((previous) => Math.max(1, previous - 1));
  };

  const handleNext = () => {
    setPage((previous) => Math.min(totalPages, previous + 1));
  };

  return (
    <div className="data-table__container">
      <table className="data-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" style={{ textAlign: column.align || "left" }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="data-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            pageRows.map((row, index) => {
              const key = getRowKey ? getRowKey(row) : row.id || index;
              return (
                <tr key={key}>
                  {columns.map((column) => (
                    <td key={column.key} style={{ textAlign: column.align || "left" }}>
                      {column.render ? column.render(row, column) : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {enablePagination && totalPages > 1 ? (
        <div className="data-table__pagination" role="navigation" aria-label="Table pagination">
          <button type="button" onClick={handlePrevious} disabled={page <= 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button type="button" onClick={handleNext} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default DataTable;
