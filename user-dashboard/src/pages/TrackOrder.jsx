import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

function TrackOrder() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const api = `${import.meta.env.VITE_API_URL}/order`;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${api}/getOrderItem`, {
          headers: { authorization: `Bearer ${token}` },
        });

        setData(res.data.orderDetails);
      } catch (error) {
        console.error("Error fetching ordered product details:", error);
        toast.error("Error fetching ordered product details");
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track Order</h2>
      {data.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {data.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-md flex items-center gap-4">
              <img src={order.productId.imageUrl} alt={order.productId.title} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{order.productId.title}</h3>
                <p className="text-gray-600">Quantity: {order.quantity}</p>
                <p className="text-gray-600">Total Price: ${order.productId.rate * order.quantity}</p>
                <p className="text-gray-600">Payment Mode: {order.paymentMode}</p>
                <p className="text-gray-600">Address: {order.address}</p>
                <p className="text-gray-600">Phone: {order.phone}</p>
                <p className={`font-bold ${order.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>Status: {order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TrackOrder;