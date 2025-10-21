import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditStudentProfile = () => {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    collegeid: "",
    branch: "",
    year: "",
    bio: "",
    password: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axiosInstance.get(`/student/${id}`);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("id");
      await axiosInstance.put(`/student/edit/${id}`, studentData);
      alert("Profile updated successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-white p-10 shadow-md rounded-lg">
        <h2 className="text-3xl font-semibold mb-6 border-b-2 pb-2">Edit Student Profile</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 text-lg">
          <div>
            <label className="block font-medium">Name:</label>
            <input type="text" name="name" value={studentData.name} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input type="email" name="email" value={studentData.email}  onChange={handleChange} className="w-full border p-3 rounded-md bg-gray-100" required/>
          </div>
          <div>
            <label className="block font-medium">College ID:</label>
            <input type="text" name="collegeid" value={studentData.collegeid} onChange={handleChange} className="w-full border p-3 rounded-md" required />
          </div>
          <div>
            <label className="block font-medium">Branch:</label>
            <select name="branch" value={studentData.branch} onChange={handleChange} className="w-full border p-3 rounded-md" required>
              <option value="comp">Computer Engineering</option>
              <option value="it">Information Technology</option>
              <option value="aids">AI & Data Science</option>
              <option value="entc">Electronics & Telecommunication</option>
              <option value="ece">Electronics & Computer Engineering</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Year:</label>
            <select name="year" value={studentData.year} onChange={handleChange} className="w-full border p-3 rounded-md" required>
              <option value="first">First Year</option>
              <option value="second">Second Year</option>
              <option value="third">Third Year</option>
              <option value="fourth">Fourth Year</option>
            </select>
          </div>
          <div className="col-span-2">
            <label className="block font-medium">Bio:</label>
            <textarea name="bio" value={studentData.bio} onChange={handleChange} className="w-full border p-3 rounded-md" placeholder="Write a short bio..." />
          </div>
          <div className="col-span-2 flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-md flex items-center text-xl font-semibold hover:bg-green-600">
              <Save className="mr-2" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentProfile;




