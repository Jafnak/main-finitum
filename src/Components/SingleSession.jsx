import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { FaClock, FaUser, FaTag, FaEnvelope } from "react-icons/fa";

const SingleSession = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/session/sessions/${sessionId}`
        );
        setSession(response.data);
        // Calculate initial time left
        const endTime = new Date(response.data.endTime);
        const now = new Date();
        const remaining = Math.max(0, endTime - now);
        setTimeLeft(remaining);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load session: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  // Countdown timer effect
  useEffect(() => {
    if (!timeLeft) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (ms) => {
    if (!ms) return "Session Ended";

    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <Navbar />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <Navbar />
        <div className="bg-red-100 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <Navbar />
        <div className="bg-yellow-100 text-yellow-600 p-4 rounded-lg">
          Session not found
        </div>
      </div>
    );
  }

  const handleJoinSession = () => {
    if (session.type === "Gaming") {
      navigate(`/session/${sessionId}/game`);
    } else if (session.type === "Study Group") {
      navigate("/study/list");
    } else if (session.type === "Health & Fitness") {
      navigate(`/session/${sessionId}/fitness`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Session Header */}
          <div className="p-8 bg-gradient-to-r from-[#F0C987] to-[#f8e2c0]">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {session.name}
            </h1>
            <p className="text-gray-600">Session Details</p>
          </div>

          {/* Session Details */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FaTag className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Session Type</p>
                  <p className="text-gray-800 font-medium">{session.type}</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FaClock className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Time Remaining</p>
                  <p
                    className={`text-gray-800 font-medium ${
                      timeLeft <= 0 ? "text-red-500" : ""
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FaUser className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Created By</p>
                  <p className="text-gray-800 font-medium">
                    {session.createdBy}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FaEnvelope className="text-xl text-gray-600" />
                <div>
                  <p className="text-sm text-gray-500">Friend&quot;s Email</p>
                  <p className="text-gray-800 font-medium">
                    {session.friendEmail}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Join Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleJoinSession}
              disabled={timeLeft <= 0}
              className={`w-full py-4 mt-6 rounded-lg font-semibold transition-colors ${
                timeLeft <= 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#F0C987] hover:bg-[#e0b977]"
              }`}
            >
              {timeLeft <= 0 ? "Session Ended" : "Join Session"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SingleSession;
