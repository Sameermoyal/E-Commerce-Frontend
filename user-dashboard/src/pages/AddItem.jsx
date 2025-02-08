import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddItem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    image: null,
    rate: '',
    brand: '',
    category:''
  });

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api = `${import.meta.env.VITE_API_URL}/seller`;
    const token = localStorage.getItem('token');

    const formDataToSend = new FormData();
    //title, rate, desc, category,quantity ,brand
    formDataToSend.append("title", formData.title);
    formDataToSend.append("desc", formData.description);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("rate", formData.rate);
    formDataToSend.append("brand", formData.brand);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image); // Image file

    try {
        const res = await axios.post(`${api}/addProduct`, formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        });

        console.log("API Response:", res.data);
       
        toast.success("Product added successfully!")
        navigate('/')
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        toast.error("Failed to add product");
    }
};


  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>
        
        <label className="block mb-2">Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <label className="block mb-2">Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <label className="block mb-2">Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <label className="block mb-2">Category:</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <label className="block mb-2">Image:</label>
        <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border rounded mb-4" required />
        
        <label className="block mb-2">Rate:</label>
        <input type="number" name="rate" value={formData.rate} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <label className="block mb-2">Brand:</label>
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full p-2 border rounded mb-4" required />
        
        <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition">Add Product</button>
      </form>
    </div>
  );
}

export default AddItem;
