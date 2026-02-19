"use client";

import React, { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, lastPage, onPageChange }) => {
  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  // Səhifə dəyişəndə yuxarıya qaytar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="flex justify-center items-center gap-2 mt-5 select-none">
      {/* Əvvəlki səhifə */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={btnClass(currentPage === 1)}
        aria-label="Əvvəlki səhifə"
      >
        ‹
      </button>

      {/* Səhifə nömrələri */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => page !== currentPage && onPageChange(page)}
          className={btnClass(page === currentPage, true)}
          disabled={page === currentPage}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Sonrakı səhifə */}
      <button
        onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className={btnClass(currentPage === lastPage)}
        aria-label="Sonrakı səhifə"
      >
        ›
      </button>
    </div>
  );
};

// Tailwind class-ları ilə stil funksiyası
const btnClass = (disabled: boolean, isPageNumber: boolean = false) =>
  `border border-[#5D56F1] rounded px-3 py-1 text-sm font-medium transition-all ${
    isPageNumber
      ? disabled
        ? "bg-[#5D56F1] text-white cursor-default font-bold"
        : "bg-transparent text-[#5D56F1] hover:bg-[#5D56F1]/20"
      : disabled
      ? "bg-transparent text-[#5D56F1] cursor-not-allowed"
      : "bg-transparent text-[#5D56F1] hover:bg-[#5D56F1]/20"
  }`;

export default Pagination;
