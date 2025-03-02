import { MdAlternateEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidUserPin } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

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
  const inputHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const readValue = () => {
    if (data.password === data.confirmpass) {
      alert("Password and Confirm Password match");
      console.log(data);
      axios
        .post("http://localhost:8080/usersignup", data)
        .then((response) => {
          console.log(response.data);
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
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cream"
      style={{ backgroundColor: "#FFF8E7" }} // Cream background
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>

      {/* Signup Card */}
      <div className="relative z-10 px-12 py-10 bg-white max-w-[450px] shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-left text-gray-700 mb-2">
          FINITUM
        </h2>
        <p className="text-lg text-left text-gray-500">Create a new account.</p>

        {/* Name Input */}
        <div className="mt-6 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <FaUser className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="text"
            placeholder="Full Name"
            name="name"
            value={data.name}
            onChange={inputHandler}
          />
        </div>

        {/* Age Input */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <BiSolidUserPin className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="number"
            placeholder="Age"
            name="age"
            value={data.age}
            onChange={inputHandler}
          />
        </div>

        {/* Email Input */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <MdAlternateEmail className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="email"
            placeholder="Email address"
            name="emailid"
            value={data.emailid}
            onChange={inputHandler}
          />
        </div>

        {/* Interests Select Dropdown */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <select
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none text-gray-600"
            name="interests"
            value={data.interests}
            onChange={inputHandler}
          >
            <option value="" disabled selected>
              Select your interest
            </option>
            <option value="Study Group">Study Group</option>
            <option value="Gaming">Gaming</option>
            <option value="Health & Fitness">Health & Fitness</option>
          </select>
        </div>

        {/* Place Input */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <FaMapMarkerAlt className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="text"
            placeholder="Place"
            name="place"
            value={data.place}
            onChange={inputHandler}
          />
        </div>

        {/* Password Input */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <IoMdKey className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={inputHandler}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mt-4 flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-gray-50">
          <IoMdKey className="text-gray-500 text-xl" />
          <input
            className="w-full text-sm bg-transparent font-light border-none focus:outline-none placeholder-gray-400"
            type="password"
            placeholder="Confirm Password"
            name="confirmpass"
            value={data.confirmpass}
            onChange={inputHandler}
          />
        </div>

        {/* Submit Button */}
        <button
          className="mt-6 w-full py-2 bg-cream text-white font-semibold rounded-md shadow-md transition duration-200"
          style={{ backgroundColor: "#F0C987" }}
          onClick={readValue}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
