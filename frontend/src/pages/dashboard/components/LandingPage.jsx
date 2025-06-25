
import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Background Section */}
    <div
      className="min-h-screen bg-cover bg-center flex flex-col z-0"
      style={{
        backgroundImage: "url('https://pict.edu/images/slider/home1/College%20Photo%2023%20Feb%202023.jpg')",
      }}
    >

        {/* Navbar */}
        <div className="flex justify-between items-center p-6 bg-black bg-opacity-60">
          <h1 className="text-white text-3xl font-bold">CampusEcho</h1>
          <div className="space-x-6">
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center bg-black bg-opacity-60 px-6">
          <h2 className="text-5xl font-extrabold text-white mb-4">
            Stay Connected. Always.
          </h2>
          <p className="text-xl text-gray-200 mb-6 max-w-xl">
            Explore the power of community—find opportunities, mentorships, and
            stories from fellow alumni.
          </p>
          <Link to="/login">
            <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-2xl text-lg shadow-lg transition-all">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white text-black p-10 md:p-16 text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg max-w-3xl mx-auto">
          CampusEcho is the bridge between college life and the world
          beyond. This platform allows students to connect with alumni for
          mentorship, opportunities, and inspiration. Whether you're seeking
          guidance or willing to give back to your community, this is your space
          to stay engaged and grow together.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;