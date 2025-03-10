import { MdAlternateEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const [data, setData] = useState({
    emailid: "",
    password: "",
  });

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    axios
      .post("http://localhost:8080/auth/login", data)
      .then((response) => {
        if (response.data.status === "success") {
          alert("Successfully logged in");
          navigate("/home");
        } else {
          alert("Error logging in");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  };

  return (
    <div
      className="flex items-center justify-center w-screen h-screen relative overflow-hidden"
      style={{ backgroundColor: "#FFF8E7" }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left Circle */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>

        {/* Bottom Right Circle */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>

        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-32 h-1 bg-gradient-to-r from-transparent via-orange-200 to-transparent opacity-20"></div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 px-12 py-10 bg-white/90 backdrop-blur-sm max-w-[450px] w-full shadow-xl rounded-lg border border-gray-200"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">FINITUM</h2>
          <p className="text-lg text-gray-600">Welcome back!</p>
        </motion.div>

        {/* Form Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            readValue();
          }}
          className="space-y-6"
        >
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdAlternateEmail className="text-gray-400 text-xl" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
              type="email"
              name="emailid"
              value={data.emailid}
              placeholder="Email address"
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdKey className="text-gray-400 text-xl" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm"
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={inputHandler}
              autoComplete="current-password"
              required
            />
          </motion.div>

          {/* Signup Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-right"
          >
            <Link
              to="/signup"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 text-white font-semibold rounded-lg shadow-md transition-all"
            style={{ backgroundColor: "#F0C987" }}
            type="submit"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
