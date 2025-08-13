// customerSideNav.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const CustomersideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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
    { name: "Food", path: "/restaurant/food", icon: "🍔" },
    { name: "Cart", path: "/restaurant/cart", icon: "🛒" },
    { name: "Orders", path: "/restaurant/orders", icon: "📦" },
    { name: "Profile", path: "/restaurant/profile", icon: "👤" },
  ];

  return (
    <motion.aside
      className={`flex flex-col h-screen bg-gray-900 text-white border-r border-gray-800 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      initial={{ width: isMobile ? "4rem" : "16rem" }}
      animate={{ 
        width: isCollapsed ? "4rem" : isMobile ? "16rem" : "16rem" 
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo/Header */}
      {/* <motion.div
        className="flex items-center justify-center py-4 px-2 cursor-pointer bg-gray-800"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ backgroundColor: "#1a1a1a" }}
      >
        {isCollapsed ? (
          <span className="text-xl font-bold text-yellow-400">D</span>
        ) : (
          <h1 className="text-xl font-bold text-yellow-400">DASHBOARD</h1>
        )}
      </motion.div> */}

      {/* Navigation Items - Scrollable Area */}
      <nav className="flex-1 overflow-y-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {navItems.map((item) => (
          <Link to={item.path} key={item.name}>
            <motion.div
              className={`flex items-center p-3 rounded-lg mx-1 my-1 ${
                location.pathname === item.path 
                  ? "bg-yellow-400/10 border border-yellow-400/30" 
                  : "hover:bg-gray-800"
              } ${isCollapsed ? "justify-center" : "justify-start"}`} 
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
          className="mt-auto p-3 text-gray-400 hover:text-yellow-400 text-sm bg-gray-800 flex items-center justify-center" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          whileHover={{ backgroundColor: "#1a1a1a" }}
        >
          {isCollapsed ? (
            <span className="text-lg">→</span>
          ) : (
            <span className="text-lg">← Collapse</span>
          )}
        </motion.button>
      )}
    </motion.aside>
  );
};