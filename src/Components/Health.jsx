import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaDumbbell, FaUsers, FaPlus, FaSearch } from "react-icons/fa";
import Navbar from "./Navbar";

const Health = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16 px-4"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Health & Fitness Groups
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join fitness sessions, share workout tips, and achieve your health
          goals together!
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Create Group Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-[#F0C987] rounded-full flex items-center justify-center mb-6">
                <FaPlus className="text-2xl text-gray-800" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Create a Fitness Group
              </h2>
              <p className="text-gray-600 mb-6">
                Start a new fitness session, set workout goals, and invite
                friends to join your fitness journey.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/session")}
                className="w-full py-3 bg-[#F0C987] text-gray-800 font-semibold rounded-lg shadow-md hover:bg-[#e0b977] transition-colors"
              >
                Create Group
              </motion.button>
            </div>
          </motion.div>

          {/* Find Group Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-8">
              <div className="w-16 h-16 bg-[#F0C987] rounded-full flex items-center justify-center mb-6">
                <FaSearch className="text-2xl text-gray-800" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Find a Fitness Group
              </h2>
              <p className="text-gray-600 mb-6">
                Join existing fitness sessions, connect with workout buddies,
                and participate in group challenges.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/health/list")}
                className="w-full py-3 bg-[#F0C987] text-gray-800 font-semibold rounded-lg shadow-md hover:bg-[#e0b977] transition-colors"
              >
                Find Group
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaDumbbell className="text-2xl text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Group Workouts
            </h3>
            <p className="text-gray-600">
              Join live workout sessions and stay motivated with your fitness
              group
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaUsers className="text-2xl text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Community Support
            </h3>
            <p className="text-gray-600">
              Share tips, track progress, and encourage each other
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaDumbbell className="text-2xl text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Fitness Challenges
            </h3>
            <p className="text-gray-600">
              Participate in group challenges and achieve goals together
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Health;
