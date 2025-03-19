import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { FaGraduationCap, FaGamepad, FaDumbbell } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Study Group",
      description:
        "Join Finitum's study groups to connect, collaborate, and achieve your learning goals in real-time!",
      image: "stud.png",
      icon: <FaGraduationCap className="text-4xl text-gray-700" />,
      path: "/study",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Gaming",
      description:
        "Level up your fun with Finitum's gaming groups—connect, compete, and conquer in real time!",
      image: "game.png",
      icon: <FaGamepad className="text-4xl text-gray-700" />,
      path: "/gaming",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Health and Fitness",
      description:
        "Crush your fitness goals with Finitum's health groups—stay motivated, share tips, and thrive together!",
      image: "fit.png",
      icon: <FaDumbbell className="text-4xl text-gray-700" />,
      path: "/health",
      color: "from-green-500 to-green-600",
    },
  ];

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
          Welcome to Finitum
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with like-minded individuals and make the most of your time
          together
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${card.color} opacity-20`}
                ></div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {card.icon}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {card.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6">{card.description}</p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(card.path)}
                  className="w-full py-3 text-white font-semibold rounded-lg shadow-md transition-all"
                  style={{ backgroundColor: "#F0C987" }}
                >
                  Join Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaGraduationCap className="text-2xl text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Learn Together
            </h3>
            <p className="text-gray-600">
              Connect with peers and enhance your learning experience
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaGamepad className="text-2xl text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Play Together
            </h3>
            <p className="text-gray-600">
              Find your gaming squad and enjoy epic adventures
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
              <FaDumbbell className="text-2xl text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Stay Fit Together
            </h3>
            <p className="text-gray-600">
              Motivate each other and achieve your fitness goals
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
