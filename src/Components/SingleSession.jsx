import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleSession = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/session/sessions/${sessionId}`
        );
        setSession(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to load session: ${err.message}`);
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!session) return <div>Session not found</div>;

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: "#FFF8E7", // Cream background matching login page
      }}
    >
      <div className="relative z-10 px-12 py-10 bg-white max-w-[450px] shadow-xl rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-left text-gray-700 mb-2">
          FINITUM
        </h2>
        <p className="text-lg text-left text-gray-500 mb-6">Session Details</p>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-white">
            <p className="text-gray-800">Name: {session.name}</p>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-white">
            <p className="text-gray-800">Type: {session.type}</p>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-white">
            <p className="text-gray-800">
              Duration: {session.duration} minutes
            </p>
          </div>
          <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-white">
            <p className="text-gray-800">
              Friend&apos;s Email: {session.friendEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSession;
