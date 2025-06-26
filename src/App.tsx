import "./App.css";
// import { DashBoard } from "./pages/DashBoard";
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
import { RestaurantOrders } from "./dashboards/RestaurantOwnerDashboard/RestaurantOrders";
import { AllOrders } from "./dashboards/AdminDashboard/AllOrders";
import { Cities } from "./dashboards/AdminDashboard/Cities";
import { Analytics } from "./dashboards/AdminDashboard/Analytics";
import { Users } from "./dashboards/AdminDashboard/Users";
import { MenuItem } from "./dashboards/AdminDashboard/MenuItem";
import { States } from "./dashboards/AdminDashboard/States";
import { Categories } from "./dashboards/AdminDashboard/Categories";
import { Comments } from "./dashboards/AdminDashboard/Comments";
import { Restaurants } from "./dashboards/AdminDashboard/Restaurants";
import { DashBoard } from "./pages/DashBoard";
import { CustomerDashBoard } from "./pages/CustomerDashboard";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";

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
      path: "/reset-password",
      element: <ResetPasswordPage />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage />,
    },
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
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "menu-item",
          element: <MenuItem />,
        },
        {
          path: "restaurants",
          element: <Restaurants />,
        },
        {
          path: "orders",
          element: <AllOrders />,
        },
        {
          path: "comments",
          element: <Comments />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "states",
          element: <States />,
        },
        {
          path: "cities",
          element: <Cities />,
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
