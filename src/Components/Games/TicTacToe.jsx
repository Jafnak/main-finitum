import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import io from "socket.io-client";
import Navbar from "../Navbar";
import { toast } from "react-toastify";

const TicTacToe = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState(null);
  const [socket, setSocket] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [gameStatus, setGameStatus] = useState("waiting");
  const [isYourTurn, setIsYourTurn] = useState(false);
  const [players, setPlayers] = useState([]);
  const [spectators, setSpectators] = useState([]);
  const [winnerName, setWinnerName] = useState(null);

  const joinGame = useCallback(
    (socket) => {
      const playerName = sessionStorage.getItem("useremail");
      console.log("Attempting to join game:", { sessionId, playerName });

      if (socket && sessionId && playerName) {
        socket.emit("joinGame", { sessionId, playerName });
      }
    },
    [sessionId]
  );

  useEffect(() => {
    const newSocket = io("http://localhost:8080", {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      setSocket(newSocket);
      joinGame(newSocket);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      toast.error("Failed to connect to game server");
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      if (reason === "io server disconnect") {
        // Server initiated disconnect, try to reconnect
        newSocket.connect();
      }
    });

    newSocket.on("gameStart", (data) => {
      console.log("Game start received:", data);
      const { symbol, players: gamePlayers } = data;
      setPlayerSymbol(symbol);
      setPlayers(gamePlayers);
      setGameStatus("waiting");
      if (symbol === "X") {
        setIsYourTurn(true);
      }
      toast.info(`You are playing as ${symbol}`);
    });

    newSocket.on("gameReady", (data) => {
      console.log("Game ready received:", data);
      const { players: gamePlayers, currentPlayer } = data;
      setGameStatus("playing");
      setPlayers(gamePlayers);
      setIsYourTurn(currentPlayer === playerSymbol);
      console.log("Turn state:", {
        currentPlayer,
        playerSymbol,
        isYourTurn: currentPlayer === playerSymbol,
      });
      toast.success("Game is ready to start!");
    });

    newSocket.on("gameSpectator", (data) => {
      console.log("Joined as spectator:", data);
      const { players: gamePlayers, board: gameBoard, status } = data;
      setPlayers(gamePlayers);
      setBoard(gameBoard);
      setGameStatus(status);
      toast.info("You are spectating this game");
    });

    newSocket.on("playersUpdate", (data) => {
      console.log("Players update received:", data);
      const { players: gamePlayers, spectators: gameSpectators } = data;
      setPlayers(gamePlayers);
      setSpectators(gameSpectators);
    });

    newSocket.on("gameMove", (data) => {
      console.log("Game move received:", data);
      const { currentPlayer, board: newBoard } = data;
      setBoard(newBoard);
      setIsYourTurn(currentPlayer === playerSymbol);
      console.log("Turn update:", {
        playerSymbol,
        currentPlayer,
        isYourTurn: currentPlayer === playerSymbol,
      });
    });

    newSocket.on("gameWin", ({ winner, winnerName }) => {
      console.log("Game win received:", { winner, winnerName });
      setWinner(winner);
      setWinnerName(winnerName);
      setGameStatus("ended");
      setIsYourTurn(false);
      if (winner === playerSymbol) {
        toast.success("You won! 🎉");
      } else {
        toast.info("You lost! Better luck next time!");
      }
    });

    newSocket.on("gameDraw", () => {
      console.log("Game draw received");
      setWinner("draw");
      setGameStatus("ended");
      setIsYourTurn(false);
      toast.info("Game ended in a draw!");
    });

    newSocket.on("playerLeft", ({ playerName, remainingPlayers }) => {
      console.log("Player left received:", { playerName, remainingPlayers });
      setGameStatus("waiting");
      setBoard(Array(9).fill(""));
      setWinner(null);
      setPlayers(remainingPlayers);
      toast.error(`${playerName} left the game`);
    });

    return () => {
      console.log("Cleaning up socket connection");
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [sessionId, joinGame]);

  const handleClick = (index) => {
    if (
      !socket ||
      board[index] ||
      winner ||
      gameStatus !== "playing" ||
      !isYourTurn
    ) {
      console.log("Invalid move:", {
        socketExists: !!socket,
        cellOccupied: !!board[index],
        hasWinner: !!winner,
        wrongStatus: gameStatus !== "playing",
        notYourTurn: !isYourTurn,
        currentSymbol: playerSymbol,
      });
      return;
    }

    console.log("Making move:", { index, symbol: playerSymbol });
    socket.emit("makeMove", {
      sessionId,
      index,
      symbol: playerSymbol,
    });

    // Optimistically update the board and turn
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index] = playerSymbol;
      return newBoard;
    });
    setIsYourTurn(false);
  };

  const renderCell = (index) => {
    const isClickable = !board[index] && gameStatus === "playing" && isYourTurn;

    return (
      <motion.button
        whileHover={{ scale: isClickable ? 1.1 : 1 }}
        whileTap={{ scale: isClickable ? 0.95 : 1 }}
        className={`w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-4xl font-bold 
          ${
            isClickable
              ? "hover:bg-gray-50 cursor-pointer"
              : "cursor-not-allowed"
          }
          ${isClickable ? "border-4 border-[#F0C987]" : ""}
          transition-all duration-200
        `}
        onClick={() => handleClick(index)}
        disabled={!isClickable}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: board[index] ? 1 : 0 }}
          className={`${
            board[index] === "X" ? "text-blue-500" : "text-red-500"
          }`}
        >
          {board[index]}
        </motion.span>
      </motion.button>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8E7" }}>
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          {/* Game Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Tic Tac Toe
            </h1>

            {/* Player Information */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Player X */}
              <div
                className={`p-4 rounded-lg ${
                  players.find((p) => p.symbol === "X")?.symbol === playerSymbol
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">Player X</h3>
                <p className="text-sm text-gray-600">
                  {players.find((p) => p.symbol === "X")?.name || "Waiting..."}
                </p>
              </div>

              {/* Game Status */}
              <div className="p-4 rounded-lg bg-white">
                <h3 className="text-lg font-semibold mb-1">Status</h3>
                <p className="text-sm text-gray-600">
                  {gameStatus === "waiting" && "Waiting for players..."}
                  {gameStatus === "playing" &&
                    (isYourTurn ? "Your turn!" : "Opponent's turn")}
                  {gameStatus === "ended" &&
                    (winner === "draw" ? "Draw!" : `Winner: ${winnerName}`)}
                </p>
              </div>

              {/* Player O */}
              <div
                className={`p-4 rounded-lg ${
                  players.find((p) => p.symbol === "O")?.symbol === playerSymbol
                    ? "bg-red-100"
                    : "bg-gray-100"
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">Player O</h3>
                <p className="text-sm text-gray-600">
                  {players.find((p) => p.symbol === "O")?.name || "Waiting..."}
                </p>
              </div>
            </div>

            {/* Spectators */}
            {spectators.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600">
                  Spectators: {spectators.join(", ")}
                </h3>
              </div>
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

          {/* Game Actions */}
          {gameStatus === "ended" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8 space-y-4"
            >
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-[#F0C987] text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
              >
                Play Again
              </button>
              <button
                onClick={() => navigate("/gaming")}
                className="block mx-auto px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
              >
                Back to Gaming
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
