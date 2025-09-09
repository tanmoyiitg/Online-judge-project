import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsgEmail, setErrorMsgEmail] = useState('')
  const [errorMsgName, setErrorMsgName] = useState('')
  const [errorMsgFeedback, setErrorMsgFeedback] = useState('')
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const URL=process.env.VITE_BACKEND_URL
      await axios.post(`${URL}/api/feedback/save`, { name, email, message });
      Popup('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
        console.log("error = ",error)
        const data = error.response.data
        if(data.from ==="email"){
            setErrorMsgEmail(data.message)
        }
        if(data.from ==="name"){
            setErrorMsgName(data.message)
        }
        if(data.from ==="message"){
            setErrorMsgFeedback(data.message)
        }
      Popup('Error submitting feedback. Please try again.');
    }
  };

  const Popup = (value) => {
    setPopupMessage(value);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
}

const PopupMessage = ({ message, show }) => {
    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <p>{message}</p>
        </div>
    );
};

const isButtonDisabled = errorMsgEmail || errorMsgName || errorMsgFeedback

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="relative top-[100px] max-w-lg mx-auto p-6  bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            onFocus={() => setErrorMsgName('')}
          />
          <p className=' text-red-700 relative ' style={{ fontSize: '10px' }}>{errorMsgName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            onFocus={() => setErrorMsgEmail('')}
          />
          <p className=' text-red-700 relative ' style={{ fontSize: '10px' }}>{errorMsgEmail}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            onFocus={() => setErrorMsgFeedback('')}
          />
          <p className=' text-red-700 relative ' style={{ fontSize: '10px' }}>{errorMsgFeedback}</p>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isButtonDisabled}
        >
          Submit
        </button>
      </form>
      {showPopup && <PopupMessage message={popupMessage} show={showPopup} />}
    </div>
    // </div>
  );
};

export default FeedbackForm;
