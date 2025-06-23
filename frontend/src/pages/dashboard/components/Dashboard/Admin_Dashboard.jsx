import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";

const AdminDashboard = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnverifiedUsers();
    fetchFeedbacks();
  }, []);

  const fetchUnverifiedUsers = async () => {
    try {
      const response = await axiosInstance.get("/unverified-users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUnverifiedUsers([...response.data.students, ...response.data.alumni]);
    } catch (error) {
      console.error("Error fetching unverified users:", error);
    }
  };

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
      <div className="flex-grow w-full p-6 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Unverified Users Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-300">Unverified Users</h2>
          {unverifiedUsers.length > 0 ? (
            <ul className="space-y-3">
              {unverifiedUsers.slice(0, 3).map((user) => (
                <li key={user.id} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <span className="font-medium">{user.name}</span> 
                  <span className="text-sm text-gray-600"> ({user.isAlumni ? "Alumni" : "Student"})</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No unverified users available</p>
          )}
          <div className="mt-4">
            <Link to="/unverified-users" className="text-blue-600 hover:underline font-medium">
              View All Unverified Users →
            </Link>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-300">Recent Feedback</h2>
          {feedbacks.length > 0 ? (
            <ul className="space-y-3">
              {feedbacks.slice(0, 3).map((feedback) => (
                <li key={feedback.id} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                  <span className="text-gray-800">{feedback.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No feedback available</p>
          )}
          <div className="mt-4">
            <Link to="/feedback" className="text-blue-600 hover:underline font-medium">
              View All Feedback →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



