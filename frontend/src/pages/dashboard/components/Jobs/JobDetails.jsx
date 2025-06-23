// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axiosInstance from "../../../utils/axiosInstance";

// // const JobDetails = () => {
// //   const { jobId } = useParams(); 
// //   const [job, setJob] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     axiosInstance
// //       .get(`/jobs/${jobId}`)
// //       .then((response) => setJob(response.data))
// //       .catch((error) => {
// //         console.error("Error fetching job:", error);
// //         setError("Failed to load job details.");
// //       });
// //   }, [jobId]);

// //   if (error) return <p className="text-red-500 text-center">{error}</p>;
// //   if (!job) return <p className="text-center text-gray-500">Loading job details...</p>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
// //       <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
// //       <p className="text-gray-600">{job.location}</p>
// //       <p className="mt-4 text-gray-700">{job.description}</p>
// //       <p className="mt-2 font-semibold text-gray-800">Eligibility:</p>
// //       <p className="text-gray-700">{job.eligibility}</p>
// //       <p className="mt-2 text-sm text-gray-500">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
// //       <a
// //         href={job.applicationLink}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
// //       >
// //         Apply Now
// //       </a>
// //     </div>
// //   );
// // };

// // export default JobDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";

// const JobDetails = () => {
//   const { jobId } = useParams(); 
//   const [job, setJob] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axiosInstance
//       .get(`/jobs/${jobId}`)
//       .then((response) => setJob(response.data))
//       .catch((error) => {
//         console.error("Error fetching job:", error);
//         setError("Failed to load job details. Please try again later.");
//       });
//   }, [jobId]);

//   if (error) 
//     return <p className="text-red-600 text-center font-medium">{error}</p>;
//   if (!job) 
//     return <p className="text-center text-gray-500">Loading job details...</p>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h2>
//         <p className="text-lg text-gray-600 font-medium">📍 {job.location}</p>
        
//         <div className="mt-6 border-t border-gray-300 pt-4">
//           <p className="text-gray-700 leading-relaxed">{job.description}</p>
//         </div>

//         <div className="mt-4">
//           <p className="font-semibold text-gray-800">🎓 Eligibility:</p>
//           <p className="text-gray-700">{job.eligibility}</p>
//         </div>

//         <p className="mt-2 text-sm text-gray-500 font-medium">⏳ Application Deadline: {new Date(job.deadline).toLocaleDateString()}</p>

//         <div className="mt-6 flex justify-center">
//           <a
//             href={job.applicationLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition"
//           >
//             Apply Now
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../../../utils/axiosInstance";

// const JobDetails = () => {
//   const { jobId } = useParams();
//   const [job, setJob] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axiosInstance
//       .get(`/jobs/${jobId}`)
//       .then((response) => setJob(response.data))
//       .catch(() => setError("Failed to load job details."));
//   }, [jobId]);

//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!job) return <p className="text-center text-gray-500">Loading job details...</p>;

//   return (

//       <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg border border-gray-200">
//         {/* Job Title */}
//         <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h2>

//         {/* Location */}
//         <p className="text-lg font-medium text-gray-600 flex items-center gap-2">
//           📍 {job.location}
//         </p>

//         <hr className="my-4 border-gray-300" />

//         {/* Job Description */}
//         <p className="text-gray-700 text-lg">{job.description}</p>

//         {/* Eligibility Section */}
//         <div className="mt-4">
//           <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//             🎓 Eligibility:
//           </p>
//           <p className="text-gray-700">{job.eligibility}</p>
//         </div>

//         {/* Application Deadline */}
//         <p className="mt-4 text-gray-600 flex items-center gap-2">
//           ⏳ Application Deadline:{" "}
//           <span className="font-semibold">{new Date(job.deadline).toLocaleDateString()}</span>
//         </p>

//         {/* Apply Button */}
//         <a
//           href={job.applicationLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300"
//         >
//           Apply Now
//         </a>
//       </div>
    
//   );
// };

// export default JobDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import {
  MapPin,
  FileText,
  GraduationCap,
  CalendarClock,
  BadgeInfo,
} from "lucide-react";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/jobs/${jobId}`)
      .then((response) => setJob(response.data))
      .catch(() => setError("Failed to load job details."));
  }, [jobId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!job) return <p className="text-center text-gray-500">Loading job details...</p>;

  return (
    <div className="h-screen w-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg border border-gray-300 space-y-6">

        {/* Job Title */}
        <div className="bg-gray-50 p-4 rounded-md border shadow flex items-center gap-3">
          <BadgeInfo className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
        </div>

        {/* Job Location */}
        <div className="bg-gray-50 p-4 rounded-md border shadow flex items-center gap-3">
          <MapPin className="text-blue-600 w-6 h-6" />
          <p className="text-lg font-medium text-gray-700">
            Location: <span className="font-semibold text-gray-900">{job.location}</span>
          </p>
        </div>

        {/* Job Description */}
        <div className="bg-gray-50 p-6 min-h-[200px] rounded-md border shadow">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="text-blue-600 w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800">Job Description</h3>
          </div>
          <p className="text-gray-700 text-base">{job.description}</p>
        </div>

        {/* Eligibility and Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eligibility */}
          <div className="bg-gray-50 p-4 rounded-md border shadow">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="text-blue-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Eligibility</h3>
            </div>
            <p className="text-gray-700">{job.eligibility}</p>
          </div>

          {/* Deadline */}
          <div className="bg-gray-50 p-4 rounded-md border shadow">
            <div className="flex items-center gap-3 mb-2">
              <CalendarClock className="text-blue-600 w-6 h-6" />
              <h3 className="text-lg font-semibold text-gray-800">Job Deadline</h3>
            </div>
            <p className="text-gray-700">{new Date(job.deadline).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Apply Button */}
        <a
          href={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 rounded-md transition-all duration-300"
        >
          Apply
        </a>
      </div>
    </div>
  );
};

export default JobDetails;