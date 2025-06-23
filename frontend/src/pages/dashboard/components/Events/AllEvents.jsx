import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { PlusCircle } from "lucide-react";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold">All Events</h1>
        <Link to="/createevent" className="hover:text-blue-600 flex items-center gap-1">
          <PlusCircle className="w-5 h-5" /> Create Event
        </Link>
      </nav>

      {/* Events List */}
      <div className="w-full max-w-3xl mx-auto px-4 py-6">
        {events.length === 0 ? (
          <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-600 text-lg">No events available.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                <p className="text-gray-600 text-sm">Date: {event.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;



