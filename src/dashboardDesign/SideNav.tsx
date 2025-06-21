// SideNav.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navItems = [
    { name: "Overview", path: "/dashboard", icon: "📊" },
    { name: "Food", path: "/food", icon: "🍔" },
    { name: "Comments", path: "/comments", icon: "💬" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      className={`flex flex-col h-screen bg-black text-white p-4 sm:px-2 border-r border-gray-800`}
      initial={{ width: "20%" }}
      animate={{ width: isCollapsed ? "5%" : "20%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Logo/Header */}
      <motion.div 
        className="flex items-center justify-center mb-8 cursor-pointer py-3"
        onClick={toggleCollapse}
        whileHover={{ backgroundColor: "#1a1a1a" }}
      >
        {isCollapsed ? (
          <motion.span className="text-xl font-bold text-yellow-400">D</motion.span>
        ) : (
          <motion.h1 className="text-xl font-bold text-yellow-400">DASHBOARD</motion.h1>
        )}
      </motion.div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <motion.div
              className={`flex items-center p-3 rounded-lg hover:bg-gray-800 ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
              whileHover={{ backgroundColor: "#1e1e1e" }}
              transition={{ duration: 0.2 }}
              title={isCollapsed ? item.name : ""} // Show tooltip when collapsed
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && (
                <motion.span
                  className="ml-3"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {item.name}
                </motion.span>
              )}
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
};