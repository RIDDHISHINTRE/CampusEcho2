import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const LoginSignup = () => {
  const [islogin, setlogin] = useState(true);
  const [signupstate, setsignupstate] = useState("");
  const [role, setRole] = useState("student");
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [studentSignupData, setStudentSignupData] = useState({
    name: "",
    email: "",
    collegeid: "",
    branch: "",
    year: "",
    collegeIdPhoto: "",
    password: "",
    confirmPassword: "",
  });
  const [alumniSignupData, setAlumniSignupData] = useState({
    name: "",
    email: "",
    graduateCollegeYear: "",
    collegeid: "",
    branch: "",
    DegreePhoto: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);
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
      const msg = error?.response?.data?.error || "Login failed. Please try again.";
      setLoginError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Student Signup
  const handleStudentSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (studentSignupData.password !== studentSignupData.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post("/student/register", {
        name: studentSignupData.name,
        email: studentSignupData.email,
        collegeid: studentSignupData.collegeid,
        branch: studentSignupData.branch,
        year: studentSignupData.year,
        collegeIdPhoto: studentSignupData.collegeIdPhoto,
        password: studentSignupData.password,
      });
      alert("Student registered successfully! You can now login.");
      setlogin(true);
      setsignupstate("");
    } catch (error) {
      setSignupError(error.response?.data?.error || "Signup failed. Try again.");
    }
  };

  // ✅ Alumni Signup
  const handleAlumniSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    if (alumniSignupData.password !== alumniSignupData.confirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post("/alumni/register", {
        name: alumniSignupData.name,
        email: alumniSignupData.email,
        graduateCollegeYear: alumniSignupData.graduateCollegeYear,
        collegeid: alumniSignupData.collegeid,
        branch: alumniSignupData.branch,
        DegreePhoto: alumniSignupData.DegreePhoto,
        password: alumniSignupData.password,
      });
      alert("Alumni registered successfully! You can now login.");
      setlogin(true);
      setsignupstate("");
    } catch (error) {
      setSignupError(error.response?.data?.error || "Signup failed. Try again.");
    }
  };

  return (
    <div
      className="flex h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/flat-lay-workstation-with-copy-space-laptop_23-2148430879.jpg')",
      }}
    >
      <div className="hidden md:flex w-1/2 bg-opacity-60 text-white items-center justify-center px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">CampusEcho</h2>
          <p className="text-lg leading-relaxed max-w-sm">
            A secure platform where students and alumni collaborate through
            verified accounts, real-time chats, and valuable mentorship.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-opacity-90 px-4">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 sm:p-10 font-poppins">
          {/* Toggle Buttons */}
          <div className="flex justify-between mb-6 bg-gray-200 rounded-xl overflow-hidden">
            <button
              className={`w-1/2 py-3 font-bold transition-all duration-300 ${
                islogin ? "bg-[#0A5F91] text-white" : "text-black"
              }`}
              onClick={() => {
                setlogin(true);
                setsignupstate("");
              }}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-3 font-bold transition-all duration-300 ${
                !islogin ? "bg-[#0A5F91] text-white" : "text-black"
              }`}
              onClick={() => setlogin(false)}
            >
              Signup
            </button>
          </div>

          {/* ✅ Login Form */}
          {islogin ? (
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">Login</h2>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-3 border rounded-lg"
              >
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
              </select>
              <input
                type="email"
                placeholder="Email"
                required
                className="p-3 border rounded-lg bg-blue-50"
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
              <input
                type="password"
                placeholder="Password"
                required
                className="p-3 border rounded-lg bg-blue-50"
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              {loading && (
                <div className="text-blue-700 text-sm flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-blue-700"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    />
                  </svg>
                  Logging in...
                </div>
              )}

              {loginError && !loading && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="p-3 bg-[#0A5F91] text-white rounded-lg hover:scale-105 transition"
              >
                Login
              </button>
              <div className="flex justify-between gap-4 mt-4">
                <Link
                  to="/forgot-password"
                  className="text-blue-700 hover:text-blue-900 transition"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/"
                  className="text-blue-700 hover:text-blue-900 transition"
                >
                  Back to Home
                </Link>
              </div>
            </form>
          ) : signupstate === "" ? (
            <>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">
                Sign Up As
              </h2>
              <button
                className="w-full p-3 my-2 text-lg font-medium rounded bg-[#0A5F91] text-white hover:bg-[#033452]"
                onClick={() => setsignupstate("student")}
              >
                Student
              </button>
              <button
                className="w-full p-3 my-2 text-lg font-medium rounded bg-[#0A5F91] text-white hover:bg-[#033452]"
                onClick={() => setsignupstate("alumni")}
              >
                Alumni
              </button>
            </>
          ) : signupstate === "student" ? (
            // ✅ Student Signup
            <form className="flex flex-col gap-3" onSubmit={handleStudentSignup}>
              <h2 className="text-2xl font-semibold text-[#033452] mb-4">
                Student Signup
              </h2>
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
              <input type="password" placeholder="Password" required onChange={(e) => setStudentSignupData({ ...studentSignupData, password: e.target.value })} className="p-3 border rounded-lg" />
              <input type="password" placeholder="Confirm Password" required onChange={(e) => setStudentSignupData({ ...studentSignupData, confirmPassword: e.target.value })} className="p-3 border rounded-lg" />

              {signupError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">{signupError}</div>}

              <button type="submit" className="p-3 bg-[#0A5F91] text-white rounded-lg hover:scale-105 transition">Sign Up</button>
            </form>
          ) : (
            // ✅ Alumni Signup
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
              <input type="password" placeholder="Password" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, password: e.target.value })} className="p-3 border rounded-lg" />
              <input type="password" placeholder="Confirm Password" required onChange={(e) => setAlumniSignupData({ ...alumniSignupData, confirmPassword: e.target.value })} className="p-3 border rounded-lg" />

              {signupError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm">{signupError}</div>}

              <button type="submit" className="p-3 bg-[#0A5F91] text-white rounded-lg hover:scale-105 transition">Sign Up</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
