import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    applicationLink: "",
    deadline: "",
    location: "",
    eligibility: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Unauthorized: No token found. Please log in.");
      return;
    }

    try {
      await axiosInstance.post(
        "/jobs/post",
        { ...jobData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job posted successfully!");
      navigate("/jobs/alumni");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-300 text-center">
          Post a Job Opportunity
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter job title"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter detailed job description"
              onChange={handleChange}
              required
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Job location"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="eligibility" className="block text-sm font-medium text-gray-700">
                Eligibility Requirements
              </label>
              <input
                type="text"
                id="eligibility"
                name="eligibility"
                placeholder="Required qualifications"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Application Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="applicationLink" className="block text-sm font-medium text-gray-700">
                Application Link
              </label>
              <input
                type="url"
                id="applicationLink"
                name="applicationLink"
                placeholder="https://example.com/apply"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-center space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-md shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Submit Job Post
            </button>
            <button
              type="button"
              onClick={() => navigate("/jobs/alumni")}
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

export default PostJob;
