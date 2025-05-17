export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="pagination-container"
      style={{ display: "flex", alignItems: "center", gap: "1rem" }}
    >
      <label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ marginLeft: "0.5rem" }}
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} per pagina
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Vorige
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          disabled={number === currentPage}
          style={{
            fontWeight: number === currentPage ? "bold" : "normal",
            textDecoration: number === currentPage ? "underline" : "none",
          }}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Volgende
      </button>
    </div>
  );
}
