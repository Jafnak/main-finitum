import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaClock,
  FaHeart,
  FaFire,
  FaDumbbell,
  FaPaperPlane,
  FaInfoCircle,
  FaPlus,
} from "react-icons/fa";
import Navbar from "../Navbar";
import io from "socket.io-client";
import { toast } from "react-toastify";
import axios from "axios";

const Fitness = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userNames, setUserNames] = useState({});
  const messagesEndRef = useRef(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [userChallenges, setUserChallenges] = useState([]);
  const [showNewChallengeForm, setShowNewChallengeForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "Easy",
  });
  const [newNote, setNewNote] = useState("");

  const defaultChallenges = [
    {
      id: 1,
      title: "5-Minute Plank Challenge",
      description:
        "Hold a plank position for as long as you can within 5 minutes",
      duration: "5 mins",
      difficulty: "Medium",
      icon: <FaFire className="text-orange-500" />,
    },
    {
      id: 2,
      title: "Push-up Challenge",
      description: "Complete 50 push-ups in sets. Track your progress!",
      duration: "10 mins",
      difficulty: "Hard",
      icon: <FaDumbbell className="text-blue-500" />,
    },
    {
      id: 3,
      title: "Quick Cardio Burst",
      description: "30 jumping jacks, 20 high knees, 10 burpees",
      duration: "3 mins",
      difficulty: "Easy",
      icon: <FaHeart className="text-red-500" />,
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchUserName = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/auth/user/${email}`
      );
      return response.data.name || email;
    } catch (error) {
      console.error("Error fetching user name:", error);
      return email;
    }
  };

  const updateUserNames = async (messageList) => {
    const uniqueEmails = [...new Set(messageList.map((msg) => msg.user))];
    const namePromises = uniqueEmails.map(async (email) => {
      if (!userNames[email]) {
        const name = await fetchUserName(email);
        setUserNames((prev) => ({ ...prev, [email]: name }));
      }
    });
    await Promise.all(namePromises);
  };

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      toast.success("Connected to fitness session");
    });

    newSocket.emit("joinFitnessSession", {
      sessionId,
      user: sessionStorage.getItem("useremail"),
    });

    newSocket.on("fitnessMessage", async (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      await updateUserNames([message]);
      if (message.user !== sessionStorage.getItem("useremail")) {
        toast.info(
          `New message from ${userNames[message.user] || message.user}`
        );
      }
    });

    newSocket.on("challengeStarted", (challenge) => {
      setSelectedChallenge(challenge);
      toast.info(`New challenge started: ${challenge.title}`);
    });

    newSocket.on("online_users", async (users) => {
      const filteredUsers = users.filter(
        (user) => user !== sessionStorage.getItem("useremail")
      );
      setOnlineUsers(filteredUsers);
      await updateUserNames(filteredUsers.map((user) => ({ user })));
    });

    return () => newSocket.disconnect();
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/fitness/messages/${sessionId}`
        );
        setMessages(response.data);
        await updateUserNames(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to load chat history");
      }
    };

    fetchMessages();
  }, [sessionId]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/fitness/challenges/${sessionId}`
        );
        setUserChallenges(response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        toast.error("Failed to load challenges");
      }
    };

    fetchChallenges();
  }, [sessionId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      const messageData = {
        sessionId,
        user: sessionStorage.getItem("useremail"),
        text: newMessage,
        timestamp: new Date(),
      };

      try {
        // First save the message to the database
        const response = await axios.post(
          "http://localhost:8080/fitness/messages",
          messageData
        );

        // Then emit the saved message through socket
        socket.emit("fitnessMessage", response.data);

        // Clear input
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message");
      }
    }
  };

  const startChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    if (socket) {
      socket.emit("startChallenge", { sessionId, challenge });
      toast.success(`Started challenge: ${challenge.title}`);
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/fitness/challenges",
        {
          ...newChallenge,
          sessionId,
          createdBy: sessionStorage.getItem("useremail"),
        }
      );

      setUserChallenges([response.data, ...userChallenges]);
      setShowNewChallengeForm(false);
      setNewChallenge({
        title: "",
        description: "",
        duration: "",
        difficulty: "Easy",
      });
      toast.success("Challenge created successfully!");
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast.error("Failed to create challenge");
    }
  };

  const handleAddNote = async (challengeId) => {
    if (!newNote.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/fitness/challenges/${challengeId}/notes`,
        {
          text: newNote,
          user: sessionStorage.getItem("useremail"),
        }
      );

      setUserChallenges(
        userChallenges.map((challenge) =>
          challenge._id === challengeId ? response.data : challenge
        )
      );
      setNewNote("");
      toast.success("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Challenges Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Fitness Challenges
                </h2>
                <button
                  onClick={() => setShowNewChallengeForm(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#F0C987] text-gray-800 rounded-lg hover:bg-[#e0b977] transition-colors"
                >
                  <FaPlus /> New Challenge
                </button>
              </div>

              {/* New Challenge Form */}
              {showNewChallengeForm && (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gray-50 rounded-lg"
                  onSubmit={handleCreateChallenge}
                >
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Challenge Title"
                      value={newChallenge.title}
                      onChange={(e) =>
                        setNewChallenge({
                          ...newChallenge,
                          title: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F0C987]"
                      required
                    />
                    <textarea
                      placeholder="Description"
                      value={newChallenge.description}
                      onChange={(e) =>
                        setNewChallenge({
                          ...newChallenge,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F0C987]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 5 mins)"
                      value={newChallenge.duration}
                      onChange={(e) =>
                        setNewChallenge({
                          ...newChallenge,
                          duration: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F0C987]"
                      required
                    />
                    <select
                      value={newChallenge.difficulty}
                      onChange={(e) =>
                        setNewChallenge({
                          ...newChallenge,
                          difficulty: e.target.value,
                        })
                      }
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F0C987]"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#F0C987] text-gray-800 rounded hover:bg-[#e0b977]"
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowNewChallengeForm(false)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              <div className="space-y-6">
                {/* Default Challenges */}
                {defaultChallenges.map((challenge) => (
                  <motion.div
                    key={challenge.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg transition-colors ${
                      selectedChallenge?.id === challenge.id
                        ? "bg-[#F0C987]"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => startChallenge(challenge)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {challenge.icon}
                        <h3 className="font-semibold text-gray-800">
                          {challenge.title}
                        </h3>
                        <FaInfoCircle
                          className="text-gray-500 cursor-help ml-auto"
                          title={challenge.description}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {challenge.duration}
                        </span>
                        <span>{challenge.difficulty}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* User Created Challenges */}
                {userChallenges.map((challenge) => (
                  <motion.div
                    key={challenge._id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg transition-colors ${
                      selectedChallenge?._id === challenge._id
                        ? "bg-[#F0C987]"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => startChallenge(challenge)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <FaDumbbell className="text-blue-500" />
                        <h3 className="font-semibold text-gray-800">
                          {challenge.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {challenge.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaClock className="text-xs" />
                          {challenge.duration}
                        </span>
                        <span>{challenge.difficulty}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Created by{" "}
                        {userNames[challenge.createdBy] || challenge.createdBy}
                      </p>
                    </div>

                    {/* Challenge Notes */}
                    {challenge.notes?.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Notes:
                        </h4>
                        {challenge.notes.map((note, index) => (
                          <div
                            key={index}
                            className="bg-white/50 rounded p-2 text-sm"
                          >
                            <p className="text-gray-800">{note.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              By {userNames[note.user] || note.user} •{" "}
                              {new Date(note.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Note Form */}
                    <div className="mt-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add a note..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="flex-1 text-sm p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F0C987]"
                        />
                        <button
                          onClick={() => handleAddNote(challenge._id)}
                          className="px-3 py-1 bg-[#F0C987] text-gray-800 rounded hover:bg-[#e0b977]"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg h-[calc(100vh-160px)] flex flex-col"
            >
              {/* Chat Header */}
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold text-gray-800">
                  Fitness Chat Room
                </h2>
                {selectedChallenge && (
                  <p className="text-sm text-gray-600">
                    Current Challenge: {selectedChallenge.title}
                  </p>
                )}
                {onlineUsers.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {onlineUsers.map((user) => (
                      <span
                        key={user}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {userNames[user] || user}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.user === sessionStorage.getItem("useremail")
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.user === sessionStorage.getItem("useremail")
                          ? "bg-[#F0C987] text-gray-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {userNames[message.user] || message.user}
                      </p>
                      <p className="text-gray-800">{message.text}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F0C987] text-gray-800 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F0C987] text-gray-800 rounded-lg font-semibold hover:bg-[#e0b977] transition-colors"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;
