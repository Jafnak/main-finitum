import { MdAlternateEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidUserPin } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    emailid: "",
    place: "",
    age: "",
    password: "",
    confirmpass: "",
    interests: "",
  });

  const navigate = useNavigate();

  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    if (data.password === data.confirmpass) {
      axios
        .post("http://localhost:8080/auth/signup", data)
        .then((response) => {
          if (response.data.status === "success") {
            alert("Successfully Registered");
            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userid", response.data.userid);
            navigate("/login");
          } else {
            alert("Registration Failed");
          }
        })
        .catch((error) => {
          console.error("Error during registration", error);
        });
    } else {
      alert("Password and Confirm Password do not match");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full relative overflow-hidden"
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
        className="relative z-10 px-8 py-8 bg-white/90 backdrop-blur-sm max-w-[450px] w-full mx-4 shadow-xl rounded-lg border border-gray-200"
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">FINITUM</h2>
          <p className="text-lg text-gray-600">Create your account</p>
        </motion.div>

        {/* Form Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            readValue();
          }}
          className="space-y-4"
        >
          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400 text-lg" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm text-sm"
              type="text"
              placeholder="Full Name"
              name="name"
              value={data.name}
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Age Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSolidUserPin className="text-gray-400 text-lg" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm text-sm"
              type="number"
              placeholder="Age"
              name="age"
              value={data.age}
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdAlternateEmail className="text-gray-400 text-lg" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm text-sm"
              type="email"
              placeholder="Email address"
              name="emailid"
              value={data.emailid}
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Interests Select */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <select
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 bg-white/80 backdrop-blur-sm text-sm"
              name="interests"
              value={data.interests}
              onChange={inputHandler}
              required
            >
              <option value="" disabled>
                Select your interest
              </option>
              <option value="Study Group">Study Group</option>
              <option value="Gaming">Gaming</option>
              <option value="Health & Fitness">Health & Fitness</option>
            </select>
          </motion.div>

          {/* Place Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400 text-lg" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm text-sm"
              type="text"
              placeholder="Place"
              name="place"
              value={data.place}
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdKey className="text-gray-400 text-lg" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm text-sm"
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Confirm Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoMdKey className="text-gray-400 text-lg" />
            </div>
            <input
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-800 placeholder-gray-400 bg-white/80 backdrop-blur-sm text-sm"
              type="password"
              placeholder="Confirm Password"
              name="confirmpass"
              value={data.confirmpass}
              onChange={inputHandler}
              required
            />
          </motion.div>

          {/* Login Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-right pt-2"
          >
            <Link
              to="/login"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Already have an account? Sign in
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
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
