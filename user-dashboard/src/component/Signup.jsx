import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const api = `${import.meta.env.VITE_API_URL}/auth/signup`

  const formSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!signupData.name || !signupData.email || !signupData.password || !signupData.confirmPassword || !signupData.role) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(api, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role,
      });

      setSuccess("Account created successfully! Please log in.");
      console.log("Signup Success:", res.data);
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Signup failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={formSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your full name"
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="customer"
                  checked={signupData.role === "customer"}
                  onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                  className="h-4 w-4 accent-blue-500"
                />
                <span>Buyer</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="seller"
                  checked={signupData.role === "seller"}
                  onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                  className="h-4 w-4 accent-blue-500"
                />
                <span>Seller</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="admin"
                  checked={signupData.role === "admin"}
                  onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                  className="h-4 w-4 accent-blue-500"
                />
                <span>Admin</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Create a password"
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Confirm your password"
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white p-2 rounded mt-2 ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
