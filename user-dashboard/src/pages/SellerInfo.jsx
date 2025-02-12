import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

function SellerInfo() {
 const{sellerId}=  useParams();
 const [data,setData]=useState(null)
 const [dataLength,setDataLength]=useState(null)

 useEffect(()=>{
    const fetchSellerData=async ()=>{
        try{
            const api = `${import.meta.env.VITE_API_URL}/admin`;
            const token = localStorage.getItem('token');
            const res = await axios.get(`${api}/getSpecificSeller/${sellerId}`,{
                headers: {
                  "authorization": `Bearer ${token}`
                }
            })
          setData(res.data.sellerProducts)
          setDataLength(res.data.productlength) 
        
        } catch(error) {
            console.log("Error:", error.response ? error.response.data : error.message);
            toast.error("Failed to get specific Seller Data in admin panel");
        }
    }

    fetchSellerData()
 },[sellerId])

  return (
    <div>
      <h1>Total Product  : {dataLength}</h1>
    </div>
  )
}

export default SellerInfo