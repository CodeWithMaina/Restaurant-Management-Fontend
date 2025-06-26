import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const AdminSideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Auto-collapse on mobile
  useEffect(() => {
    const handleResize = () => {
      const mobileBreakpoint = window.innerWidth < 768;
      setIsMobile(mobileBreakpoint);
      setIsCollapsed(mobileBreakpoint);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { name: "Analytics", path: "/admin/analytics", icon: "📈" },
    { name: "Users", path: "/admin/users", icon: "👥" },
    { name: "Menu Items", path: "/admin/menu-item", icon: "🍽️" },
    { name: "Restaurants", path: "/admin/restaurants", icon: "🏨" },
    { name: "Orders", path: "/admin/orders", icon: "📦" },
    { name: "Comments", path: "/admin/comments", icon: "💬" },
    { name: "Categories", path: "/admin/categories", icon: "🏷️" },
    { name: "States", path: "/admin/states", icon: "🗺️" },
    { name: "Cities", path: "/admin/cities", icon: "🏙️" },
    { name: "Profile", path: "/admin/profile", icon: "👤" },
  ];

  return (
    <motion.aside
      className={`flex flex-col h-full bg-black text-white border-r border-gray-800 ${
        isCollapsed ? "w-12" : "w-56"
      }`}
      initial={{ width: isMobile ? "3rem" : "20%" }}
      animate={{ 
        width: isCollapsed ? (isMobile ? "3rem" : "3rem") : isMobile ? "12rem" : "14rem" 
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo/Header */}
      <motion.div
        className="flex items-center justify-center py-4 cursor-pointer hover:bg-gray-900"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ backgroundColor: "#1a1a1a" }}
      >
        {isCollapsed ? (
          <span className="text-lg font-bold text-yellow-400">A</span>
        ) : (
          <h1 className="text-lg font-bold text-yellow-400">ADMIN</h1>
        )}
      </motion.div>

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-1 p-1">
        {navItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <motion.div
              className={`flex items-center p-2 rounded-lg ${
                location.pathname === item.path ? "bg-gray-800" : "hover:bg-gray-800"
              } ${isCollapsed ? "justify-center px-2" : "justify-start px-3"}`} 
              whileHover={{ backgroundColor: "#1e1e1e" }}
              title={isCollapsed ? item.name : ""}
              tabIndex={0}
            >
              <span className="text-xl">{item.icon}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    className="ml-3 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        ))}
      </nav>

      {/* Collapse Toggle (Desktop) */}
      {!isMobile && (
        <motion.button
          className="mt-auto p-2 text-gray-400 hover:text-white text-sm" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ scale: 1.05 }}
        >
          {isCollapsed ? "→" : "←"}
        </motion.button>
      )}
    </motion.aside>
  );
};