import React, { useEffect } from 'react'

function Unauthorised() {

  useEffect(() => {
    const externalElement = document.querySelector('#root');
    document.body.style.display = 'flex';
    document.body.style.alignItems = 'center';
    externalElement.style.margin = 'auto'
    externalElement.style.textAlign = 'center'

    return () => {
      document.body.style.display = '';
      document.body.style.alignItems = '';
      externalElement.style.margin = ''
      externalElement.style.textAlign = ''
      window.scrollTo(0, 0); // Scroll to top
    }

  }, [])

  return (
    <div className='relative bottom-[85px] rounded-lg' >
      <div className='text-2xl mb-2'>Unauthorised</div>
      <div className='bg-blue-900 border-[10px] h-[15rem] w-[25rem] p-5 flex justify-center items-center rounded-lg'>
        <p className='text-white text-xl'>You are not authorised to visit this page</p>
      </div>
    </div>
  )
}

export default Unauthorised