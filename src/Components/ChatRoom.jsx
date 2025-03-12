import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPaperPlane, FaUsers, FaImage, FaUserPlus } from "react-icons/fa";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const ChatRoom = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userNames, setUserNames] = useState({});
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const fileInputRef = useRef(null);

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
    const uniqueEmails = [...new Set(messageList.map((msg) => msg.sender))];
    const namePromises = uniqueEmails.map(async (email) => {
      if (!userNames[email]) {
        const name = await fetchUserName(email);
        setUserNames((prev) => ({ ...prev, [email]: name }));
      }
    });
    await Promise.all(namePromises);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload only image files");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sessionId", sessionId);

    try {
      const response = await axios.post(
        "http://localhost:8080/upload/image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const messageData = {
        sessionId,
        sender: sessionStorage.getItem("useremail"),
        content: `<img src="${response.data.fileUrl}" alt="Shared image" />`,
        type: "image",
        timestamp: new Date().toISOString(),
      };

      socketRef.current.emit("send_message", messageData);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/session/sessions/${sessionId}`
        );
        setSession(response.data);
        setLoading(false);
        toast.success("Successfully joined the chat room!");
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
        toast.error("Failed to join chat room");
      }
    };

    socketRef.current = io("http://localhost:8080");

    socketRef.current.on("connect", () => {
      toast.success("Connected to chat server");
    });

    socketRef.current.on("connect_error", () => {
      toast.error("Connection error. Trying to reconnect...");
    });

    socketRef.current.emit("join_room", sessionId);

    socketRef.current.on("message_history", async (messages) => {
      setMessages(messages);
      await updateUserNames(messages);
    });

    socketRef.current.on("receive_message", async (message) => {
      setMessages((prev) => [...prev, message]);
      await updateUserNames([message]);
      if (message.sender !== sessionStorage.getItem("useremail")) {
        toast.info(
          `New message from ${userNames[message.sender] || message.sender}`
        );
      }
    });

    socketRef.current.emit("user_online", {
      email: sessionStorage.getItem("useremail"),
      sessionId,
    });

    socketRef.current.on("online_users", (users) => {
      setOnlineUsers(
        users.filter((user) => user !== sessionStorage.getItem("useremail"))
      );
    });

    fetchSession();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        toast.info("Disconnected from chat");
      }
    };
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      sessionId,
      sender: sessionStorage.getItem("useremail"),
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit("send_message", messageData);
    toast.success("Message sent!");
    setNewMessage("");
  };

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ backgroundColor: "#FFF8E7" }}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] to-[#FFE4BC]">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F0C987] flex items-center justify-center">
                <FaUsers className="text-2xl text-gray-800" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {session?.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Active Study Session</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-700 font-medium">Live Session</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add this after the header div */}
      <div className="bg-white/80 backdrop-blur-sm p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              Online Users:
            </span>
            <div className="flex gap-2">
              {onlineUsers.map((user) => (
                <div
                  key={user}
                  className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-800">
                    {userNames[user] || user}
                  </span>
                  <button
                    onClick={() => {
                      socketRef.current.emit("invite_user", {
                        sessionId,
                        invitedUser: user,
                        invitedBy: sessionStorage.getItem("useremail"),
                      });
                      toast.success(
                        `Invitation sent to ${userNames[user] || user}`
                      );
                    }}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <FaUserPlus />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Messages Area */}
          <div className="h-[calc(100vh-280px)] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.sender === sessionStorage.getItem("useremail")
                      ? "justify-end"
                      : "justify-start"
                  } items-end gap-3`}
                >
                  {message.sender !== sessionStorage.getItem("useremail") && (
                    <div className="w-8 h-8 rounded-full bg-[#F0C987] flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-800">
                        {(userNames[message.sender] || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      message.sender === sessionStorage.getItem("useremail")
                        ? "bg-[#F0C987] text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    } shadow-md`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold mb-1">
                        {userNames[message.sender] || message.sender}
                      </span>
                      <p className="text-gray-800 leading-relaxed">
                        {message.type === "image" ? (
                          <img
                            src={message.content.match(/src="([^"]+)"/)[1]}
                            alt="Shared image"
                            className="max-w-full rounded-lg"
                          />
                        ) : (
                          message.content
                        )}
                      </p>
                      <span className="text-xs text-gray-600 mt-2 self-end">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                  {message.sender === sessionStorage.getItem("useremail") && (
                    <div className="w-8 h-8 rounded-full bg-[#F0C987] flex-shrink-0 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-800">
                        {(userNames[message.sender] || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Message Input */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={sendMessage}
              className="p-6 bg-gray-50 border-t"
            >
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 px-6 py-4 border border-gray-200 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F0C987] transition-all"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <motion.button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-12 h-12 bg-[#F0C987] text-gray-800 rounded-full hover:bg-[#e0b977] transition-colors flex items-center justify-center shadow-lg"
                >
                  <FaImage className="text-xl" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-12 h-12 bg-[#F0C987] text-gray-800 rounded-full hover:bg-[#e0b977] transition-colors flex items-center justify-center shadow-lg"
                >
                  <FaPaperPlane className="text-xl" />
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>

        {/* Session Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Created by</p>
              <p className="font-medium text-gray-800">{session?.createdBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="font-medium text-gray-800">
                {session?.duration} minutes
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Session Type</p>
              <p className="font-medium text-gray-800">{session?.type}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatRoom;
