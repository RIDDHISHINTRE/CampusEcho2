import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { Trash2, PlusCircle } from "lucide-react";

const AlumniJobs = () => {
  const  id = localStorage.getItem("id");// Alumni ID from URL params
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  
  console.log("Alumni ID from URL:", id);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve authentication token
    if (!token) {
      console.error("No token found! Redirecting to login...");
      return; // Exit if no token is found
    }
  
    console.log("Fetching jobs for alumni:", id); // Log alumni ID
  
    axiosInstance
      .get(`/jobs/alumni/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Jobs received:", response.data); // Log API response
        setJobs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching alumni jobs:", error);
        if (error.response?.status === 401) {
          alert("Unauthorized! Please log in again.");
          localStorage.removeItem("token");
          navigate("/login"); // Redirect to login
        }
      });
  }, [id]);
  

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in again.");
        navigate("/login");
        return;
      }

      await axiosInstance.delete(`/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Job deleted successfully!");
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId)); // Update UI
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">Jobs You Have Posted</h1>
        <div className="flex space-x-6 items-center text-lg">
          <Link to="/alumni-dashboard" className="hover:text-blue-600">Dashboard</Link>
          <Link to="/jobs/post" className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <PlusCircle className="w-5 h-5" /> Post a Job
          </Link>
        </div>
      </nav>

      {/* Job Listings */}
      <div className="flex-grow w-full overflow-y-auto p-8">
        <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
        

          {jobs.length === 0 ? (
            <p className="text-gray-600">No jobs posted yet.</p>
          ) : (
            <div className="grid gap-4">
              {jobs.map((job) => (
                <div key={job.id} className="p-4 border rounded shadow-lg flex justify-between items-center">
                  <div>
                    {/* 🔗 Clickable Job Title to Navigate to Job Details */}
                    <Link to={`/job/${job.id}`} className="text-xl font-semibold text-blue-500 hover:underline">
                      {job.title}
                    </Link>
                   
                  </div>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center gap-2 hover:bg-red-600"
                  >
                    <Trash2 className="w-5 h-5" /> Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlumniJobs;

