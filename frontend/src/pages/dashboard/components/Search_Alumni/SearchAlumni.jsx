
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { Link } from "react-router-dom";

const SearchAlumni = () => {
  const [formData, setFormData] = useState({
    name: "",
    branch: "",
    role: "",
    companyName: "",
    experienceRange: "",
  });

  const [alumniResults, setAlumniResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentAlumniSearches")) || [];
    setRecentSearches(stored);
  }, []);

  const updateRecentSearches = (newSearch) => {
    const updated = [newSearch, ...recentSearches.filter(item => item !== newSearch)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentAlumniSearches", JSON.stringify(updated));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = async () => {
    const queryParams = {
      name: formData.name,
      branch: formData.branch,
      role: formData.role,
      companyName: formData.companyName,
    };

    if (formData.experienceRange) {
      const [min, max] = formData.experienceRange.split("-");
      queryParams.minExperience = min;
      queryParams.maxExperience = max;
    }

    updateRecentSearches(formData.name || formData.companyName || formData.role || formData.branch);

    try {
      const res = await axiosInstance.get("/search-alumni", { params: queryParams });
      setAlumniResults(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleRecentClick = (search) => {
    setFormData({ ...formData, name: search });
    handleSearch();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#f5fffb] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Search Alumni</h2>

      {/* 🔍 Search Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Alumni Name"
          className="p-2 border rounded-md w-[130px]"
        />
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleInputChange}
          placeholder="Branch"
          className="p-2 border rounded-md w-[130px]"
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          placeholder="Role"
          className="p-2 border rounded-md w-[130px]"
        />
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          placeholder="Company Name"
          className="p-2 border rounded-md w-[130px]"
        />
        <select
          name="experienceRange"
          value={formData.experienceRange}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-[150px]"
        >
          <option value="">Experience</option>
          <option value="0-2">0-2 years</option>
          <option value="2-5">2-5 years</option>
          <option value="5-10">5-10 years</option>
          <option value="10-50">10+ years</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* 🕘 Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-6 text-center">
          <h4 className="font-semibold text-gray-700 mb-2">Recent Searches</h4>
          <div className="flex justify-center flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentClick(search)}
                className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 📋 Result Count */}
      {alumniResults.length > 0 && (
        <p className="mb-4 text-gray-700 font-medium text-center">
          Showing {alumniResults.length} result{alumniResults.length > 1 && "s"}
        </p>
      )}

      {/* 📋 Results - Stacked vertically */}
      <div className="flex flex-col gap-4">
        {alumniResults.map((alumni, index) => (
          <Link
            key={index}
            to="/alumniDetails"
            state={{ alumni }}
            className="border rounded-md p-4 shadow bg-white hover:shadow-md transition-shadow duration-200"
          >
            <h4 className="text-lg font-semibold text-blue-700">{alumni.name}</h4>
            <p className="text-sm text-gray-600 mb-2">Branch: {alumni.branch}</p>
            {alumni.WorkExperiences?.map((exp, i) => (
              <div key={i} className="text-sm text-gray-700 mb-1">
                <p>🏢 {exp.companyName}</p>
                <p>💼 {exp.role}</p>
                <p>📆 {exp.yearsOfExperience} years</p>
              </div>
            ))}
          </Link>
        ))}
      </div>

      {/* ❌ No Results Found */}
      {alumniResults.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No alumni found for the given filters.</p>
      )}
    </div>
  );
};

export default SearchAlumni;
