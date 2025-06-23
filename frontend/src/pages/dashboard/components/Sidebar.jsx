import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => (
  <div className="w-64 bg-gray-900 text-white shadow-lg rounded-2xl p-4 space-y-6">
    <Link to="/create-event">Create Event</Link>
    {role === "student" && <Link to="/search-alumni">Search Alumni</Link>}
    <Link to="/messages">Messages/Notifications</Link>
  </div>
);

export default Sidebar;
