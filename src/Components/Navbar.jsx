import { FaSearch, FaHome, FaBook, FaGamepad } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar bg-white/90 backdrop-blur-sm shadow-md px-4 py-2">
        {/* Brand Name and Navigation */}
        <div className="flex-1 flex items-center gap-8">
          <h1
            onClick={() => navigate("/home")}
            className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors"
          >
            FINITUM
          </h1>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate("/home")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/home"
                  ? "bg-[#F0C987] text-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaHome />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigate("/study")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/study"
                  ? "bg-[#F0C987] text-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaBook />
              <span>Study</span>
            </button>
            <button
              onClick={() => navigate("/gaming")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === "/gaming"
                  ? "bg-[#F0C987] text-gray-800"
                  : "hover:bg-gray-100"
              }`}
            >
              <FaGamepad />
              <span>Gaming</span>
            </button>
          </div>
        </div>

        {/* Search and User Section */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-32 md:w-56 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F0C987]"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <FaSearch className="text-gray-500" />
            </button>
          </form>

          {/* User Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border-2 border-[#F0C987]">
                <img
                  alt="User Profile"
                  src={
                    sessionStorage.getItem("profileImage") ||
                    "https://via.placeholder.com/150"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-box w-52"
            >
              <li>
                <button
                  onClick={() => navigate("/profile")}
                  className="py-2 hover:bg-gray-100 transition-colors"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/study/list")}
                  className="py-2 hover:bg-gray-100 transition-colors"
                >
                  Study Sessions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/gaming/list")}
                  className="py-2 hover:bg-gray-100 transition-colors"
                >
                  Game Rooms
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
