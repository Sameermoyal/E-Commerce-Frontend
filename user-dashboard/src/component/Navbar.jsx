import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartArrowDown,FaShoppingBag } from "react-icons/fa";
import { IoIosLogOut  } from "react-icons/io";

function Navbar() {
  const navigate=useNavigate()
  const removeToken=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex items-center justify-between">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-orange-400">Shop Now</Link>
      </div>

      <div className="flex gap-4">
        <Link to="/" className="text-white no-underline font-normal hover:font-bold hover:text-yellow-400">
          Home
        </Link>
        <Link to="/shop" className="text-white no-underline font-normal hover:font-bold hover:text-yellow-400">
          SHOP
        </Link>
        <Link to="/about" className="text-white no-underline font-normal hover:font-bold hover:text-yellow-400">
          ABOUT
        </Link>
        <Link to="/contact" className="text-white no-underline font-normal hover:font-bold hover:text-yellow-400">
          CONTACT
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="text-white no-underline hover:text-yellow-400">
          <FaCartArrowDown /> 
        </Link>
        <Link to="/trackOrder" className="text-white no-underline hover:text-yellow-400">
          <FaShoppingBag /> 
        </Link>
        <button onClick={removeToken} className="text-white no-underline hover:text-yellow-400">
        <IoIosLogOut />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
