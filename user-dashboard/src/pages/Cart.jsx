import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
   const [cartItems, setCartItems] = useState([]);
 
  // Fetch Cart Items
  const getCart = async () => {
    try {
      const api = `${import.meta.env.VITE_API_URL}/customerProducts`;
      const token = localStorage.getItem("token");

      const res = await axios.get(`${api}/getCartItem`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.cartList); // Set cart data in state
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      toast.error(`You have not added any items to the cart: ${error.response?.data?.message || error.message}`);
    }
  };
  const removeCart = async (itemId) => {
    try {
       
      
      const api = `${import.meta.env.VITE_API_URL}/customerProducts`;
      const token = localStorage.getItem("token");

      const res = await axios.delete(`${api}/removeCart/${itemId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      getCart()
      toast.success("item remove from cart"); 
      setCartItems((prevCart) =>
        prevCart
          .map((cart) => ({
            ...cart,
            items: cart.items.filter((item) => item._id !== itemId),
          }))
          .filter((cart) => cart.items.length > 0) // Remove empty carts
      );// Set cart data in state
    } catch (error) {
      console.log("Error:", error.response?.data || error.message);
      toast.error(`not removed items to the cart: ${error.response?.data?.message || error.message}`);
    }
  };

const changeQuantity=async(itemId,str,itemCount)=>{
  if(itemCount<=1 && str ==='dec'){
    toast.error(" minimum one required ")
    return
  }
  if(str==='inc'){
    itemCount+=1;
  }else{
   itemCount-=1;
  }


  try {
    
    
    const api = `${import.meta.env.VITE_API_URL}/customerProducts`;
    const token = localStorage.getItem("token");

    const res = await axios.post(`${api}/itemQuantity`, {itemId,itemCount}, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

     getCart()
  } catch (error) {
    console.log("Error:", error.response?.data || error.message);
    toast.error(` Not changed quantity in cart refresh page : ${error.response?.data?.message || error.message}`);
  }
}

  useEffect(() => {
    getCart();
  }, [setCartItems]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(i=><div>TotalAmount : {i.totalAmount}</div>)}
          {cartItems.map((cart) =>
                            
 
            cart.items.map((item) => (
              <div key={item._id} className="flex items-center border p-4 rounded-lg shadow-md justify-between">
                <div className="flex items-center">
                  <img
                    src={item.productId.imageUrl}
                    alt={item.productId.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold">{item.productId.title}</p>
                   
                   <div className="flex"> 
                   <button onClick={()=>changeQuantity(item._id,"inc",item.quantity)} style={{backgroundColor:"blue", width:"15px",height:"25px", borderRadius:"4px", color:"white"}}>
                   +
                </button>
                <p className="text-gray-800 ">Quantity: {item.quantity}</p>
                <button onClick={()=>changeQuantity(item._id,"dec",item.quantity)} style={{backgroundColor:"blue", width:"15px",height:"25px", borderRadius:"4px", color:"white"}}>
                   -
                </button>
               
                   </div>
                   <p className="text-gray-800 ">rate : {item.rate}</p>
                   <p className="text-gray-800 ">total : {item.total}</p>
                  </div>
                </div>

                {/* Place Order Button */}
                <Link to={`/order/${item._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                  Place Order
                </button>
                </Link>
                <button onClick={()=>removeCart(item._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
                   remove 
                </button>
                
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
