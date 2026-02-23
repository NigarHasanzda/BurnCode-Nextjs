"use client";

import React, { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  lang: string; // yeni prop
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, lang, onPageChange }) => {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, marginTop: 40, userSelect: "none" }}>
      {/* Sol ox */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...btnBaseStyle, opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? "default" : "pointer" }}
      >
        ‹
      </button>

      {/* Səhifə nömrələri */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => page !== currentPage && onPageChange(page)}
          style={{
            ...btnBaseStyle,
            backgroundColor: page === currentPage ? "#5D56F1" : "transparent",
            color: page === currentPage ? "white" : "#5D56F1",
            fontWeight: 500,
            cursor: page === currentPage ? "default" : "pointer",
          }}
        >
          {page}
        </button>
      ))}

      {/* Sağ ox */}
      <button
        onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        style={{ ...btnBaseStyle, opacity: currentPage === lastPage ? 0.4 : 1, cursor: currentPage === lastPage ? "default" : "pointer" }}
      >
        ›
      </button>
    </div>
  );
};

const btnBaseStyle: React.CSSProperties = {
  width: 39,
  height: 43,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #5D56F1",
  borderRadius: 5,
  fontSize: 18,
  transition: "all 0.2s ease",
  outline: "none",
  padding: 0,
};

export default Pagination;
