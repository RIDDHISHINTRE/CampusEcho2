import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageCircle,
  CalendarDays,
  Bell,
  Edit,
  Briefcase,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import FeedbackForm from "../feedbacks/Feedback";
import UpcomingEvents from "../Events/UpcomingEvent";
import JobList from "../Jobs/dashJobList";
import axiosInstance from "../../../../utils/axiosInstance";

const AlumniDashboard = () => {
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // mobile nav toggle

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("id");
    navigate("/login");
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) return;

      try {
        const response = await axiosInstance.get(`/notifications/${userId}`);
        if (response.data.success) {
          setUnreadCount(response.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  return (
    <div className="h-screen w-screen bg-white-800 text-gray-900 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-extrabold tracking-wide">CampusEcho</h1>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 items-center text-lg">
          <Link to="/jobs/alumni" className="hover:text-blue-600 flex items-center gap-1">
            <Briefcase className="w-5 h-5" /> Job Opportunities
          </Link>
          <Link to="/event" className="hover:text-blue-600 flex items-center gap-1">
            <CalendarDays className="w-5 h-5" /> Events
          </Link>
          <Link to="/edit-alumni-profile" className="hover:text-blue-600 flex items-center gap-1">
            <Edit className="w-5 h-5" /> View Profile
          </Link>
          <button
            onClick={handleNotificationClick}
            className="relative hover:text-blue-600 flex items-center gap-1"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
            Notifications
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        {/* Mobile Nav Links */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white flex flex-col space-y-4 p-4 border-t shadow-md md:hidden text-lg">
            <Link to="/jobs/alumni" className="flex items-center gap-2 hover:text-blue-600">
              <Briefcase className="w-5 h-5" /> Job Opportunities
            </Link>
            <Link to="/event" className="flex items-center gap-2 hover:text-blue-600">
              <CalendarDays className="w-5 h-5" /> Events
            </Link>
            <Link to="/edit-alumni-profile" className="flex items-center gap-2 hover:text-blue-600">
              <Edit className="w-5 h-5" /> View Profile
            </Link>
            <button
              onClick={handleNotificationClick}
              className="flex items-center gap-2 hover:text-blue-600"
            >
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="flex-grow w-full overflow-y-auto p-8 grid grid-cols-1 gap-8">
        <UpcomingEvents />

        <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
            Jobs Posted by You
          </h2>
          <JobList />
          <div className="mt-4 flex justify-between items-center">
            <Link to="/jobs/alumni" className="text-blue-500 hover:underline">
              View All Jobs →
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-10 right-10 bg-black text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition duration-300"
        title="Feedback"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Feedback Form Overlay */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <FeedbackForm onClose={() => setShowFeedback(false)} />
        </div>
      )}
    </div>
  );
};

export default AlumniDashboard;




