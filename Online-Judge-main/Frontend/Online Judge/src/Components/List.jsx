import React from 'react';
import { Link } from 'react-router-dom';

function List({ ProblemName, Difficulty, id }) {
  return (
    <tr className="border-b border-gray-300">
      <td className="px-3 py-3 md:px-6 md:py-3 whitespace-nowrap">
        <Link to={`/problemDetails/${id}`} className="text-blue-500 hover:text-blue-700 ">
          {ProblemName}
        </Link>
      </td>
      <td className={`px-3 py-3 md:px-6 md:py-3 whitespace-nowrap  ${Difficulty==='Hard' ? 'text-red-600' : Difficulty==='Easy' ? 'text-green-600' 
        : Difficulty==='Medium' ? 'text-yellow-600' : '' } `}>{Difficulty}</td>
    </tr>
    
  );
}

export default List;

