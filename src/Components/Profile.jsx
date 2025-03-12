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
import { toast } from "react-toastify";

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
        const email = sessionStorage.getItem("useremail");
        if (!email) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/auth/user/${email}`
        );

        if (response.data) {
          setProfile(response.data);
          // Store profile image in session storage for navbar
          if (response.data.profileImage) {
            sessionStorage.setItem("profileImage", response.data.profileImage);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("email", sessionStorage.getItem("useremail"));

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

      if (response.data.imageUrl) {
        setProfile((prev) => ({
          ...prev,
          profileImage: response.data.imageUrl,
        }));
        sessionStorage.setItem("profileImage", response.data.imageUrl);
        toast.success("Profile image updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload profile image");
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <Navbar />
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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

      <div className="container mx-auto max-w-4xl pt-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={profile.profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <label className="absolute bottom-0 right-0 bg-[#F0C987] rounded-full p-2 cursor-pointer hover:bg-[#e0b977] transition-colors">
                <FaUserCog className="text-gray-800" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
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
    </div>
  );
};

export default Profile;
