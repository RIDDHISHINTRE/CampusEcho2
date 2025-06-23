
import React, { useState, useEffect } from "react";
import { Save, Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const EditAlumniProfile = () => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ WorkExperiences: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = localStorage.getItem("id");
        const response = await axiosInstance.get(`/alumni/${userId}`);

        setUser(response.data);

        // Ensure WorkExperiences is always an array
        setUpdatedUser({
          ...response.data,
          WorkExperiences: Array.isArray(response.data.WorkExperiences)
            ? response.data.WorkExperiences
            : [],
        });

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExp = [...updatedUser.WorkExperiences];
    newWorkExp[index][field] = value;
    setUpdatedUser({ ...updatedUser, WorkExperiences: newWorkExp });
  };

  const handleAddWorkExperience = () => {
    setUpdatedUser({
      ...updatedUser,
      WorkExperiences: [
        ...updatedUser.WorkExperiences,
        { companyName: "", role: "", yearsOfExperience: "" },
      ],
    });
  };

  const handleDeleteWorkExperience = async (expId ,index) => {
    try {

      if (!expId) {
        // If the experience doesn't have an ID, it's newly added, so remove it directly
        setUpdatedUser((prev) => ({
          ...prev,
          WorkExperiences: prev.WorkExperiences.filter((_, i) => i !== index),
        }));
        return;
      }

      const alumniId = localStorage.getItem("id");
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Unauthorized! Please log in again.");
        navigate("/login");
        return;
      }
  
      await axiosInstance.delete(`/alumni/experience/${alumniId}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { deleteWorkExperienceIds :  [expId] }, // Sending expId in the request body
      });
  
      setUpdatedUser((prev) => ({
        ...prev,
        WorkExperiences: prev.WorkExperiences.filter((exp) => exp.id !== expId),
      }));
  
      alert("Work Experience deleted successfully!");
    } catch (error) {
      console.error("Error deleting work experience:", error);
      alert("Failed to delete work experience.");
    }
  };
  

const handleSave = async () => {
  try {
    const alumniId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized! Please log in again.");
      navigate("/login");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    
    const newWorkExperiences = updatedUser.WorkExperiences.filter(exp => !exp.id);
    const existingWorkExperiences = updatedUser.WorkExperiences.filter(exp => exp.id);

    // Update general profile data (excluding WorkExperiences)
    const { WorkExperiences, ...profileData } = updatedUser;
    await axiosInstance.put(`/alumni/edit/${alumniId}`,{ ...profileData, WorkExperiences: newWorkExperiences } );

    // Update work experiences one by one
    for (const workExp of existingWorkExperiences) {
      const { id, companyName, role, yearsOfExperience } = workExp;

      if (id) {
        // Update existing work experience
        await axiosInstance.put(
          `/alumni/${alumniId}/experience/${id}`,
          { companyName, role, yearsOfExperience },
          { headers }
        );
      }
      
    }

    setUser(updatedUser);
    alert("Profile Updated Successfully");

  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="mt-6 bg-white p-6 shadow-md rounded-lg w-full">
        <h2 className="text-2xl fixed-top font-semibold mb-4 border-b-2 pb-2">
          Edit Alumni Profile
        </h2>
        {user ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
              <div>
                <strong>Name: </strong>
                <input
                  type="text"
                  name="name"
                  value={updatedUser.name}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <div>
                <strong>Email: </strong>
                <input
                  type="text"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <div>
                <strong>Bio: </strong>
                <input
                  type="text"
                  name="bio"
                  value={updatedUser.bio}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <div>
                <strong>College ID: </strong>
                <input
                  type="text"
                  name="collegeid"
                  value={updatedUser.collegeid}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
              <div>
                <label className="block font-medium">Branch:</label>
                <select name="branch" value={updatedUser.branch} onChange={handleChange} className="w-full border p-3 rounded-md" required>
                  <option value="comp">Computer Engineering</option>
                  <option value="it">Information Technology</option>
                  <option value="aids">AI & Data Science</option>
                  <option value="entc">Electronics & Telecommunication</option>
                  <option value="ece">Electronics & Computer Engineering</option>
                </select>
             </div>
              <div>
                <strong>Graduation Year: </strong>
                <input
                  type="text"
                  name="graduateCollegeYear"
                  value={updatedUser.graduateCollegeYear}
                  onChange={handleChange}
                  className="ml-2 border p-1 w-full"
                />
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-3 border-b-2 pb-1">
                Work Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {updatedUser.WorkExperiences.map((work, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-300 rounded-lg relative"
                  >
                    <div>
                      <strong>Company:</strong>
                      <input
                        type="text"
                        value={work.companyName}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "companyName",
                            e.target.value
                          )
                        }
                        className="ml-2 border p-1 w-full"
                      />
                    </div>
                    <div>
                      <strong>Role:</strong>
                      <input
                        type="text"
                        value={work.role}
                        onChange={(e) =>
                          handleWorkExperienceChange(index, "role", e.target.value)
                        }
                        className="ml-2 border p-1 w-full"
                      />
                    </div>
                    <div>
                      <strong>Years of Experience:</strong>
                      <input
                        type="text"
                        value={work.yearsOfExperience}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "yearsOfExperience",
                            e.target.value
                          )
                        }
                        className="ml-2 border p-1 w-full"
                      />
                    </div>
                    
                      <button
                      onClick={() => handleDeleteWorkExperience(work.id ,index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md"
                    >
                      <Trash size={16} />
                    </button>
                  
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddWorkExperience}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
              >
                <Plus className="mr-2" /> Add More Work Experience
              </button>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default EditAlumniProfile;




