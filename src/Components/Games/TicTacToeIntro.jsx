import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";

const TicTacToeIntro = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const features = [
    {
      title: "Real-time Multiplayer",
      description: "Play with friends in real-time",
      icon: "🎮",
    },
    {
      title: "Turn-based Gameplay",
      description: "Strategic turn-based battles",
      icon: "⚔️",
    },
    {
      title: "Live Updates",
      description: "See moves as they happen",
      icon: "🔄",
    },
    {
      title: "Win Detection",
      description: "Automatic win/draw detection",
      icon: "🏆",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Tic Tac Toe
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Challenge your friends to the classic game of X's and O's
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#F0C987] text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
              onClick={() => navigate(`/session/${sessionId}/game/play`)}
            >
              Start Playing
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* How to Play Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-xl shadow-lg mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              How to Play
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-600">
              <li>Click "Start Playing" to enter the game room</li>
              <li>Wait for another player to join your session</li>
              <li>Take turns placing your symbol (X or O) on the board</li>
              <li>
                Get three in a row horizontally, vertically, or diagonally to
                win
              </li>
              <li>
                If all squares are filled with no winner, the game is a draw
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToeIntro;
