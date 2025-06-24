import "./App.css";
import { DashBoard } from "./pages/DashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import LoginPage from "./pages/Login";
import { ProtectedRoute } from "./components/home/ProtectedRoute";
import { Contact } from "./pages/Contact";
import { Restaurant } from "./pages/Restaurant";
import { Comment } from "./dashboards/RestaurantOwnerDashboard/Comment";
import { Food } from "./dashboards/RestaurantOwnerDashboard/Food";
import { Overview } from "./dashboards/RestaurantOwnerDashboard/Overview";
import PasswordReset from "./pages/PasswordReset";
import { CategoryItemsPage } from "./pages/CategoryItemsPage";
import { Profile } from "./dashboards/Profile";
import { Cart } from "./dashboards/CustomerDashboard/Cart";
import { Orders } from "./dashboards/CustomerDashboard/Orders";
import { CustomerDashBoard } from "./pages/CustomerDashboard";
import { RestaurantOrders } from "./dashboards/RestaurantOwnerDashboard/RestaurantOrders";

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
    // {
    //   path: "/restaurant",
    //   element: <Restaurant />,
    // },
    {
      path: "/category-items",
      element: <CategoryItemsPage />,
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
      path: "/forgot-password",
      element: <PasswordReset />,
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
          path: "restaurant-orders",
          element: <RestaurantOrders />,
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
    {
      path: "/restaurant",
      element: (
        <ProtectedRoute>
          <CustomerDashBoard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "food",
          element: <Restaurant />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
