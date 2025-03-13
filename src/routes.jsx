import { createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Study from "./Components/Study";
import StudyList from "./Components/StudyList";
import Session from "./Components/Session";
import SingleSession from "./Components/SingleSession";
import ChatRoom from "./Components/ChatRoom";
import Profile from "./Components/Profile";
import Gaming from "./Components/Gaming";
import GamingList from "./Components/GamingList";
import TicTacToe from "./Components/Games/TicTacToe";
import TicTacToeIntro from "./Components/Games/TicTacToeIntro";
import Fitness from "./Components/Games/Fitness";
import Intro from "./Components/Intro";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/study",
    element: <Study />,
  },
  {
    path: "/study/list",
    element: <StudyList />,
  },
  {
    path: "/session",
    element: <Session />,
  },
  {
    path: "/session/:sessionId",
    element: <SingleSession />,
  },
  {
    path: "/session/:sessionId/chat",
    element: <ChatRoom />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/gaming",
    element: <Gaming />,
  },
  {
    path: "/gaming/list",
    element: <GamingList />,
  },
  {
    path: "/session/:sessionId/game",
    element: <TicTacToeIntro />,
  },
  {
    path: "/session/:sessionId/game/play",
    element: <TicTacToe />,
  },
  {
    path: "/session/:sessionId/fitness",
    element: <Fitness />,
  },
  {
    path: "/health",
    element: <Fitness />,
  },
  {
    path: "/health/list",
    element: <GamingList />,
  },
]);

export default router;
