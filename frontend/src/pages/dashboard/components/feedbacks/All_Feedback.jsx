

import React, { useEffect, useState, useMemo } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

const AllFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axiosInstance
      .get("/get-feedback", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setFeedbacks(res.data))
      .catch((error) => console.error("Error fetching feedbacks:", error));
  }, []);

  const sortedFeedbacks = useMemo(() => {
    return [...feedbacks].sort((a, b) =>
      filter === "latest" ? new Date(b.createdAt) - new Date(a.createdAt) : 0
    );
  }, [feedbacks, filter]);

  return (
    <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">Feedbacks</h1>
        <select
          className="border border-gray-400 px-3 py-1 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="latest">Latest</option>
        </select>
      </nav>

      {/* Feedback List */}
      <div className="flex-grow w-full overflow-y-auto p-8 grid grid-cols-1 gap-4">
        {sortedFeedbacks.length > 0 ? (
          sortedFeedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
              <h3 className="text-xl font-semibold">{feedback.name} ({feedback.userType})</h3>
              <p className="text-gray-600">{feedback.email}</p>
              <p className="mt-2 text-gray-800">{feedback.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No feedback available</p>
        )}
      </div>
    </div>
  );
};

export default AllFeedback;
