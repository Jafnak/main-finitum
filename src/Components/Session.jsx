import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Session = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    friendEmail: "",
    duration: "",
    createdBy:
      sessionStorage.getItem("useremail") || sessionStorage.getItem("userid"), // Get logged in user's email
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create the session
      const response = await axios.post(
        "http://localhost:8080/session/sessions",
        formData
      );

      console.log("Session Created:", response.data);
      alert("Session Created Successfully!");

      // Redirect to the single session page using the returned sessionId
      navigate(`/session/${response.data.sessionId}`);
    } catch (error) {
      console.error("Error creating session:", error);
      alert("Error creating session. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        backgroundColor: "#FFF8E7", // Cream background matching login page
      }}
    >
      {/* Glassmorphism Card */}
      <Navbar />
      <div className="relative z-10 px-12 py-10 bg-white max-w-[450px] shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-left text-gray-700 mb-2">
          FINITUM
        </h2>
        <p className="text-lg text-left text-gray-500 mb-6">
          Create a New Session
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter group name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Session Type</option>
            <option value="Study Group">Study Group</option>
            <option value="Gaming">Gaming</option>
            <option value="Health & Fitness">Health & Fitness</option>
          </select>

          <input
            type="number"
            name="duration"
            placeholder="Duration (minutes)"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="friendEmail"
            placeholder="Enter friend's email"
            value={formData.friendEmail}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
            style={{ backgroundColor: "#F0C987" }}
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default Session;
