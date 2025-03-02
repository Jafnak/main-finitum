import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center"
      style={{
        backgroundColor: "#FFF8E7", // Cream background
      }}
    >
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Finitum
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl">
        Finitum is a real-time platform that brings people together in
        time-limited, interest-based groups. Connect, collaborate, and make the
        most of your time with like-minded individuals.
      </p>

      {/* DaisyUI Carousel */}
      <div className="carousel w-full max-w-md mt-6 rounded-lg shadow-lg">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://source.unsplash.com/500x300/?study,group"
            className="w-full object-cover rounded-lg"
            alt="Study Group"
          />
          <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://source.unsplash.com/500x300/?gaming,community"
            className="w-full object-cover rounded-lg"
            alt="Gaming Group"
          />
          <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://source.unsplash.com/500x300/?sports,team"
            className="w-full object-cover rounded-lg"
            alt="Sports Group"
          />
          <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>

        <div id="slide4" className="carousel-item relative w-full">
          <img
            src="https://source.unsplash.com/500x300/?networking,event"
            className="w-full object-cover rounded-lg"
            alt="Networking Group"
          />
          <div className="absolute flex justify-between w-full top-1/2 transform -translate-y-1/2">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>

      {/* Get Started Button */}
      <button
        className="mt-6 px-6 py-3 text-white rounded-xl shadow-md hover:bg-orange-600 transition"
        style={{
          backgroundColor: "#F0C987", // Soft Cream button
        }}
        onClick={() => navigate("/login")}
      >
        Get Started
      </button>
    </div>
  );
};

export default Intro;
