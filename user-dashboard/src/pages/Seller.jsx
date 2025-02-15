import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/sellerFetchProductSlice';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Seller() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(state => state.sellerProduct);
 const navigate=useNavigate()

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);


  const callUpdateItem=(e,userId)=>{
    e.preventDefault()
   
    navigate(`/updateItem/${userId}`)

  }
  const api = import.meta.env.VITE_API_URL + "/seller";


  const deleteSellerProduct=async(userId)=>{
    try {

     
     const token = localStorage.getItem('token');

      const res = await axios.delete(`${api}/deleteOneProduct/${userId}`, {
          headers: {
              "authorization": `Bearer ${token}`
          }
      });

      console.log("API Response:", res.data);
     
      toast.success("Product delete successfully!")
      dispatch(fetchData());
     
  } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("Failed to delete product");
  }
};    

  
  



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Manage Your Products</h2>

      {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
      {isError && <p className="text-red-500 text-center">Error fetching seller products.</p>}
      <Link to='/trackOrderSection' className='bg-red-400 w-20 ' >Track Order Section</Link>
      {data && data.length > 0 ? (
        
      <div>
        <div className='flex justify-around'>
        <h1>title</h1>
        <h1>Category</h1>
        <h1>Description</h1>
        <h1>Quantity</h1>
        <h1>Brand</h1>

        <h1>Image</h1>
        <h1>Edit</h1>
        <h1>Delete</h1>

        </div>
        {data.map(i=>(
       <div key={i._id} className='flex justify-around border-2 border-blue-500 m-4 '> 
       <h5>{i.title}</h5>
       <h5>{i.category}</h5>
       <h5>{i.desc}</h5>
       <p>{i.quantity}</p>
       <p>{i.brand}</p>
       
       <img  src={i.imageUrl}  className='w-10 h-10' />
       <button onClick={(e)=>callUpdateItem(e,i._id)}> <MdOutlineEdit/></button>
       <button onClick={(e)=>deleteSellerProduct(i._id)}> <MdDelete/></button>
       </div>
      ))}</div>
      ) : (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      <Link to='/additem' className='bg-red-400 w-20 ' >Add +</Link>

       
    </div>
  );
}

export default Seller;
