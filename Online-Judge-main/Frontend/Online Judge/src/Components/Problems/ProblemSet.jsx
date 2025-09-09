import React, { useState, useEffect } from 'react';
import { fetchDatafromDatabase } from '../../api';
import List from '../List';

function ProblemSet() {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 15;

  useEffect(() => {
    fetchDatafromDatabase()
      .then((response) => {
        setProblems(response);
      })
      .catch((error) => {
        console.log("Error while fetching data", error);
      });
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(problems.length / problemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    let visiblePages = [];
    const totalPages = Math.ceil(problems.length / problemsPerPage);

    if (totalPages <= 7) {
      visiblePages = pageNumbers;
    } else {
      if (currentPage <= 3) {
        visiblePages = [...pageNumbers.slice(0, 3), '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        visiblePages = [1, '...', ...pageNumbers.slice(totalPages - 3, totalPages)];
      } else {
        visiblePages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    return visiblePages.map((page, index) => (
      <li
        key={index}
        onClick={() => {
          if (typeof page === 'number') {
            paginate(page);
          }
        }}
        className={`cursor-pointer px-3 py-1 rounded-full ${currentPage === page ? 'bg-gray-300 text-gray-800' : 'bg-gray-200 text-gray-600'
          }`}
      >
        {page}
      </li>
    ));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(problems.length / problemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 md:w-4/5 sm:w-full sm:px-2">
      <div className="flex justify-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold">Problems</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-3 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {currentProblems.map((problem) => (
              <List key={problem._id} ProblemName={problem.ProblemName} Difficulty={problem.Difficulty} id={problem._id} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex space-x-2">
          <li
            onClick={handlePreviousPage}
            className={`cursor-pointer px-3 py-1 rounded-full ${currentPage === 1 ? 'bg-gray-200 text-gray-600 pointer-events-none' : 'bg-gray-300 text-gray-800'}`}
          >
            Previous
          </li>
          {renderPageNumbers()}
          <li
            onClick={handleNextPage}
            className={`cursor-pointer px-3 py-1 rounded-full ${currentPage === Math.ceil(problems.length / problemsPerPage)
              ? 'bg-gray-200 text-gray-600 pointer-events-none'
              : 'bg-gray-300 text-gray-800'
              }`}
          >
            Next
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProblemSet;
