import { motion } from "framer-motion";

export const Loading = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const dotVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -15, 0],
      transition: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 1.5,
        ease: "easeInOut" as const 
      }
    }
  };

  const colors = [
    "bg-yellow-400",    // Yellow
    "bg-green-500",     // Medium green
    "bg-green-300",     // Light green
    "bg-gray-400",      // Gray
    "bg-green-700"      // Dark green
  ];

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen w-full bg-black space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated dots */}
      <div className="flex space-x-4">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className={`w-6 h-6 rounded-full ${color}`}
            variants={dotVariants}
            animate="visible"
            custom={index}
            style={{
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)"
            }}
          />
        ))}
      </div>

      {/* Text with gradient */}
      <motion.h2
        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-green-400 to-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Loading...
      </motion.h2>

      {/* Progress bar */}
      <motion.div
        className="h-2 w-64 bg-gray-800 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-green-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut" as const 
          }}
        />
      </motion.div>
    </motion.div>
  );
};