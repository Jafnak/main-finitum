import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaClock, FaUsers, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudyList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'active', or 'inactive'
  const navigate = useNavigate();

  // Function to check if a session is active
  const isSessionActive = (session) => {
    const now = new Date();
    const endTime = new Date(session.endTime);
    return now <= endTime;
  };

  // Function to sort sessions (active first, then by end time)
  const sortSessions = (sessions) => {
    return [...sessions].sort((a, b) => {
      const aActive = isSessionActive(a);
      const bActive = isSessionActive(b);

      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;

      // If both are active or both are inactive, sort by end time
      return new Date(a.endTime) - new Date(b.endTime);
    });
  };

  // Fetch sessions and update their status
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/session/sessions"
        );
        const studySessions = response.data.filter(
          (session) => session.type === "Study Group"
        );
        setSessions(sortSessions(studySessions));
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch sessions: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSessions();
    // Update session status every minute
    const intervalId = setInterval(fetchSessions, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Filter sessions based on status
  const filteredSessions = sessions.filter((session) => {
    const active = isSessionActive(session);
    if (filter === "active") return active;
    if (filter === "inactive") return !active;
    return true;
  });

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
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === "all"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              } font-medium`}
            >
              All Sessions
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 hover:bg-green-200 text-green-800"
              } font-medium`}
            >
              Active Only
            </button>
            <button
              onClick={() => setFilter("inactive")}
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === "inactive"
                  ? "bg-red-600 text-white"
                  : "bg-red-100 hover:bg-red-200 text-red-800"
              } font-medium`}
            >
              Inactive
            </button>
          </div>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map((session, index) => {
            const active = isSessionActive(session);
            const endTime = new Date(session.endTime);
            const timeLeft = active ? endTime - new Date() : 0;
            const minutesLeft = Math.floor(timeLeft / 60000);

            return (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                  !active ? "opacity-75" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {session.name}
                    </h3>
                    {active ? (
                      <span className="flex items-center text-green-500">
                        <FaCheckCircle className="mr-1" />
                        Active ({minutesLeft}m left)
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <FaTimesCircle className="mr-1" />
                        Inactive
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
                    <div className="text-sm text-gray-500">
                      Ends at: {endTime.toLocaleString()}
                    </div>
                  </div>

                  {active && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/session/${session._id}/chat`)}
                      className="w-full mt-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                      style={{ backgroundColor: "#F0C987" }}
                    >
                      Join Chat
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredSessions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">
              {filter === "active"
                ? "No active study sessions found"
                : filter === "inactive"
                ? "No inactive study sessions found"
                : "No study sessions found"}
            </p>
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
