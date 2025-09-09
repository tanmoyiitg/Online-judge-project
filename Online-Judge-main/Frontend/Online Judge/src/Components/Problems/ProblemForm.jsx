import { useRef } from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DifficultyAndEditorial from '../DifficultyAndEditorial'
import { uploadDataProblem } from '../../api';

import ReactMarkdownEditorLite from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css'; 
import { marked } from 'marked'; 


function ProblemForm() {
    const ProblemNameRef = useRef()
    const [problemStatement, setProblemStatement] = useState('')
    const ProblemStatementRef = useRef()
    const EditorialRef = useRef()
    const DifficultyRef = useRef()
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('')
    const [showTestcasePage, setShowTestcasePage] = useState(false)
    const [erroMsgInput, setErrorMsgInput] = useState('')
    const [erroMsgOutput, setErrorMsgOutput] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [OutputValue, setOutputValue] = useState('')
    const [TestCase, setTestCase] = useState([])
    const [EditButtonVisibility, setEditButtonVisibility] = useState('hidden')
    const [AddButtonVisibility, setAddButtonVisibility] = useState('')
    const [indexForEditingTestCaseContent, setIndexForEditingTestCaseContent] = useState(null)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const TestCaseData = []

    const handleSubmit = (e) => {

        e.preventDefault();
        const Data = {
            ProblemName: ProblemNameRef.current.value,
            ProblemStatement: ProblemStatementRef.current.getMdValue(),
            Editorial: EditorialRef.current.value,
            Difficulty: DifficultyRef.current.value,
            Testcase: TestCase
        }

        uploadDataProblem(Data).then(response => {
            if (response.success) {
                Popup("Updated Successfully")
                setTimeout(() => {
                    navigate(from, { replace: true })
                }, 2000)

            }

            else {
                Popup(response.message)
            }

        }).catch(error => {
            console.log("Error while receiving Problem data ", error)
            Popup(error)
        })



    }

    useEffect(() => {
        const externalElement = document.querySelector('#root');
        document.body.style.display = 'flex';
        document.body.style.alignItems = 'center';
        externalElement.style.margin = 'auto'
        externalElement.style.padding = 0.5
        externalElement.style.textAlign = 'center'
        return () => {
            document.body.style.display = '';
            document.body.style.alignItems = '';
            document.body.style.justifyContent = '';
            document.body.style.margin = '';
            externalElement.style.margin = ''
            externalElement.style.padding = ''
            externalElement.style.textAlign = ''

            window.scrollTo(0, 0); // Scroll to top
        }

    }, [])

    const Popup = (value) => {
        setPopupMessage(value);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false)
        }, 2000); 
    }


    const PopupMessage = ({ message, show }) => {
        return (
            <div className={`popup ${show ? 'show' : ''}`}>
                <p>{message}</p>
            </div>
        );
    };

    const handleTestCase = (e) => {
        e.preventDefault()
        setShowTestcasePage(!showTestcasePage)
        setErrorMsgInput('')
        setErrorMsgOutput('')
        setInputValue('')
        setOutputValue('')
        setEditButtonVisibility('hidden')
        setAddButtonVisibility(!AddButtonVisibility)
    }

    const handleAddTestcase = (e) => {
        e.preventDefault()
        if (inputValue == '') {
            setErrorMsgInput("This field is required")
        }

        if (OutputValue == '') {
            setErrorMsgOutput("This field is required")
        }

        if (inputValue != '' && OutputValue != '') {
            const data = {
                Input: inputValue,
                Expected_Output: OutputValue

            }

            TestCaseData.push(data)
            // Dont use push as push mutates the array and React relies on immutability to detect changes
            setTestCase(prevTestcase => prevTestcase.concat(data))
            setShowTestcasePage(!showTestcasePage)
            setInputValue('')
            setOutputValue('')




        }

    }

    const handleTestCaseContent = (testCase, index) => {
        setShowTestcasePage(!showTestcasePage)
        setInputValue(testCase.Input)
        setOutputValue(testCase.Expected_Output)
        setEditButtonVisibility(!EditButtonVisibility)
        setAddButtonVisibility('hidden')
        setIndexForEditingTestCaseContent(index)

    }

    const handleEditTestcase = () => {
        if (indexForEditingTestCaseContent !== null) {
            const updatedTestCases = TestCase.map((item, idx) => {
                if (idx === indexForEditingTestCaseContent) {
                    return {
                        ...item,
                        Input: inputValue,
                        Expected_Output: OutputValue,
                    };
                }
                return item;
            });
            setTestCase(updatedTestCases);
            setIndexForEditingTestCaseContent(null); // reset the edit index

        }
        setEditButtonVisibility(!EditButtonVisibility)
        setShowTestcasePage(!showTestcasePage)


    }

    return (

        <div className='h-auto w-[650px] border-slate-200 shadow-md bg-yellow-100 pt-5 pb-0 pl-0 pr-0 flex flex-col z-0'>

            <div className='mb-5'><p className='text-black font-semibold m-2 text-lg font-serif'>Add a Problem</p></div>

            <form action="" onSubmit={handleSubmit} className='flex flex-col justify-start'>

                <div className='flex mb-3 items-center'>
                    <label htmlFor="ProblemName" className="mr-2 ml-5 text-lg" style={{ fontFamily: 'Lato', fontWeight: 800, fontStyle: 'bold' }}
                    > Problem Name : </label>
                    <input type="text" ref={ProblemNameRef} name='ProblemName' id='ProblemName' placeholder='Enter Problem Name' className=' border-none outline-none focus:border-none focus:outline-none rounded-md relative left-[14rem] p-2 bg-slate-100 shadow-md text-sm' style={{ width: '250px', height: '28px' }}
                    />
                </div>

                <div className='flex mb-3 flex-col'>
                    <label htmlFor="ProblemStatement" className="mr-2  text-lg relative left-[-13.9rem]" style={{ fontFamily: 'Lato', fontWeight: 800, fontStyle: 'bold' }}> Problem Statement : </label>
                    <br />
                    <ReactMarkdownEditorLite
                        ref={ProblemStatementRef}
                        value={problemStatement}
                        style={{ height: '300px' }}
                        onChange={({ text }) => setProblemStatement(text)}
                        renderHTML={text => marked(text)} // Use marked to render Markdown
                    />

                </div>

                <DifficultyAndEditorial EditorialRef={EditorialRef} DifficultyRef={DifficultyRef} />

                <div className='flex origin-left ml-2'>
                    <button className='focus:border-none focus:outline-none bg-white' onClick={handleTestCase}>Add testcase</button>
                </div>

                <div className='mt-4 ml-2'>
                    {TestCase.map((testCase, index) => (

                        <div key={index} className='mb-2 float-start pt-2 pl-2 flex cursor-pointer'>
                            <span className='font-semibold bg-green-500 p-2 rounded-md' onClick={() => handleTestCaseContent(testCase, index)}>{`Test Case ${index + 1}`}</span>
                        </div>
                    ))}
                </div>

                {showTestcasePage && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                        <div className='h-[22rem] w-[35rem] bg-blue-100 rounded-md z-10 absolute shadow-2xl  p-2'>
                            <div className='float-end'><img src="/cross.png" alt="" className='h-5 w-5 cursor-pointer' onClick={() => setShowTestcasePage(!showTestcasePage)} /></div>
                            <div className='flex justify-around'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-col items-start'>
                                        <label htmlFor="Input" className='mb-2 font-semibold ml-3 mt-5'>Input</label>
                                        <textarea value={inputValue} name="Input" id="Input" className='rounded-2xl h-[14rem] w-[15rem] p-2 resize-none overflow-auto
                                    focus:outline-none focus:border-none'  onChange={(e) => setInputValue(e.target.value)} onFocus={() => setErrorMsgInput('')}></textarea>

                                    </div>
                                    <p className='text-red-700 relative right-[4rem] top-1.5' style={{ fontSize: '10px' }}>{erroMsgInput}</p>
                                </div>

                                <div className='flex flex-col '>
                                    <div className='flex flex-col items-start'>
                                        <label htmlFor="Output" className='mb-2 font-semibold ml-3 mt-5'>Expected output</label>
                                        <textarea value={OutputValue} name="Output" id="Output" className='rounded-2xl h-[14rem] w-[15rem] p-2 resize-none overflow-auto
                                    focus:outline-none focus:border-none' onChange={(e) => setOutputValue(e.target.value)} onFocus={() => setErrorMsgOutput('')}></textarea>


                                    </div>
                                    <p className='text-red-700 relative right-[4rem] top-1.5' style={{ fontSize: '10px' }}>{erroMsgOutput}</p>
                                </div>

                            </div>

                            <div className='m-2 mt-4 '>
                                <button className={` bg-green-400 outline-none border-none focus:outline-none focus:border-none hover:outline-none hover:border-none hover:bg-green-500 transition-all duration-200 ease-in-out ${AddButtonVisibility}`} onClick={handleAddTestcase}>Add</button>
                                <button className={` bg-green-400 outline-none border-none focus:outline-none focus:border-none hover:outline-none hover:border-none hover:bg-green-500 transition-all duration-200 ease-in-out  ${EditButtonVisibility}`} onClick={handleEditTestcase}>Edit</button>
                            </div>

                        </div>
                    </div>
                )}


                <div>
                    <button type='submit' className={`border-2 rounded-md text-black font-medium text-center mb-2 bg-blue-400 hover:bg-blue-500 transition-colors duration-300 ease-in-out outline-none`}>Create</button>
                </div>


            </form>


            {showPopup && <PopupMessage message={popupMessage} show={showPopup} />}

        </div>
    )
};

export default ProblemForm;

