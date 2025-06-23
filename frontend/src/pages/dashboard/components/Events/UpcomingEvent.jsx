
import React, { useEffect, useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
        Upcoming Events
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-600">No upcoming events.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition duration-300"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
       <div className="mt-4">
          <Link to="/event" className="text-blue-500 hover:underline">
            View All Events →
          </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
