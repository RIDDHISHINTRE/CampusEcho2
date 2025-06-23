import { useNavigate } from "react-router-dom";

const AlumniCard = ({ alumnus }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">{alumnus.Alumni.name}</h2>
      <p>{alumnus.role} at {alumnus.companyName}</p>
      <p>Experience: {alumnus.yearsOfExperience} years</p>
      <button 
        onClick={() => navigate(`/alumni/${alumnus.Alumni.id}`)} 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Profile
      </button>
    </div>
  );
};

export default AlumniCard;