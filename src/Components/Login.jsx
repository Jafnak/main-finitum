import { MdAlternateEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    console.log(data);
    axios
      .post("http://localhost:8080/login", data)
      .then((response) => {
        console.log(response.data);
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
            name="emailid"
            value={data.emailid}
            placeholder="Email address"
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
          onClick={readValue}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
