import { useState } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useNavigate } from 'react-router';
import { clearCreadentials } from '../features/auth/authSlice';
import { clearCart } from '../features/cart/cartSlice';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

const handleLogOut = async () => {
  try {
    await dispatch(clearCreadentials());
    await dispatch(clearCart())
    navigate("/login");
  } catch (error) {
    console.log("Log Out Failed", error);
  }
};
  const navItems = [
    { path: "/", name: "Home" },
    { path: "/restaurant/food", name: "The Restaurant" },
    { path: "/contact", name: "Contact" },
  ];

  const mobileNavItems = [
    { path: "/", name: "Home" },
    { path: "/about", name: "About Us" },
    { path: "/restaurant", name: "The Restaurant" },
    { path: "/contact", name: "Contact" },
  ];

  return (
    <nav className="bg-black/95 backdrop-blur-md border-b border-yellow-400/20 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
              CulinaryHub
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.name === "The Restaurant"
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:from-yellow-300 hover:to-yellow-400 shadow-lg hover:shadow-yellow-400/25"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <a
                  href="/login"
                  className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 shadow-lg hover:shadow-yellow-400/25 hover:scale-105"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-6 py-2 bg-gray-800/80 text-yellow-400 font-medium rounded-lg border border-yellow-400/30 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-medium rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-200 shadow-lg hover:shadow-yellow-400/25"
                >
                  <User className="w-4 h-4" />
                  <span>{user?.userName || "Profile"}</span>
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-xl border border-yellow-400/20 shadow-2xl">
                    <div className="py-2">
                      {
                        user.userType === "restaurant_owner" ? (
                          <a
                          href="/owner/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </a>
                        ): (
                          user.userType === "admin" && (
                            <a
                              href="/admin/analytics"
                              className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                            >
                              <LayoutDashboard className="w-4 h-4" />
                              <span>Dashboard</span>
                            </a>
                          )
                        )
                      }
                      {/* {user.userType === "restaurant_owner" && (
                        <a
                          href="/owner/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </a>
                      )} */}
                      <button
                        onClick={handleLogOut}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-yellow-400/20 mt-2 pt-4 pb-4">
            <div className="space-y-2">
              {mobileNavItems.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="block px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-yellow-400/20 mt-4">
                {!isAuthenticated ? (
                  <div className="space-y-2">
                    <a
                      href="/login"
                      className="block w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black font-medium rounded-lg text-center"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="block w-full px-4 py-2 bg-gray-800/80 text-yellow-400 font-medium rounded-lg border border-yellow-400/30 text-center"
                    >
                      Sign Up
                    </a>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-yellow-400 font-medium">
                      {user?.userName || "Profile"}
                    </div>
                    {user.userType === "restaurant_owner" && (
                      <a
                        href="/owner/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </a>
                    )}
                    <button
                      onClick={handleLogOut}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import type { RootState } from "../app/store";
// import { clearCreadentials } from "../features/auth/authSlice";
// import { motion, AnimatePresence } from "framer-motion";
// import { clearCart } from "../features/cart/cartSlice";

// const NavBar = () => {
//   const { isAuthenticated, user } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogOut = async () => {
//     try {
//       await dispatch(clearCreadentials());
//       await dispatch(clearCart())
//       navigate("/login");
//     } catch (error) {
//       console.log("Log Out Failed", error);
//     }
//   };

//   const navItems = [
//     { path: "/", name: "Home" },
//     { path: "/restaurant/food", name: "The Restaurant" },
//     { path: "/contact", name: "Contact" },
//   ];

//   const mobileNavItems = [
//     { path: "/", name: "Home" },
//     { path: "/about", name: "About Us" },
//     { path: "/restaurant", name: "The Restaurant" },
//     { path: "/contact", name: "Contact" },
//   ];

//   return (
//     <motion.div
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100 }}
//       className="navbar bg-black shadow-sm sticky top-0 z-50"
//     >
//       {/* Mobile Menu */}
//       <div className="navbar-start">
//         <div className="dropdown">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost lg:hidden"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 text-yellow-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </motion.div>
//           <motion.ul
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//             tabIndex={0}
//             className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//           >
//             {mobileNavItems.map((item, index) => (
//               <motion.li
//                 key={item.path}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Link
//                   to={item.path}
//                   className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
//                 >
//                   {item.name}
//                 </Link>
//               </motion.li>
//             ))}
//           </motion.ul>
//         </div>
//         <motion.a
//           whileHover={{ scale: 1.05 }}
//           className="btn btn-ghost text-xl text-yellow-400"
//         >
//           CulinaryHub
//         </motion.a>
//       </div>

//       {/* Desktop Menu */}
//       <div className="navbar-center hidden lg:flex items-center">
//         <ul className="menu menu-horizontal gap-2 px-1">
//           {navItems.map((item, index) => (
//             <motion.li
//               key={item.path}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               initial={{ y: -10, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <Link
//                 to={item.path}
//                 className={`${
//                   item.name === "The Restaurant"
//                     ? "badge badge-outline badge-warning hover:badge-warning text-2xl py-5 px-3"
//                     : "text-white hover:bg-yellow-400 hover:text-black transition-colors"
//                 }transition-colors`}
//               >
//                 {item.name}
//               </Link>
//             </motion.li>
//           ))}
//         </ul>
//       </div>

//       {/* Auth Buttons */}
//       <AnimatePresence>
//         {!isAuthenticated ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="navbar-end gap-2"
//           >
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link
//                 className="btn bg-yellow-400 text-black hover:bg-yellow-500 border-none"
//                 to="/login"
//               >
//                 Login
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Link
//                 className="btn bg-gray-800 text-yellow-400 hover:bg-gray-700 border-none"
//                 to="/contact"
//               >
//                 Sign Up
//               </Link>
//             </motion.div>
//           </motion.div>
//         ) : user.userType === "restaurant_owner" ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="dropdown navbar-end dropdown-start"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               tabIndex={0}
//               role="button"
//               className="btn bg-yellow-400 text-black border-none hover:bg-yellow-500"
//             >
//               {user?.userName || "Profile"}
//             </motion.div>
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               tabIndex={0}
//               className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 shadow-sm"
//             >
//               <motion.li
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Link
//                   className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
//                   to="/owner/dashboard"
//                 >
//                   DashBoard
//                 </Link>
//               </motion.li>
//               <motion.li
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <button
//                   className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
//                   onClick={handleLogOut}
//                 >
//                   Log Out
//                 </button>
//               </motion.li>
//             </motion.ul>
//           </motion.div>
//         ) : (
//           <div className="navbar-end">
//             <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="dropdown navbar-end dropdown-start"
//           >
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               tabIndex={0}
//               role="button"
//               className="btn bg-yellow-400 text-black border-none hover:bg-yellow-500"
//             >
//               {user?.userName || "Profile"}
//             </motion.div>
//             <motion.ul
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//               tabIndex={0}
//               className="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 shadow-sm"
//             >
            
//               <motion.li
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <button
//                   className="text-white hover:bg-yellow-400 hover:text-black transition-colors"
//                   onClick={handleLogOut}
//                 >
//                   Log Out
//                 </button>
//               </motion.li>
//             </motion.ul>
//           </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// export default NavBar;
