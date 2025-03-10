import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sentences = [
  "Connect with like-minded individuals.",
  "Join time-limited interest-based groups.",
  "Collaborate and grow with Finitum.",
  "Make the most of your time together.",
];

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
      style={{ backgroundColor: "#FFF8E7" }}
    >
      {/* Logo/Title Animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <h1 className="text-6xl font-bold text-gray-800 mb-2">FINITUM</h1>
        <p className="text-xl text-gray-600">Your Time, Your Community</p>
      </motion.div>

      {/* Animated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
        {[
          {
            title: "Study Groups",
            description: "Connect with peers for focused study sessions",
            icon: "📚",
          },
          {
            title: "Gaming Sessions",
            description: "Find your gaming squad for epic adventures",
            icon: "🎮",
          },
          {
            title: "Fitness Buddies",
            description: "Stay motivated with workout partners",
            icon: "💪",
          },
          {
            title: "Time Management",
            description: "Make every minute count with structured sessions",
            icon: "⏰",
          },
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Scrolling Text */}
      <div className="relative h-12 overflow-hidden w-full max-w-lg mb-8">
        <div className="animate-scrollText flex flex-col items-center text-lg font-semibold text-gray-700">
          {[...sentences, ...sentences].map((sentence, i) => (
            <p key={i} className="h-12 flex items-center justify-center">
              {sentence}
            </p>
          ))}
        </div>
      </div>

      {/* Get Started Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-4 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
        style={{ backgroundColor: "#F0C987" }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </motion.button>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateY(0%); }
            100% { transform: translateY(-50%); }
          }
          .animate-scrollText {
            animation: scrollText 6s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Intro;
