import { MdAlternateEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home"); // Redirects to the home page
  };
  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cream"
      style={{
        backgroundColor: "#FFF8E7", // Cream background
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>

      {/* Login Card */}
      <div className="relative z-10 px-12 py-10 bg-white max-w-[450px] shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-left text-gray-700 mb-2">
          FINITUM
        </h2>
        <p className="text-lg text-left text-gray-500">
          Already registered? Please sign in.
        </p>

        {/* Email Input */}
        <div className="mt-6 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <MdAlternateEmail className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="email"
            placeholder="Email address"
          />
        </div>

        {/* Password Input */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <IoMdKey className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Forgot Password */}
        <p className="mt-2 text-right text-gray-400 text-sm cursor-pointer hover:underline">
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </p>

        {/* Submit Button */}
        <button
          className="mt-6 w-full py-2 bg-cream text-white font-semibold rounded-md shadow-md transition duration-200"
          style={{
            backgroundColor: "#F0C987", // Soft Cream button
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
