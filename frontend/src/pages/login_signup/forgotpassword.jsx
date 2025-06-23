import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/forgot-password", { email });
      alert("Password reset link sent to your email!");
    } catch (error) {
      console.error(error.response?.data || "Forgot Password failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="mb-5 text-2xl font-semibold">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-5 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleForgotPassword}
          className="w-full p-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
