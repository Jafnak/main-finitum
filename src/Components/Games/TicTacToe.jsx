import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import io from "socket.io-client";
import Navbar from "../Navbar";

const TicTacToe = () => {
  const { sessionId } = useParams();
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [socket, setSocket] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [isYourTurn, setIsYourTurn] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);

    newSocket.emit("joinGame", { sessionId });

    newSocket.on("gameStart", ({ symbol }) => {
      setPlayerSymbol(symbol);
      setGameStatus("playing");
      setIsYourTurn(symbol === "X"); // X always goes first
    });

    newSocket.on("gameMove", ({ index, symbol }) => {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = symbol;
        return newBoard;
      });
      // Set isYourTurn based on the next player's turn
      setIsYourTurn(symbol !== playerSymbol);
    });

    newSocket.on("gameWin", ({ winner }) => {
      setWinner(winner);
      setGameStatus("ended");
      setIsYourTurn(false);
    });

    newSocket.on("gameDraw", () => {
      setWinner("draw");
      setGameStatus("ended");
      setIsYourTurn(false);
    });

    return () => newSocket.close();
  }, [sessionId, playerSymbol]);

  const handleClick = (index) => {
    if (board[index] || winner || gameStatus !== "playing" || !isYourTurn) {
      return;
    }

    socket.emit("makeMove", { sessionId, index, symbol: playerSymbol });
    setIsYourTurn(false); // Disable moves until opponent plays
  };

  const renderCell = (index) => {
    return (
      <motion.button
        whileHover={{ scale: board[index] ? 1 : 1.1 }}
        whileTap={{ scale: board[index] ? 1 : 0.9 }}
        className={`w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-4xl font-bold 
          ${
            !board[index] && gameStatus === "playing" && isYourTurn
              ? "hover:bg-gray-50 cursor-pointer"
              : ""
          }
          ${
            !board[index] && gameStatus === "playing" && isYourTurn
              ? "border-4 border-[#F0C987]"
              : ""
          }
        `}
        onClick={() => handleClick(index)}
        disabled={board[index] || gameStatus !== "playing" || !isYourTurn}
      >
        <span
          className={`${
            board[index] === "X" ? "text-blue-500" : "text-red-500"
          }`}
        >
          {board[index]}
        </span>
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-2xl mx-auto">
          {/* Game Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Tic Tac Toe
            </h1>
            {gameStatus === "waiting" && (
              <p className="text-xl text-gray-600">
                Waiting for another player to join...
              </p>
            )}
            {gameStatus === "playing" && (
              <div className="space-y-2">
                <p className="text-xl text-gray-600">
                  You are playing as{" "}
                  <span
                    className={`font-bold ${
                      playerSymbol === "X" ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {playerSymbol}
                  </span>
                </p>
                <p className="text-lg text-gray-600">
                  {isYourTurn ? (
                    <span className="text-green-600 font-bold">Your turn!</span>
                  ) : (
                    <span className="text-gray-600">
                      Waiting for opponent...
                    </span>
                  )}
                </p>
              </div>
            )}
            {gameStatus === "ended" && (
              <p className="text-xl font-semibold">
                {winner === "draw"
                  ? "Game ended in a draw!"
                  : `Player ${winner} wins!`}
              </p>
            )}
          </motion.div>

          {/* Game Board */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-3 gap-4 max-w-[400px] mx-auto"
          >
            {board.map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {renderCell(index)}
              </motion.div>
            ))}
          </motion.div>

          {/* Game Status */}
          {gameStatus === "ended" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#F0C987] text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
              >
                Play Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
