import React from 'react'
import { Navigate, Route,Routes, useNavigate } from 'react-router-dom'
import Login from './component/Login'
import Signup from './component/Signup'
import Home from './pages/Home'
import AddItem from './pages/AddItem'
import { Toaster } from 'react-hot-toast';
import UpdateItem from './pages/UpdateItem'
import Header from './component/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import ProductDetails from './pages/ProductDetails'
import Sidebar from './component/Sidebar'

function App() {
const isAuth=()=>{
   return localStorage.getItem('token') ?"true" :"false";
}

const ProtectedRoute=({children})=>{
  return isAuth()==='true' ? children :<Navigate to='/login'/>
}


  return (
  <>
  <Header/>
  <Sidebar/>
    <Routes>
      <Route path='/*' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<About/>} />
      
      <Route path='/additem' element={<AddItem/>} />
      <Route path='/updateItem/:userId' element={<UpdateItem/>} />
      <Route path='/productDetails/:productId' element={<ProductDetails/>} />
       
    </Routes>
<Toaster/>
  </>
  )
}

export default App