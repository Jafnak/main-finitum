import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
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

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div>
      <div
        className="navbar bg-cream shadow-sm px-4"
        style={{
          backgroundColor: "#FFF8E7", // Cream background
        }}
      >
        {/* Brand Name */}
        <div className="flex-1 text-2xl font-bold text-gray-400">
          <h1>FINITUM</h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-32 md:w-56 pl-10 rounded-lg"
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
              <div className="w-10 rounded-full">
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
              className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
            >
              <li>
                <button onClick={handleProfile}>Profile</button>
              </li>
              <li>
                <button onClick={handleSettings}>Settings</button>
              </li>
              <li>
                <button
                  className="btn btn-secondary text-black w-full mt-2"
                  onClick={handleLogout}
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
