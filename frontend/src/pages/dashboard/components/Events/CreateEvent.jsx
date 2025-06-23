

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
    EventImage:"",
    googleFormLink: "",
  });
  const [error, setError] = useState("");
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axiosInstance.post(
        "/events/",
        { ...eventData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Event created successfully!");
      navigate("/event");
    } catch (err) {
      console.log(err);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-300 text-center">
          Create an Event
        </h2>
        {error && (
          <p className="text-red-600 mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter event title"
              value={eventData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Event location"
                value={eventData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Event description"
              value={eventData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Event Image
              </label>
              <input
                type="url"
                id="EventImage"
                name="EventImage"
                placeholder="Image of Event(Drive Link)"
                value={eventData.EventImage}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
          </div>

          {userType === "student" && (
            <div className="space-y-2">
              <label htmlFor="googleFormLink" className="block text-sm font-medium text-gray-700">
                Google Form Link (Optional)
              </label>
              <input
                type="url"
                id="googleFormLink"
                name="googleFormLink"
                placeholder="https://example.com/form"
                value={eventData.googleFormLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          )}

          <div className="pt-6 flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Create Event
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

