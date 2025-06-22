import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../app/store";
import { clearCreadentials } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await dispatch(clearCreadentials());
      navigate("/login");
    } catch (error) {
      console.log("Log Out Failed", error);
    }
  };

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/restaurant", name: "The Restaurant" },
    { path: "/contact", name: "Contact" },
  ];

  const mobileNavItems = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/restaurant", name: "The Restaurant" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="navbar bg-black shadow-sm sticky top-0 z-50"
    >
      {/* Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {mobileNavItems.map((item, index) => (
              <motion.li
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          className="btn btn-ghost text-xl text-yellow-400"
        >
          CulinaryHub
        </motion.a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex items-center">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navItems.map((item, index) => (
            <motion.li
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className={`${
                  item.name === "The Restaurant"
                    ? "badge badge-outline badge-warning hover:badge-warning text-2xl py-5 px-3"
                    : "text-white hover:bg-yellow-400 hover:text-black transition-colors"
                }transition-colors`}
              >
                {item.name}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Auth Buttons */}
      <AnimatePresence>
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="navbar-end gap-2"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="btn bg-yellow-400 text-black hover:bg-yellow-500 border-none"
                to="/login"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                className="btn bg-gray-800 text-yellow-400 hover:bg-gray-700 border-none"
                to="/contact"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="dropdown navbar-end dropdown-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              tabIndex={0}
              role="button"
              className="btn bg-yellow-400 text-black border-none hover:bg-yellow-500"
            >
              {user?.userName || "Profile"}
            </motion.div>
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              tabIndex={0}
              className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 shadow-sm"
            >
              <motion.li
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
                  to="/owner/dashboard"
                >
                  DashBoard
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;
