import React, { useEffect, useState } from "react";
import { fetchAdminData } from "../features/adminDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";

function Admin() {
  const { data, isError, isLoading } = useSelector((state) => state.adminData);
  const [users, setUsers] = useState([]);
  const [sellerLength,setSellerLength]=useState([])
  const [customerLength,setCustomerLength]=useState([])
  const dispatch = useDispatch();

  // Load initial user data
  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  // Sync local state when Redux state updates
  useEffect(() => {
    setUsers(data);
   setSellerLength( users.filter(i=>i.role==='seller'))
 setCustomerLength( users.filter(i=>i.role==='customer'))
  }, [data]);

  const blockUser = async (userId) => {
    // Optimistically update the UI first
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, userStatus: !user.userStatus } : user
      )
    );

    try {
      const api = `${import.meta.env.VITE_API_URL}/admin`;
      const token = localStorage.getItem("token");
      
    const res=  await axios.post(
        `${api}/blockUser`,
        { userId },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh users after the API call is successful
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, userStatus:res.data.userStatus } : user
        )
      )
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error("Failed to block/unblock user.");

      // Revert changes if API call fails
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, userStatus: !user.userStatus } : user
        )
      );
    }
  };

  return (
    <div>
      {isLoading && <p className="text-blue-500 text-center">Loading...</p>}
      {isError && <p className="text-red-500 text-center">Error fetching products.</p>}
      <div style={{display:"flex", border:"2px solid",justifyContent:"space-evenly"}}> <h1>Total Seller :  {sellerLength.length}  </h1>
      <h1>Total Customer : {customerLength.length}</h1></div>
      <h1 style={{ fontWeight: "bolder", fontSize: "30px" }}>Seller Details</h1>
      {users && users.length > 0 ? (
        <div>
          {users.map((i) =>
            i.role === "seller" ? (
              <div
                key={i._id}
                style={{
                  border: "2px solid",
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "4px",
                  background: "#6192AB",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                <p>{i.name}</p>
                <p>{i.email}</p>
                <button
                  style={{
                    backgroundColor: i.userStatus ? "#005891" : "red",
                    minWidth: "50px",
                    borderRadius: "4px",
                  }}
                  onClick={() => blockUser(i._id)}
                >
                  {i.userStatus ? "Block" : "Unblock"}
                </button>
                <Link to={`/sellerInfo/${i._id}`}>
                  <button>
                    <FaInfoCircle />
                  </button>
                </Link>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className="text-blue-500 text-center">No Sellers found.</p>
      )}

      <h1 style={{ fontWeight: "bolder", fontSize: "30px" }}>Customer Details</h1>
      {users && users.length > 0 ? (
        <div>
          {users.map((i) =>
            i.role === "customer" ? (
              <div
                key={i._id}
                style={{
                  border: "2px solid",
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "4px",
                  background: "#6192AB",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                <p>{i.name}</p>
                <p>{i.email}</p>
                <button
                  style={{
                    backgroundColor: i.userStatus ? "#005891" : "red",
                    minWidth: "50px",
                    borderRadius: "4px",
                  }}
                  onClick={() => blockUser(i._id)}
                >
                  {i.userStatus ? "Block" : "Unblock"}
                </button>
              </div>
            ) : null
          )}
        </div>
      ) : (
        <p className="text-blue-500 text-center">No Customers found.</p>
      )}
    </div>
  );
}

export default Admin;
