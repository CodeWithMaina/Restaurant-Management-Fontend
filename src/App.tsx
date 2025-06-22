import "./App.css";
import { Profile } from "./components/RestaurantOwnerDashboard/Profile";
import { DashBoard } from "./pages/DashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import LoginPage from "./pages/Login";
import { ProtectedRoute } from "./components/home/ProtectedRoute";
import { Contact } from "./pages/Contact";
import { Restaurant } from "./pages/Restaurant";
import { Comment } from "./components/RestaurantOwnerDashboard/Comment";
import { Food } from "./components/RestaurantOwnerDashboard/Food";
import { Overview } from "./components/RestaurantOwnerDashboard/Overview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/restaurant",
      element: <Restaurant />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/owner",
      element: (
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "dashboard",
          element: <Overview />,
        },
        {
          path: "food",
          element: <Food />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "comments",
          element: <Comment />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
