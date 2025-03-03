import { useNavigate } from "react-router-dom";

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
      style={{ backgroundColor: "#FFF8E7" }} // Cream background
    >
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Finitum
      </h1>

      {/* Continuous Scrolling Text */}
      <div className="relative h-12 overflow-hidden w-full max-w-lg">
        <div className="animate-scrollText flex flex-col items-center text-lg font-semibold text-gray-700">
          {[...sentences, ...sentences].map((sentence, i) => (
            <p key={i} className="h-12 flex items-center justify-center">
              {sentence}
            </p>
          ))}
        </div>
      </div>

      <button
        className="mt-6 px-6 py-3 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
        style={{ backgroundColor: "#F0C987" }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>

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
