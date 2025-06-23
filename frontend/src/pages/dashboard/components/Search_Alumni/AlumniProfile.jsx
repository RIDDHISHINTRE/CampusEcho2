
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const AlumniProfile = () => {
    const location = useLocation();
    const alumni = location.state?.alumni;
    const navigate = useNavigate();

    const [alumniDetails, setAlumniDetails] = useState(null);

    useEffect(() => {
        if (!alumni) return;

        const fetchAlumniDetails = async () => {
            try {
                const response = await axiosInstance.get(`/alumni-details/${alumni.id}`);
                setAlumniDetails(response.data);
            } catch (error) {
                console.error("Error fetching alumni details:", error);
            }
        };

        fetchAlumniDetails();
    }, [alumni]);

    if (!alumni) return <p className="text-center text-red-500">Error: No alumni data found.</p>;
    if (!alumniDetails) return <p className="text-center">Loading...</p>;

    const { alumni: details, messageOption, jobs } = alumniDetails;

    return (
        <div className="h-screen w-screen bg-gray-100">
            {/* Sticky Header */}
            <div className="sticky top-0 z-50 bg-white shadow-md border-b px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Name: {details.name}</h1>
                {messageOption === "Available" && (
                    <button
                        onClick={() => navigate(`/chat/${details.id}`)}
                        className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700"
                    >
                        Message
                    </button>
                )}
            </div>

            <div className="px-6 py-8">
                {/* Work Experience Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Work Experiences</h2>
                    {details.WorkExperiences?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {details.WorkExperiences.map((exp, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg border shadow">
                                    <p className="text-xl font-semibold text-blue-600">{exp.role}</p>
                                    <p className="text-gray-700">{exp.companyName}</p>
                                    <p className="text-gray-500">Experience: {exp.yearsOfExperience} years</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No work experience available.</p>
                    )}
                </div>

                {/* Job Opportunities Section */}
                <div className="bg-white p-6 rounded-lg shadow-md border">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Job Opportunities</h2>
                    {jobs?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jobs.map((job, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg border shadow">
                                    <h4 className="text-lg font-bold text-gray-900">{job.title}</h4>
                                    <p className="text-gray-700 mb-2">{job.description}</p>
                                    {job.applicationLink && (
                                        <a
                                            href={job.applicationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Apply here
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No job postings available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AlumniProfile;







