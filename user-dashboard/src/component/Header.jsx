import React from 'react'
import Navbar from './Navbar'

function Header() {
  return (
    <div>
         <Navbar/>
         <input type="text" className='border-4 w-full border-blue-300' placeholder='Search' />
          
        </div>
  )
}

export default Header