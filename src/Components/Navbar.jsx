import {
  FaHome,
  FaBook,
  FaGamepad,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  // Default image

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="navbar bg-white/90 backdrop-blur-sm shadow-md px-6 py-3 flex justify-between items-center">
        {/* Brand Name */}
        <h1
          onClick={() => navigate("/home")}
          className="text-2xl font-bold text-black cursor-pointer hover:text-gray-700 transition-colors"
        >
          FINITUM
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          {[
            { path: "/home", label: "Home", icon: FaHome },
            { path: "/study", label: "Study", icon: FaBook },
            { path: "/gaming", label: "Gaming", icon: FaGamepad },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-black font-medium ${
                location.pathname === item.path
                  ? "bg-[#F0C987] text-black"
                  : "hover:bg-gray-200"
              }`}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}

          {/* Profile and Logout */}
          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 rounded-full border-2 border-[#F0C987] overflow-hidden"
            >
              <img
                alt="User Profile"
                src={
                  sessionStorage.getItem("profileImage") || (
                    <FaUsers className="text-2xl text-gray-800" />
                  )
                }
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
