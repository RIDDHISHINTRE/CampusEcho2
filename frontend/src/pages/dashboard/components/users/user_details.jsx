

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import axiosInstance from "../../../../utils/axiosInstance";

// const UserDetails = () => {
//   const { userId } = useParams();
//   const { state } = useLocation();
//   const userType = state?.userType; // ✅ Get userType from navigation state
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userType) {
//       fetchUserDetails();
//     }
//   }, [userType]);

//   const fetchUserDetails = async () => {
//     try {
//       const endpoint = userType === "alumni" ? `/alumni/${userId}` : `/student/${userId}`;
//       const response = await axiosInstance.get(endpoint);
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const handleVerifyUser = async () => {
//     setLoading(true);
//     try {
//       await axiosInstance.post(
//         "/verify-user",
//         { userId, userType },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       alert("User Verified Successfully!");
//       navigate("/unverified-users");
//     } catch (error) {
//       console.error("Error verifying user:", error);
//       alert("Verification Failed!");
//     }
//     setLoading(false);
//   };

//   const handleUnverifyUser = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this user?");
//     if (!confirmDelete) return;

//     setDeleting(true);
//     try {
//       await axiosInstance.delete("/unverify-user", {
//         data: { userId, userType },
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("User deleted successfully!");
//       navigate("/unverified-users");
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       alert("Failed to delete user!");
//     }
//     setDeleting(false);
//   };

//   if (!user) return <p>Loading user details...</p>;

//   return (
//     <div className="h-screen w-screen bg-gray-100 flex flex-col items-center p-8">
//       <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md border border-gray-300">
//         <h2 className="text-3xl font-semibold mb-4">User Details</h2>

//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>College ID:</strong> {user.collegeid}</p>
//         <p><strong>Branch:</strong> {user.branch.toUpperCase()}</p>
//         <p><strong>Bio:</strong> {user.bio || "No bio available"}</p>

//         {userType === "alumni" ? (
//           <div>
//             <p><strong>Graduation Year:</strong> {user.graduateCollegeYear}</p>
//             <p>
//               <strong>Degree:</strong>{" "}
//               {user.DegreePhoto ? (
//                 <a
//                   href={user.DegreePhoto}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   View Degree Image
//                 </a>
//               ) : (
//                 "No Image available"
//               )}
//             </p>
//           </div>
//         ) : (
//           <div>
//             <p>
//               <strong>College ID Photo:</strong>{" "}
//               {user.collegeIdPhoto ? (
//                 <a
//                   href={user.collegeIdPhoto}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 underline"
//                 >
//                   View Photo
//                 </a>
//               ) : (
//                 "No photo available"
//               )}
//             </p>
//             <p><strong>Year:</strong> {user.year}</p>
//           </div>
//         )}

//         <div className="mt-6 flex space-x-4">
//           {!user.isVerified && (
//             <button
//               onClick={handleVerifyUser}
//               disabled={loading}
//               className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//             >
//               {loading ? "Verifying..." : "Verify User"}
//             </button>
//           )}

//           <button
//             onClick={handleUnverifyUser}
//             disabled={deleting}
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//           >
//             {deleting ? "Deleting..." : "Unverify (Delete) User"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { BadgeInfo, FileText, UserCheck, UserX } from "lucide-react";

const UserDetails = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const userType = state?.userType;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType) fetchUserDetails();
  }, [userType]);

  const fetchUserDetails = async () => {
    try {
      const endpoint = userType === "alumni" ? `/alumni/${userId}` : `/student/${userId}`;
      const response = await axiosInstance.get(endpoint);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleVerifyUser = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(
        "/verify-user",
        { userId, userType },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("User Verified Successfully!");
      navigate("/unverified-users");
    } catch (error) {
      console.log("Error verifying user:", error);
      alert("Verification Failed!");
    }
    setLoading(false);
  };

  const handleUnverifyUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await axiosInstance.delete("/unverify-user", {
        data: { userId, userType },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("User deleted successfully!");
      navigate("/unverified-users");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
    }
    setDeleting(false);
  };

  if (!user)
    return <p className="text-center text-gray-500 mt-20">Loading user details...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-md border border-gray-200 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3 border-b pb-4">
          <BadgeInfo className="text-blue-600 w-6 h-6" />
          <h2 className="text-3xl font-bold text-gray-800">User Details</h2>
        </div>

        {/* User Info Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">

          {/* Block 1: Name + Email */}
         {/* Name Block */}
        <div className="bg-gray-50 p-4 rounded-md border shadow">
          <p><strong>Name:</strong> {user.name}</p>
        </div>

        {/* Email Block */}
        <div className="bg-gray-50 p-4 rounded-md border shadow">
          <p><strong>Email:</strong> {user.email}</p>
        </div>


        {/* Branch takes full width */}
        <div className="bg-gray-50 p-4 rounded-md border shadow col-span-full">
            <p><strong>Branch:</strong> {user.branch?.toUpperCase()}</p>
        </div>

          <div className="bg-gray-50 p-4 rounded-md border shadow col-span-full">
            <p><strong>College ID:</strong> {user.collegeid}</p>
          </div>

          {/* Block 3: Bio */}
          <div className="bg-gray-50 p-4 rounded-md border shadow col-span-full">
            <p><strong>Bio:</strong> {user.bio || "No bio available"}</p>
          </div>

          {/* Block 4 & 5: Conditionally rendered based on userType */}
          {userType === "alumni" ? (
            <>
              {/* Block 4: Graduation Year */}
              <div className="bg-gray-50 p-4 rounded-md border shadow">
                <p><strong>Graduation Year:</strong> {user.graduateCollegeYear}</p>
              </div>

              {/* Block 5: Degree Image */}
              <div className="bg-gray-50 p-4 rounded-md border shadow">
                <p><strong>Degree Certificate:</strong>{" "}
                  {user.DegreePhoto ? (
                    <a
                      href={user.DegreePhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Image
                    </a>
                  ) : "No Image available"}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Block 4: College ID Photo */}
              <div className="bg-gray-50 p-4 rounded-md border shadow">
                <p><strong>College ID Photo:</strong>{" "}
                  {user.collegeIdPhoto ? (
                    <a
                      href={user.collegeIdPhoto}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Photo
                    </a>
                  ) : "No photo available"}
                </p>
              </div>

              {/* Block 5: Year */}
              <div className="bg-gray-50 p-4 rounded-md border shadow">
                <p><strong>Year:</strong> {user.year}</p>
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t">
          {!user.isVerified && (
            <button
              onClick={handleVerifyUser}
              disabled={loading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
            >
              <UserCheck className="w-5 h-5" />
              {loading ? "Verifying..." : "Verify User"}
            </button>
          )}
          <button
            onClick={handleUnverifyUser}
            disabled={deleting}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
          >
            <UserX className="w-5 h-5" />
            {deleting ? "Deleting..." : "Unverify (Delete) User"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;


