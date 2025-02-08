import React, { useState } from "react";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
 const navigate=useNavigate()
  
  const api = `${import.meta.env.VITE_API_URL}/auth/login`; 

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!loginData.email || !loginData.password) {
      setError("Email and Password are required!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(api, loginData);
      console.log("Login Success:", res.data);
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      // Redirect or store token if needed
      navigate('/')
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={formSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded mt-2 ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
