import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const ShowAlumni = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await axiosInstance.get(`/alumni/${id}`);
        setAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni", error);
      }
    };
    fetchAlumni();
  }, [id]);

  if (!alumni) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{alumni.name}</h1>
      <p>{alumni.bio}</p>
      <h2 className="text-2xl mt-4">Work Experience</h2>
      {alumni.WorkExperiences.map((exp) => (
        <div key={exp.id} className="mt-2">
          <p>{exp.role} at {exp.companyName}</p>
          <p>Years: {exp.yearsOfExperience}</p>
        </div>
      ))}
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Message</button>
    </div>
  );
};

export default ShowAlumni;