import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import Signup from "./Components/Signup.jsx";
import Intro from "./Components/Intro.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
