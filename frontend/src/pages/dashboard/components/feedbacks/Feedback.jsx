import React, { useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

const FeedbackForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!userId || !userType) {
      setMessage("User ID and User Type are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/feedback-post", {
        userId,
        userType,
        description: formData.description,
      });

      setMessage(response.data.message);
      setFormData({ description: "" });
    } catch (error) {
      if (error.response) {
        console.error("Server Response:", error.response.data);
        setMessage(error.response.data.message || "Failed to submit feedback. Try again!");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setMessage("Server is not responding. Please try again later.");
      } else {
        console.error("Error:", error.message);
        setMessage("An unexpected error occurred.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg w-full max-w-3xl relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Feedback Form
      </h2>

      {message && (
        <p className="text-center text-green-600 font-medium mb-4">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Your Feedback
          </label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Write your feedback here..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-2 font-medium rounded-md text-white shadow-sm transition duration-150 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;



