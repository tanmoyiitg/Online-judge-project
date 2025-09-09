import React from 'react';

const Pagination = ({ totalRows, rowsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    let visiblePages = [];
    const maxVisiblePages = 7; // Maximum number of visible pages before showing ellipses

    if (totalPages <= maxVisiblePages) {
      visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        visiblePages = [...Array(3).fill().map((_, index) => index + 1), '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        visiblePages = [1, '...', ...Array(3).fill().map((_, index) => totalPages - 2 + index)];
      } else {
        visiblePages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return visiblePages.map((page, index) => (
      <button
        key={index}
        className={`px-2 py-1 border-none outline-none hover:border-none hover:outline-none ${currentPage === page ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
        onClick={() => handleClick(typeof page === 'number' ? page : currentPage)}
        disabled={typeof page !== 'number'}
      >
        {page === '...' ? '...' : page}
      </button>
    ));
  };

  return (
    <div className="flex justify-center space-x-2 mt-4 mb-4">
      <button
        className={`px-2 py-1 border-none outline-none hover:border-none hover:outline-none ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={`px-2 py-1 border-none outline-none hover:border-none hover:outline-none ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

