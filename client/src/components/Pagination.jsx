export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Vorige
      </button>
      <span>Pagina {currentPage} van {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Volgende
      </button>
    </nav>
  );
}
