import "./App.css";
import Dashboard from "./components/dashboard/Overview";
import { Profile } from "./components/dashboard/Profile";
import { Restaurant } from "./components/dashboard/Restaurant";
import { Setting } from "./components/dashboard/Setting";
import { DashBoard } from "./pages/DashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import LoginPage from "./pages/Login";
import { ProtectedRoute } from "./components/home/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "restaurant",
          element: <Restaurant />,
        },
        {
          path: "dash",
          element: <Dashboard />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "settings",
          element: <Setting />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
