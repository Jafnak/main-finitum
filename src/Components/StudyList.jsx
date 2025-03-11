import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaClock, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudyList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/session/sessions"
        );
        // Filter only study group sessions
        const studySessions = response.data.filter(
          (session) => session.type === "Study Group"
        );
        setSessions(studySessions);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch sessions: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ backgroundColor: "#FFF8E7" }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Study Sessions
        </h1>
        <p className="text-xl text-gray-600">
          Find and join active study groups
        </p>
      </motion.div>

      {/* Filters Section */}
      <div className="container mx-auto mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">
              All Sessions
            </button>
            <button className="px-4 py-2 rounded-full bg-green-100 hover:bg-green-200 text-green-800 font-medium">
              Active Only
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium">
              Latest First
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {session.name}
                  </h3>
                  {session.isActive ? (
                    <span className="flex items-center text-green-500">
                      <FaCheckCircle className="mr-1" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center text-red-500">
                      <FaTimesCircle className="mr-1" /> Inactive
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaClock className="mr-2" />
                    <span>Duration: {session.duration} minutes</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaUsers className="mr-2" />
                    <span>Created by: {session.createdBy}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/session/${session._id}`)}
                  className="w-full mt-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                  style={{ backgroundColor: "#F0C987" }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {sessions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">No study sessions found</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/session")}
              className="mt-4 px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
            >
              Create a Study Session
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudyList;
