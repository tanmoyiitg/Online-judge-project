import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPageFeedbacks, setCurrentPageFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [pageSize] = useState(15);

  useEffect(() => {
    const fetchFeedbacks = async () => {
        try {
            const URL = process.env.VITE_BACKEND_URL;
            const response = await axios.get(`${URL}/api/feedback/fetch`);
            console.log("response = ",response)
            setFeedbacks(response.data.feedbacks);
            setTotal(response.data.total);
            setLoading(false);
          } catch (err) {
            setError('Failed to fetch feedback');
            setLoading(false);
          }
    };

    fetchFeedbacks();
  }, []);

  useEffect(() => {
    // Calculate the feedbacks to display on the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    setCurrentPageFeedbacks(feedbacks.slice(startIndex, endIndex));
  }, [feedbacks, page, pageSize]);


  const handleResolve = async (id) => {
    try {
      const URL = process.env.VITE_BACKEND_URL;  
      await axios.patch(`${URL}/api/feedback/resolved/${id}`);
      setFeedbacks(feedbacks.map(fb => fb._id === id ? { ...fb, resolved: true } : fb));
    } catch (err) {
      setError('Failed to update feedback');
    }
  };

  const handleDelete = async (id) => {
    try {
      const URL = process.env.VITE_BACKEND_URL;   
      await axios.delete(`${URL}/api/feedback/delete/${id}`);
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    } catch (err) {
      setError('Failed to delete feedback');
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <>
    {selectedFeedback && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setSelectedFeedback(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Feedback Details</h2>
            <p><strong>Feedback:</strong> {selectedFeedback.feedback}</p>
          </div>
        </div>
      )}
    {!feedbacks ? (<div className="min-h-[93vh] bg-gray-100 flex flex-col flex-grow items-center overflow-hidden px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Feedbacks</h1>
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h2 className="text-lg sm:text-xl font-bold mb-4">No feedback available</h2>
            </div>
        </div>) : (<div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Feedback Management</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Feedback</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageFeedbacks.map((feedback) => (
                    <tr key={feedback._id} className="border-b border-gray-200">
                      <td className="px-4 py-2">{feedback.name}</td>
                      <td className="px-4 py-2">{feedback.email}</td>
                      <td className="px-4 py-2"><button
                      onClick={() => setSelectedFeedback(feedback)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      View Feedback
                    </button></td>
                      <td className="px-4 py-2">{new Date(feedback.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        {!feedback.resolved ? (
                          <>
                            <button
                              onClick={() => handleResolve(feedback._id)}
                              className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                            >
                              Mark as Resolved
                            </button>
                            </>
                            ) : (<p
                                className="bg-green-500 text-white px-4 py-1 rounded mr-2 inline-block"
                              >Resolved</p>)}
                            <button
                              onClick={() => handleDelete(feedback._id)}
                              className="bg-red-500 text-white px-4 py-1 rounded"
                            >
                              Delete
                            </button>
                          
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>)}
    </>
  );
};

export default AdminFeedback;
