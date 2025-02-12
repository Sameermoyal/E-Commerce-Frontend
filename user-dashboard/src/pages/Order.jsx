import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Order() {
  const { itemId } = useParams(); // Get item ID from the URL
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState({
    address: "",
    paymentMode: "COD", // Default to Cash on Delivery
    quantity: 1,
    phone:"",
    product: null,
  });

  useEffect(() => {
    // Fetch product details based on itemId
    const fetchProductDetails = async () => {
      try {
        const api = `${import.meta.env.VITE_API_URL}/customerProducts`;
        const token = localStorage.getItem("token");

        const res = await axios.get(`${api}/getCartItem`, {
          headers: { authorization: `Bearer ${token}` },
        });

        // Find the product in the cart
        const cartProduct = res.data.cartList
          .flatMap(cart => cart.items)
          .find(item => item._id === itemId);

        if (cartProduct) {
          setOrderDetails(prev => ({ ...prev, quantity: cartProduct.quantity, product: cartProduct }));
        } else {
          toast.error("Product not found in cart");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error fetching product details");
      }
    };

    fetchProductDetails();
  }, [itemId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async () => {
    if (!orderDetails.address || !orderDetails.paymentMode) {
      toast.error("Please fill in all details.");
      return;
    }

    try {
      const api = `${import.meta.env.VITE_API_URL}/order`;
      const token = localStorage.getItem("token");

      const orderData = {
        productId: orderDetails.product.productId._id,
        quantity: orderDetails.quantity,
        address: orderDetails.address,
        paymentMode: orderDetails.paymentMode,
        phone:orderDetails.phone,
        itemId
      };

      await axios.post(`${api}/createOrder`, orderData, {
        headers: { authorization: `Bearer ${token}` },
      });

      toast.success("Order placed successfully!");
      navigate("/trackOrder"); // Redirect to orders page
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error("Failed to place order.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {orderDetails.product && (
        <div className="mb-4 p-4 border rounded-lg shadow">
          <p className="text-lg font-semibold">{orderDetails.product.productId.title}</p>
          <p>Quantity: {orderDetails.quantity}</p>
        </div>
      )}

      <label className="block mb-2 font-semibold">Phone Number:</label>
      <input
        type="text"
        name="phone"
        value={orderDetails.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your address"
      />
      <label className="block mb-2 font-semibold">Address:</label>
      <input
        type="text"
        name="address"
        value={orderDetails.address}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter your address"
      />

      <label className="block mb-2 font-semibold">Payment Mode:</label>
      <select
        name="paymentMode"
        value={orderDetails.paymentMode}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="COD">Cash on Delivery</option>
        <option value="Card">Card Payment</option>
      </select>

      <button
        onClick={placeOrder}
        className="w-full bg-blue-500 text-white p-2 rounded shadow-md hover:bg-blue-600"
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Order;
