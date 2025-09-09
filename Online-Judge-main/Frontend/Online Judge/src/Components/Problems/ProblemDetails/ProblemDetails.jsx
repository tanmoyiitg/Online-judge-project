import React, { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { fetchDatafromDatabaseUisngID, saveCodeToDatabase, RetrieveCodeFromDatabase } from '../../../api'
import { updateProblemInDatabase, deleteDatafromDatabase, CompileCode, CompileCodeWithHiddenTestCases } from '../../../api';
import './style.css'
import { diffWords } from 'diff';
import Header from './Header';
import useAuth from '../../../Hooks/useAuth';
import CodeEditor from './CodeEditor';

import { marked } from 'marked'; // Import marked


function ProblemDetails() {

  const { id } = useParams();
  const [problemDetails, setProblemDetails] = useState(null);
  const [Editorial, setEditorial] = useState(null);
  const [Difficulty, setDifficulty] = useState(null);
  const [problemName, setProblemName] = useState(null);
  const [Edit, setShowEdit] = useState(false)
  const [updatedProblemDetails, setUpdatedProblemDetails] = useState({ problemDetails })
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('')
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false)
  const [Delete, setDelete] = useState('/delete.png')
  const [testcases, setTestcases] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const divRef = useRef()
  const EditPageRef = useRef()
  const { user } = useAuth()


  const navigate = useNavigate()

  const handleClickOutside = (event) => {
    if (EditPageRef.current && !EditPageRef.current.contains(event.target)) {
      setShowEdit(false);
    }
  };

  useEffect(() => {
    if (Edit) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [Edit]);


  useEffect(() => {
    setIsUpdateSuccessful(false)
  }, []);


  useEffect(() => {
    if (user) {
      const array = user.roles
      const roles = array.includes(1984)
      if (roles) {
        setIsAdmin(true)
      }
    }
  }, [user])



  useEffect(() => {
    // Fetch ProblemStatement based on id
    fetchDatafromDatabaseUisngID(id).then((response) => {
      setProblemDetails(response.data.message.ProblemStatement);
      setProblemName(response.data.message.ProblemName)
      setDifficulty(response.data.message.Difficulty)
      setEditorial(response.data.message.Editorial)
      setUpdatedProblemDetails(response.data.message.ProblemStatement)
      setTestcases(response.data.message.Testcase)


    });



  }, [id]);




  if (!problemDetails) {
    return <div>Loading...</div>;
  }

  let colorClass = '';
  if (Difficulty === 'Hard') {
    colorClass = 'text-red-500'; // Red color for Hard difficulty
  } else if (Difficulty === 'Medium') {
    colorClass = 'text-yellow-500'; // Yellow color for Medium difficulty
  } else {
    colorClass = 'text-green-500'; // Green color for Easy difficulty
  }


  const Popup = (value) => {
    setPopupMessage(value);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide after 2 seconds
  }



  const handleEdit = () => {
    setShowEdit(!Edit)
  }

  const handleUpdate = (e) => {
    setShowEdit(!Edit)
    if (updatedProblemDetails !== problemDetails) {
      const response = updateProblemInDatabase(id, { updatedProblemDetails: updatedProblemDetails })
      response.then(data => {
        if (data.data.success) {
          Popup("Updated Successfully")
          setIsUpdateSuccessful(true)

        }
        else {
          Popup("An error occurred")
        }

      }).catch(error => {
        console.log("error", error)
      })

    }
  }


  const PopupMessage = ({ message, show }) => {
    return (
      <div className={`popup ${show ? 'show' : ''}`}>
        <p>{message}</p>
      </div>
    );
  };

  const handleDelete = () => {
    const response = deleteDatafromDatabase(id)
    response.then(data => {
      if (data.data.success) {
        navigate("/problemSet")
      }
    })
  }



  return (
    <div ref={divRef} className='flex flex-col md:flex-row  mx-5   overflow-x-hidden '>
      <div className="w-full  md:max-w-[42rem] md:min-w-[33rem] px-4 py-8 bg-white mr-2 max-h-[500px] md:max-h-[675px] overflow-auto">

        {isUpdateSuccessful && (
          <div className='w-[90%] bg-yellow-100 rounded-md mb-3 p-2 font-mono opacity-90'>
            Problem has been updated, refresh the page to view the changes
          </div>
        )


        }

        <Header id={id} Editorial={Editorial} ProblemName={problemName} user={user} testcases={testcases} />

        <div>
          <ul className={`flex justify-between p-2`}>
            <li className={`font-semibold cursor-pointer ${isAdmin ? 'block' : 'hidden'}`} onClick={handleEdit}>Edit</li>
            <li className={`cursor-pointer ${isAdmin ? 'block' : 'hidden'}`} onClick={handleDelete}><img src={Delete} alt="" className='h-6 w-6' /></li>
          </ul>

          {Edit && (
            <div ref={EditPageRef} className='h-[22rem] w-[30rem] bg-slate-50 border-2 rounded-md z-10 absolute shadow-2xl pb-5 '>
              <textarea value={updatedProblemDetails} onChange={(e) => setUpdatedProblemDetails(e.target.value)} name="" id="" className='h-[17.5rem] w-[29.8rem] bg-slate-50  p-2 focus:outline-none resize-none overflow-auto'></textarea>
              <button className='hover:outline-none focus:outline-none bg-blue-500 rounded-md mt-2 float-end mr-2' onClick={handleUpdate}>Done</button>

            </div>
          )}

        </div>

        <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
        <p className={`inline-block text-sm font-semibold text-gray-600 mb-2 border-2 px-[4px] py-[2px] text-center bg-slate-300 rounded-md ${colorClass}`}>{Difficulty}</p>
        {/* <div className=" mb-4 whitespace-pre-wrap">{problemDetails}</div> */}
        <div
          className="mb-4 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: marked(problemDetails) }} // Render Markdown as HTML
        />

      </div>

      {/* Code Editor + TestCases Div */}
      <div className='flex-grow'>
        <CodeEditor testcases={testcases} id={id} />
      </div>
      {showPopup && <PopupMessage message={popupMessage} show={showPopup} />

      }

    </div>
  )
}

export default ProblemDetails