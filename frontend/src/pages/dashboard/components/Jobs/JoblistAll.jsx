import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const JobListAll = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/jobs/all") // Fetch all jobs
      .then((response) => setJobs(response.data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">All Job Opportunities</h1>
        <div className="flex space-x-6 items-center text-lg">
          <Link to="/student-dashboard" className="hover:text-blue-600">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Job Listings Section */}
      <div className="flex-grow w-full overflow-y-auto p-8 grid grid-cols-1 gap-8">
        <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
            Available Jobs
          </h2>

          {jobs.length === 0 ? (
            <p className="text-gray-600">No job opportunities available.</p>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 border rounded shadow-lg">
                  <h3 className="text-xl font-semibold">
                    <Link to={`/job/${job.id}`} className="text-blue-500 hover:underline">
                      {job.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-gray-700">{job.description.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListAll;
