import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserCog,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    emailid: "",
    place: "",
    age: "",
    interests: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/auth/profile/${sessionStorage.getItem(
            "userid"
          )}`
        );
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userId", sessionStorage.getItem("userid"));

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/upload-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile((prev) => ({ ...prev, profileImage: response.data.imageUrl }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] to-[#FFE4BC]">
      <Navbar />

      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b mt-16">
        {" "}
        {/* Added mt-16 for navbar spacing */}
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F0C987] flex items-center justify-center">
                <FaUsers className="text-2xl text-gray-800" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{profile.interests}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/study/list")}
                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Sessions
              </button>
              <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-700 font-medium">Live Session</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            {/* Profile Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img
                  src={
                    profile.profileImage || "https://via.placeholder.com/150"
                  }
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <label className="absolute bottom-0 right-0 bg-gray-800 rounded-full p-2 cursor-pointer hover:bg-gray-700 transition-colors">
                  <FaUserCog className="text-black" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                {profile.name}
              </h1>
              <p className="text-gray-600">{profile.interests}</p>
            </div>

            {/* Profile Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaUser className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-800">{profile.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-800">{profile.emailid}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-800">{profile.place}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaUser className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Age</p>
                    <p className="text-gray-800">{profile.age}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
