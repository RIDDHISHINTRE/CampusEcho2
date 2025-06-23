import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/jobs/all")
      .then((response) => {
        // Sort jobs by deadline (closest to current date) and show only latest 3
        const sortedJobs = response.data
          .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
          .slice(0, 3);

        setJobs(sortedJobs);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  return (
    <div className="container mx-auto p-5">
      <div className="grid gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="p-4 border rounded shadow-lg">
              <h3 className="text-xl font-semibold">
                <Link to={`/job/${job.id}`} className="text-blue-500 hover:underline">
                  {job.title}
                </Link>
              </h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No job opportunities available.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
