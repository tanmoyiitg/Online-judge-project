import React from 'react'
import { Outlet } from 'react-router-dom'
import CodeEditor from './CodeEditor'

function ProblemPageLayout() {
  return (
    <div className='flex flex-row  mx-5 w-[1500px] overflow-x-hidden'>
        <Outlet/>
        <CodeEditor/>
    </div>
  )
}

export default ProblemPageLayout