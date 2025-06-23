
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import {
  CalendarClock,
  MapPin,
  FileText,
  BadgeInfo,
  Trash2,
  ExternalLink,
} from "lucide-react";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);

    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in again.");
        navigate("/login");
        return;
      }

      await axiosInstance.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Event deleted successfully!");
      navigate("/event");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading event details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="h-screen w-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg border border-gray-300 space-y-6">

        {/* Event Title */}
        <div className="bg-gray-50 p-4 rounded-md border shadow flex items-center gap-3">
          <BadgeInfo className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
        </div>

        {/* Event Description */}
        <div className="bg-gray-50 p-6 min-h-[200px] rounded-md border shadow">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-blue-600 w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800">Event Description</h3>
          </div>
          <p className="text-gray-700 text-base">{event.description}</p>
        </div>

        {/* Event Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date */}
          <div className="bg-gray-50 p-4 rounded-md border shadow">
            <div className="flex items-center gap-3 mb-2">
              <CalendarClock className="text-blue-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Date</h3>
            </div>
            <p className="text-gray-700">{new Date(event.date).toDateString()}</p>
          </div>

          {/* Location */}
          {event.location && (
            <div className="bg-gray-50 p-4 rounded-md border shadow">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-blue-600 w-6 h-6" />
                <h3 className="text-lg font-semibold text-gray-800">Location</h3>
              </div>
              <p className="text-gray-700">{event.location}</p>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-md border shadow">
                <p><strong>Event Image:</strong>{" "}
                  {event.EventImage ? (
                    <a
                      href={event.EventImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Image
                    </a>
                  ) : "No Image available"}
                </p>
            </div>

        {/* Google Form for Alumni */}
        {userType === "alumni" && event.googleFormLink && (
          <a
            href={event.googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 underline font-medium transition"
          >
            <ExternalLink className="w-5 h-5" />
            Apply as a Judge
          </a>
        )}

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-all"
        >
          <Trash2 className="w-5 h-5" />
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;