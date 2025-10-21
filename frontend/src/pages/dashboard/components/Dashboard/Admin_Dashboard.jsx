import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";

const AdminDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await axiosInstance.get("/get-feedback", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md border-b">
        <h1 className="text-3xl font-bold tracking-wide">CampusEcho</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-6 md:p-10">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-300">
            Recent Feedback
          </h2>

          {feedbacks.length > 0 ? (
            <ul className="space-y-3">
              {feedbacks.slice(0, 5).map((feedback) => (
                <li
                  key={feedback.id}
                  className="bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <span className="text-gray-800">{feedback.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No feedback available</p>
          )}

          <div className="mt-4 text-right">
            <button
              onClick={() => navigate("/feedback")}
              className="text-blue-600 hover:underline font-medium"
            >
              View All Feedback →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
