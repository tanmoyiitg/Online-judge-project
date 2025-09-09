import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'


function Header({id,Editorial,ProblemName,testcases,user}) {
  const [hoverMessageforMySubmission,setHoverMessageforMySubmission] = useState(false)
  const [hoverMessageforAllSubmission,setHoverMessageforAllSubmission] = useState(false)
  const isButtonDisabled = !user
  return (
    <div>
        
        <ul className='flex gap-3 mb-2 font-semibold w-[28rem]  justify-around'>
          <li> <NavLink to={`/problemDetails/${id}`}  className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer  `}>Description</NavLink></li>
          
          <li> <NavLink to={`/Editorial/${id}`} state={{Editorial:{Editorial},id:{id},ProblemName:{ProblemName}, testcases:{testcases} }} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer `}>Editorial</NavLink></li>
          <div className='relative'>
            <li onMouseEnter={() => setHoverMessageforMySubmission(true)} onMouseLeave={() => setHoverMessageforMySubmission(false)}> <NavLink to={`/MySubmission/${id}`} state={{id:{id}}} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer ${isButtonDisabled ? "pointer-events-none opacity-100 cursor-pointer" : ""} `}>My Submission</NavLink></li>
              {(isButtonDisabled && hoverMessageforMySubmission) && (
                    <div className='bg-gray-200 text-black text-sm font-thin border-2 rounded-md whitespace-pre-wrap h-auto w-[7.8rem] px-2 transition-all duration-800 ease-in-out'style={{ position: 'absolute', right: '0px', top: '30px' }}>
                      You need to login
                    </div>
              )}
          </div>
          <div className='relative'>
            <li onMouseEnter={() => setHoverMessageforAllSubmission(true)} onMouseLeave={() => setHoverMessageforAllSubmission(false)}><NavLink to={`/AllSubmission/${id}`} state={{id:{id}}} className={({isActive}) =>` ${isActive ? "text-orange-700 border-2 rounded-lg bg-yellow-50 p-1 text-center" : "text-gray-700"}  hover:text-orange-700  cursor-pointer ${isButtonDisabled ? "pointer-events-none opacity-100" : ""} `}>All Submission</NavLink></li>
              {(isButtonDisabled && hoverMessageforAllSubmission) && (
                      <div className='bg-gray-200 text-black text-sm font-thin border-2 rounded-md whitespace-pre-wrap h-auto w-[7.8rem] px-2 transition-all duration-800 ease-in-out'style={{ position: 'absolute', right: '0px', top: '30px' }}>
                        You need to login or sign up
                      </div>
              )}
          </div>
        </ul>
      </div>
  )
}

export default Header