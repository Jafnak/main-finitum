import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPaperPlane, FaClock } from "react-icons/fa";
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

  const extendSession = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/session/sessions/${sessionId}/extend`,
        {
          duration: 30, // Extend by 30 minutes
        }
      );
      if (response.data.status === "success") {
        setSession(response.data.session);
        toast.success("Session extended by 30 minutes!");
      }
    } catch (error) {
      console.error("Error extending session:", error);
      toast.error("Failed to extend session");
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
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      {/* Chat Header */}
      <div className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {session?.name}
            </h2>
            <p className="text-sm text-black-600">Active Study Session</p>
          </div>
          <button
            onClick={extendSession}
            className="flex items-center gap-2 px-4 py-2 bg-[#F0C987] text-black rounded-lg hover:bg-[#e0b977] transition-colors"
          >
            <FaClock />
            <span>Extend Session (30m)</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="bg-gray-100 rounded-lg shadow-lg h-[calc(100vh-240px)] flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.sender === sessionStorage.getItem("useremail")
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === sessionStorage.getItem("useremail")
                      ? "bg-[#F0C987] text-black"
                      : "bg-white text-black border border-gray-200"
                  }`}
                >
                  <p className="text-xs text-gray-600 mb-1 font-semibold">
                    {userNames[message.sender] || message.sender}
                  </p>
                  <p className="text-black">{message.content}</p>
                  <p className="text-xs mt-1 text-gray-600">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-black text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                style={{ backgroundColor: "#F0C987" }}
              >
                <FaPaperPlane />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
