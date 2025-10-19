import React from 'react'

function Navbar() {
  return (
    <div className='bg-cyan-800 flex justify-between p-3 items-center text-white'>
        <div className='font-bold text-xl'>
            Todo for Today
        </div>
      <ul className='flex gap-4 '>
        <li className='hover:cursor-pointer'>Home</li>
        <li className='hover:cursor-pointer'>About</li>
      </ul>
    </div>
  )
}

export default Navbar
