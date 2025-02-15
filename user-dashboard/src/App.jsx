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
import SellerInfo from './pages/SellerInfo'
import Cart from './pages/Cart'
import Order from './pages/Order'
import TrackOrder from "./pages/TrackOrder"
import TrackOrderSection from './pages/TrackOrderSection'

function App() {
const isAuth=()=>{
   return localStorage.getItem('token') ?"true" :"false";
}

const ProtectedRoute=({children})=>{
  return isAuth()==='true' ? children :<Navigate to='/login'/>
}

const role=localStorage.getItem('role')

  return (
  <>
  <Header/>
    {/* {role ==='customer' ? <Sidebar/> : null} */}
    <Routes>
      <Route path='/*' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order/:itemId' element={<Order/>} />
      <Route path='/trackOrder' element={<TrackOrder/>} />
      
      <Route path='/additem' element={<AddItem/>} />
      <Route path='/trackOrderSection' element={<TrackOrderSection/>} />
      <Route path='/updateItem/:userId' element={<UpdateItem/>} />
      <Route path='/productDetails/:productId' element={<ProductDetails/>} />
      <Route path='/sellerInfo/:sellerId' element={<SellerInfo/>} />
       
    </Routes>
<Toaster/>
  </>
  )
}

export default App