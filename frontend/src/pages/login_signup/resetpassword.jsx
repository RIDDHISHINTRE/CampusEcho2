import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/reset-password/${token}`, { newPassword: password });
      alert("Password reset successful!");
    } catch (error) {
      console.error(error.response?.data || "Reset Password failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="mb-5 text-2xl font-semibold">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          name="newPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-5 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleResetPassword}
          className="w-full p-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

