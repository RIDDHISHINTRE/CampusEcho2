import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const LoginSignup = () => {
  const [islogin, setlogin] = useState(true);
  const [signupstate, setsignupstate] = useState("");
  const [role, setRole] = useState("student");
  const [loginError, setLoginError] = useState(""); // new error state
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [studentSignupData, setStudentSignupData] = useState({
    name: "", email: "", collegeid: "", branch: "", year: "", bio: "", collegeIdPhoto: ""
  });
  const [alumniSignupData, setAlumniSignupData] = useState({
    name: "", email: "", graduateCollegeYear: "", collegeid: "", branch: "", companyName: "", role: "", otherRole: "", bio: "", DegreePhoto: ""
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(""); // clear any old errors
    try {
      const endpoint = role === "student" ? "/student/login" : "/alumni/login";
      const response = await axiosInstance.post(endpoint, loginData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      if (response.data.isAdmin) {
        navigate("/admin-dashboard");
      } else if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/alumni-dashboard");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Login failed. Please try again.";
      setLoginError(msg);
      console.log("Login failed:", msg);
    }
  };

  const handleStudentSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/student/register", studentSignupData);
      setlogin(true);
    } catch (error) {
      console.log("Student Signup Failed:", error.response?.data || error.message);
    }
  };

  const handleAlumniSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/alumni/register", alumniSignupData);
      setlogin(true);
    } catch (error) {
      console.log("Alumni Signup Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg')",
      }}
    >
      {/* Left Info */}
      <div className="hidden md:flex w-1/2 bg-opacity-60 text-white items-center justify-center px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">CampusEcho</h2>
          <p className="text-lg leading-relaxed max-w-sm">
            A secure platform where students and alumni collaborate through
            verified accounts, real-time chats, and valuable mentorship.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-opacity-90 px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 sm:p-10 font-poppins">
          {/* Toggle Buttons */}
          <div className="flex justify-between mb-6 bg-gray-200 rounded-xl overflow-hidden">
            <button
              className={`w-1/2 py-3 font-bold transition-all duration-300 ${islogin ? "bg-[#0A5F91] text-white" : "text-black"}`}
              onClick={() => setlogin(true)}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-3 font-bold transition-all duration-300 ${!islogin ? "bg-[#0A5F91] text-white" : "text-black"}`}
              onClick={() => setlogin(false)}
            >
              Signup
            </button>
          </div>

          {/* Forms */}
          {islogin ? (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">Login</h2>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="p-3 border rounded-lg">
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
              <input type="email" placeholder="Email" required className="p-3 border rounded-lg bg-blue-50" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
              <input type="password" placeholder="Password" required className="p-3 border rounded-lg bg-blue-50" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />

              {/* Error Message */}
              {loginError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <button type="submit" className="p-3 bg-[#0A5F91] text-white rounded-lg hover:scale-105 transition">Login</button>
              <div className="flex justify-between gap-4 mt-4">
                <Link to="/forgot-password" className="text-blue-700 hover:text-blue-900 transition">
                  Forgot Password?
                </Link>
                <Link to="/" className="text-blue-700 hover:text-blue-900 transition">
                  Back to Home
                </Link>
              </div>
            </form>
          ) : signupstate === "" ? (
            <>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">Sign Up As</h2>
              <button className="w-full p-3 my-2 text-lg font-medium rounded bg-[#0A5F91] text-white hover:bg-[#033452]" onClick={() => setsignupstate("student")}>Student</button>
              <button className="w-full p-3 my-2 text-lg font-medium rounded bg-[#0A5F91] text-white hover:bg-[#033452]" onClick={() => setsignupstate("alumni")}>Alumni</button>
            </>
          ) : signupstate === "student" ? (
            <form className="flex flex-col gap-3" onSubmit={handleStudentSignup}>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">Student Signup</h2>
              <input type="text" placeholder="Name" required onChange={(e) => setStudentSignupData({ ...studentSignupData, name: e.target.value })} className="p-3 border rounded-lg" />
              <input type="email" placeholder="Email" required onChange={(e) => setStudentSignupData({ ...studentSignupData, email: e.target.value })} className="p-3 border rounded-lg" />
              <input type="text" placeholder="College ID" required onChange={(e) => setStudentSignupData({ ...studentSignupData, collegeid: e.target.value })} className="p-3 border rounded-lg" />
              <input type="url" placeholder="College ID Photo (Drive Link)" required onChange={(e) => setStudentSignupData({ ...studentSignupData, collegeIdPhoto: e.target.value })} className="p-3 border rounded-lg" />
              <select defaultValue="" required onChange={(e) => setStudentSignupData({ ...studentSignupData, branch: e.target.value })} className="p-3 border rounded-lg">
                <option value="" disabled>--Branch--</option>
                <option value="comp">Computer Engineering</option>
                <option value="it">Information Technology</option>
                <option value="aids">AI & Data Science</option>
                <option value="entc">Electronics and Telecom</option>
                <option value="ece">Electronics and Comp</option>
              </select>
              <select defaultValue="" required onChange={(e) => setStudentSignupData({ ...studentSignupData, year: e.target.value })} className="p-3 border rounded-lg">
                <option value="" disabled>Year</option>
                <option value="first">First year</option>
                <option value="second">Second year</option>
                <option value="third">Third year</option>
                <option value="fourth">Fourth year</option>
              </select>
              <button type="submit" className="p-3 bg-[#0A5F91] text-white rounded-lg hover:scale-105 transition">Sign Up</button>
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleAlumniSignup}>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">Alumni Signup</h2>
              <input type="text" placeholder="Name" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, name: e.target.value })} className="p-3 border rounded-lg" />
              <input type="email" placeholder="Email" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, email: e.target.value })} className="p-3 border rounded-lg" />
              <input type="text" placeholder="Graduate Year" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, graduateCollegeYear: e.target.value })} className="p-3 border rounded-lg" />
              <input type="text" placeholder="College ID" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, collegeid: e.target.value })} className="p-3 border rounded-lg" />
              <input type="url" placeholder="Degree Certificate (Drive Link)" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, DegreePhoto: e.target.value })} className="p-3 border rounded-lg" />
              <select defaultValue="" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, branch: e.target.value })} className="p-3 border rounded-lg">
                <option value="" disabled>--Branch--</option>
                <option value="comp">Computer Engineering</option>
                <option value="it">Information Technology</option>
                <option value="aids">AI & Data Science</option>
                <option value="entc">Electronics and Telecom</option>
                <option value="ece">Electronics and Comp</option>
              </select>
              <button type="submit" className="p-3 bg-[#0A5F91] text-white rounded-lg hover:scale-105 transition">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;



