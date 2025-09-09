import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';
import useAuth from '../../../Hooks/useAuth';
import { AllSubmissionDetails } from '../../../api';
import CodeViewer from './CodeViewer';

// Table data to show Submission results
let data = []

let rowsPerPage = 15;
function AllSubmissions() {

  const [currentPage, setCurrentPage] = useState(1);
  const [DetailsFetchedSuccessfully, setDetailsFetchedSuccessfully] = useState(false);
  const [showCodePage, setShowCodePage] = useState(false);
  const [language, setLanguage] = useState('cpp');
  const [selectedCode, setSelectedCode] = useState('');

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const { user } = useAuth();
  const codeViewerRef = useRef();

  let state = useLocation();
  // id is Problem id
  const id = state.state.id.id;

  useEffect(() => {
    user && AllSubmissionDetails(id).then(response => {
      if (response.data.success) {
        setDetailsFetchedSuccessfully(true);
        const VerdictArray = response.data.Data;
        const Data = [];
        VerdictArray.forEach((item) => {
          const result = {
            User: item.userId.email,
            problem: item.ProblemName,
            result: item.result,
            code: item.code,
            language: item.Language
          };
          Data.push(result);
        });

        data = Data;
      }
    });
  }, [user]);

  const handleViewCode = (Code) => {
    setShowCodePage(!showCodePage);
    setSelectedCode(Code);
  };

  const handleClickOutside = (event) => {
    if (codeViewerRef.current && !codeViewerRef.current.contains(event.target)) {
      setShowCodePage(false);
    }
  };

  useEffect(() => {
    if (showCodePage) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCodePage]);

  return (
    <>
      {DetailsFetchedSuccessfully && (
        <div className='relative top-[50px] flex flex-col justify-center items-center px-2 md:px-0'>
          <div className='font-bold relative text-center mb-5 text-xl'>All Submissions</div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-300 text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="w-full bg-gray-100 text-gray-800">
                  <th className="px-1 md:px-4 py-2 border">User</th>
                  <th className="px-1 md:px-4 py-2 border">Problem</th>
                  <th className="px-1 md:px-4 py-2 border">Language</th>
                  <th className="px-1 md:px-4 py-2 border">Result</th>
                  <th className="px-1 md:px-4 py-2 border">Code</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index} className={`text-center`}>
                    <td className="px-1 md:px-6 py-2 border">{row.User}</td>
                    <td className="px-1 md:px-6 py-2 border">{row.problem}</td>
                    <td className="px-1 md:px-6 py-2 border">{row.language}</td>
                    <td className={`px-1 md:px-6 py-2 border ${row.result[0] === 'A' ? 'text-green-500' : 'text-red-500'}`}>
                      {row.result}
                    </td>
                    <td className="px-1 md:px-5 py-2 border w-[2rem] sm:w-[3rem] md:w-[5rem]">
                      <img
                        src="/code.png"
                        alt=""
                        className="h-[20px] sm:h-[30px] w-[20px] sm:w-[30px] cursor-pointer"
                        onClick={() => handleViewCode(row.code)}
                      />
                      {showCodePage && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-10 flex justify-center">
                          <div
                            ref={codeViewerRef}
                            className="h-[80%] w-[90%] md:h-[38rem] md:w-[45rem] bg-blue-100 rounded-md z-10 absolute p-2 top-[10%] md:top-[80px] text-left"
                          >
                            <div className="float-end">
                              <img
                                src="/cross.png"
                                alt=""
                                className="h-5 w-5 cursor-pointer"
                                onClick={() => setShowCodePage(!showCodePage)}
                              />
                            </div>
                            <CodeViewer code={selectedCode} language={row.language} />
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalRows={data.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}

export default AllSubmissions;
