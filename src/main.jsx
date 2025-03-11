import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Intro from "./Components/Intro.jsx";
import Study from "./Components/Study.jsx";
import Session from "./Components/Session.jsx";
import SingleSession from "./Components/SingleSession.jsx";
import StudyList from "./Components/StudyList";
import Profile from "./Components/Profile";
import ChatRoom from "./Components/ChatRoom";

const router = createBrowserRouter([
  {
    path: "",
    element: <Intro />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "study",
    element: <Study />,
  },
  {
    path: "session",
    element: <Session />,
  },
  {
    path: "session/:sessionId",
    element: <SingleSession />,
  },
  {
    path: "session/:sessionId/chat",
    element: <ChatRoom />,
  },
  {
    path: "study/list",
    element: <StudyList />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
