import React, { useEffect, useState } from "react";
import { fetchTrackOrders } from "../features/trackCustomerOrder";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

function TrackOrderSection() {
  const { data, isLoading, isError } = useSelector((state) => state.trackOrders);
  const dispatch = useDispatch();

  const [statusUpdates, setStatusUpdates] = useState({});

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const api = `${import.meta.env.VITE_API_URL}/seller`;
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `${api}/updateOrderStatus/${orderId}`,
        { status: newStatus },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Order status updated successfully");

      // Update local state to reflect the change immediately
      setStatusUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(`Failed to update status: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchTrackOrders());
  }, [dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Track Orders</h2>

      {isLoading && <div className="text-lg text-blue-600">Loading...</div>}
      {isError && <div className="text-lg text-red-600">Error fetching data</div>}

      {data?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((i) => (
            <div key={i._id} className="p-4 bg-white rounded-lg shadow-md border">
              <h5 className="font-semibold">Order ID: <span className="text-gray-600">{i._id}</span></h5>
              <h5 className="font-semibold">Product ID: <span className="text-gray-600">{i.productId}</span></h5>
              <h5 className="font-semibold">Customer ID: <span className="text-gray-600">{i.customerId}</span></h5>
              <h5 className="font-semibold">Phone: <span className="text-gray-600">{i.phone}</span></h5>
              <h5 className="font-semibold">Address: <span className="text-gray-600">{i.address}</span></h5>
              <h5 className="font-semibold">Quantity: <span className="text-gray-600">{i.quantity}</span></h5>
              <h5 className="font-semibold">Payment Mode: <span className="text-gray-600">{i.paymentMode}</span></h5>
              
              <label className="block font-semibold mt-3">Status:</label>
              <select
                value={statusUpdates[i._id] || i.status}
                onChange={(e) => handleStatusChange(i._id, e.target.value)}
                className="mt-2 px-3 py-2 border rounded-md bg-white text-gray-700"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <div className="text-lg text-gray-700">No orders found</div>
      )}
    </div>
  );
}

export default TrackOrderSection;
