import React from 'react'
import Seller from './Seller'
import Admin from './Admin'
import Customer from './Customer'

function Home() {
  const role= localStorage.getItem('role')
 
  if(role==='seller'){
    return <Seller/>
  }
  if(role==='admin'){
    return <Admin/>
  }
  return (
    <>
      <Customer/>
      
    </>
  )
}

export default Home