import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGamepad,
  FaPlus,
  FaSearch,
  FaUsers,
  FaClock,
  FaComments,
} from "react-icons/fa";
import Navbar from "./Navbar";

const Gaming = () => {
  const navigate = useNavigate();

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
      icon: <FaClock className="text-3xl" />,
      title: "Live Updates",
      description: "Experience real-time gameplay updates",
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: "Chat Features",
      description: "Communicate with other players during games",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16">
          <Navbar />
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
              Join our gaming community and enjoy multiplayer games with players
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

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* Available Games Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Available Games
          </h2>
          <p className="text-gray-600">
            Choose from our selection of multiplayer games
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Tic Tac Toe", "Coming Soon", "Coming Soon", "Coming Soon"].map(
            (game, index) => (
              <motion.div
                key={game}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800">{game}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {game === "Tic Tac Toe" ? "Available Now" : "Coming Soon"}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Playing?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our gaming community and start having fun with players from
            around the world!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/session")}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Gaming;
