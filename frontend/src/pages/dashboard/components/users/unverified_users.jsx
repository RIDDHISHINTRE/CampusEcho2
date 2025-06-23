import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const UnverifiedUsers = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  const fetchUnverifiedUsers = async () => {
    try {
      const response = await axiosInstance.get("/unverified-users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const combined = [
        ...response.data.students,
        ...response.data.alumni,
      ];

      setUnverifiedUsers(combined);
    } catch (error) {
      console.error("Error fetching unverified users:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="w-full p-4 bg-white shadow sticky top-0 z-10 border-b border-gray-200">
        <div className="flex justify-between items-center max-w-full px-4">
          <h1 className="text-2xl font-bold text-gray-800">Unverified Users</h1>
          <Link
            to="/admin-dashboard"
            className="text-blue-600 hover:text-blue-800 font-medium transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
            List of Unverified Users
          </h2>

          {unverifiedUsers.length > 0 ? (
            <>
              <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Unverified Students</h3>
                <ul className="space-y-3">
                  {unverifiedUsers
                    .filter((user) => user.userType === "student")
                    .map((user) => (
                      <li
                        key={`student-${user.id}`}
                        className="bg-gray-50 p-4 rounded-md border flex justify-between items-center hover:bg-gray-100 transition"
                      >
                        <span className="font-medium">{user.name} (student)</span>
                        <button
                          onClick={() =>
                            navigate(`/unverified-user/${user.id}`, {
                              state: { userType: user.userType },
                            })
                          }
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </button>
                      </li>
                    ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-700 mb-3">Unverified Alumni</h3>
                <ul className="space-y-3">
                  {unverifiedUsers
                    .filter((user) => user.userType === "alumni")
                    .map((user) => (
                      <li
                        key={`alumni-${user.id}`}
                        className="bg-gray-50 p-4 rounded-md border flex justify-between items-center hover:bg-gray-100 transition"
                      >
                        <span className="font-medium">{user.name} (alumni)</span>
                        <button
                          onClick={() =>
                            navigate(`/unverified-user/${user.id}`, {
                              state: { userType: user.userType },
                            })
                          }
                          className="text-blue-500 hover:underline"
                        >
                          View Details
                        </button>
                      </li>
                    ))}
                </ul>
              </section>
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg py-10">No unverified users found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default UnverifiedUsers;




