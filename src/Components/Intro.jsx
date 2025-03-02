import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center"
      style={{
        backgroundColor: "#FFF8E7", // Cream background
      }}
    >
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Finitum
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        Finitum is a real-time platform that brings people together in
        time-limited, interest-based groups. Connect, collaborate, and make the
        most of your time with like-minded individuals.
      </p>
      <button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
        style={{
          backgroundColor: "#F0C987", // Soft Cream button
        }}
        onClick={handleSubmit}
      >
        Get Started
      </button>
    </div>
  );
};

export default Intro;
