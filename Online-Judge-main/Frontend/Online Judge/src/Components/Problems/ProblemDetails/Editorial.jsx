import React from 'react'
import { useLocation } from 'react-router-dom';

import Header from './Header';
import CodeEditor from './CodeEditor';
import useAuth from '../../../Hooks/useAuth';


function Editorial() {

  let state = useLocation()
  if (state.state.Editorial === null) {
    return <div>Loading Editorial...</div>;
  }
  const { user } = useAuth()
  const Editorial = state.state.Editorial.Editorial
  const id = state.state.id.id
  const problemName = state.state.ProblemName.ProblemName
  const testcases = state.state.testcases.testcases



  return (
    <div className='flex flex-col md:flex-row  mx-5 overflow-x-hidden'>
      <div className="w-full md:max-w-[42rem] md:min-w-[33rem]  px-4 py-8 bg-white mr-2 md:max-h-[675px] overflow-auto">
        <Header id={id} Editorial={Editorial} ProblemName={problemName} user={user} testcases={testcases} />
        <h1 className="text-2xl font-bold mb-4">{problemName}</h1>
        <pre className=" mb-4 whitespace-pre-wrap">{Editorial}</pre>
      </div>

      {/* Code Editor + TestCases Div */}
      <div className='flex-grow'>
        <CodeEditor testcases={testcases} id={id} />
      </div>

    </div>
  )
}

export default Editorial