import React, { useState } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { marked } from 'marked';
function DifficultyAndEditorial({ EditorialRef, DifficultyRef }) {
  const [editorial, setEditorial] = useState('')
  return (
    <>
      <div className='flex mb-3 items-center'>
        <label htmlFor="Difficulty" className="mr-2 ml-5 text-lg" style={{ fontFamily: 'Lato', fontWeight: 800, fontStyle: 'bold' }}>Difficulty : </label>
        <input type="text" ref={DifficultyRef} name='Difficulty' id='Difficulty' placeholder='Enter Difficulty' className=' border-none outline-none focus:border-none focus:outline-none rounded-md relative left-[16.5rem] p-2 bg-slate-100 shadow-md text-sm' style={{ width: '250px', height: '28px' }} />
      </div>

      <div className=' mb-3'>
        <label htmlFor="ProblemStatement" className="mr-2  text-lg relative left-[-16.5rem]" style={{ fontFamily: 'Lato', fontWeight: 800, fontStyle: 'bold' }}> Editorial : </label>        {/* <textarea name="Editorial" ref={EditorialRef} id="Editorial" rows={5} cols={5} className='mx-5 mb-5 w-[15rem] p-2 outline-none focus:outline-none resize-none overflow-auto relative left-[16rem] bg-slate-50'></textarea> */}
        <br />
        <br />
        <ReactMarkdownEditorLite
          ref={EditorialRef}
          value={editorial}
          style={{ height: '300px', width: '100%' }}
          onChange={({ text }) => setEditorial(text)}
          renderHTML={text => marked(text)} // Use marked to render Markdown
        />
      </div>

    </>
  )
}

export default DifficultyAndEditorial