import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaPlus,
  FaSearch,
  FaBook,
  FaClock,
  FaComments,
} from "react-icons/fa";

const Study = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Collaborative Learning",
      description: "Connect with peers who share your academic interests",
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: "Resource Sharing",
      description: "Access and share study materials, notes, and resources",
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: "Scheduled Sessions",
      description: "Plan and join study sessions at your convenience",
    },
    {
      icon: <FaComments className="text-3xl" />,
      title: "Real-time Discussion",
      description: "Engage in live discussions and Q&A sessions",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Study Smarter, Together
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our collaborative learning community and enhance your
              academic journey with like-minded peers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/session")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <FaPlus className="text-xl" />
                <span className="font-semibold">Create Study Group</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/study/list")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <FaSearch className="text-xl" />
                <span className="font-semibold">Find Study Groups</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                <div className="text-gray-700">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Subjects Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Popular Study Subjects
          </h2>
          <p className="text-gray-600">
            Find study groups for your specific subjects
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Mathematics", "Science", "Programming", "Languages"].map(
            (subject, index) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800">{subject}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Active Groups: 12
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Learning Together?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of learners and take your studies to the next
            level with collaborative learning.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/session")}
            className="px-8 py-4 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-semibold"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Study;
