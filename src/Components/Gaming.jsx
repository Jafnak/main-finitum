import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaPlus,
  FaUsers,
  FaComments,
  FaSearch,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Gaming = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/session/sessions"
        );
        const gamingSessions = response.data.filter(
          (session) => session.type === "Gaming"
        );
        setSessions(gamingSessions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sessions:", err);
        toast.error("Failed to fetch gaming sessions");
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const features = [
    {
      icon: <FaGamepad className="text-3xl" />,
      title: "Simple Games",
      description: "Play fun and engaging mini-games with other users",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Multiplayer",
      description: "Connect and compete with players worldwide",
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: "Live Updates",
      description: "Experience real-time gameplay updates",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Game Time!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our gaming community and enjoy Tic Tac Toe with players
              around the world.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/session")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <FaPlus className="text-xl" />
                <span className="font-semibold">Create Game Room</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/gaming/list")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <FaSearch className="text-xl" />
                <span className="font-semibold">Find Game Rooms</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Active Game Rooms */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Active Game Rooms
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : sessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <motion.div
                  key={session._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <FaGamepad className="text-2xl text-gray-600" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {session.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Created by: {session.createdBy}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">
                      Duration: {session.duration} minutes
                    </p>
                    <p className="text-gray-600">
                      Ends at: {new Date(session.endTime).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => navigate(`/session/${session._id}/game`)}
                    className="w-full py-2 bg-[#F0C987] text-gray-800 rounded-lg hover:bg-[#e0b977] transition-colors font-semibold"
                  >
                    Join Room
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              No active game rooms found. Create one to start playing!
            </div>
          )}
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="text-gray-700">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            More Games Coming Soon!
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re working on bringing you more exciting multiplayer games.
            Stay tuned!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Gaming;
