import { Phone, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-black text-white px-6 py-12 md:py-20 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12 w-full overflow-hidden">
      {/* Left Side */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-6 max-w-xl"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Grab Big Deals <br /> on{" "}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-yellow-400"
          >
            Yummy Meals!
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-300"
        >
          Lorem ipsum dolor sit amet consectetur. Aenean mauris nam tortor
          curabitur phasellus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full w-fit hover:bg-yellow-500 transition-colors duration-300 flex items-center gap-2"
            to="/"
          >
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get Started
            </motion.span>
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

        {/* Happy Customers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center gap-4 mt-6"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3].map((imgNum) => (
              <motion.img
                key={imgNum}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + imgNum * 0.1, type: "spring" }}
                src={`https://i.pravatar.cc/40?img=${imgNum}`}
                alt="Customer"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div>
            <p className="text-sm">Our Happy Customers</p>
            <div className="flex items-center text-yellow-400">
              <Star className="mr-1" />
              <span className="text-white font-semibold">4.8</span>
              <span className="text-gray-400 ml-2">(18.5k Review)</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative w-full max-w-lg"
      >
        <motion.img
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
          src="https://images.unsplash.com/photo-1605478902915-7c2cfb2c42c9"
          alt="Grilled Chicken"
          className="rounded-3xl shadow-xl object-cover w-full h-auto"
        />

        {/* Floating Contact Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          whileHover={{ y: -5 }}
          className="absolute bottom-5 left-5 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm"
        >
          <img
            src="https://i.pravatar.cc/30?img=5"
            alt="Jon"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-bold">Jon Williamson</p>
            <p className="text-gray-400 text-xs">Food Courier</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-yellow-400 w-8 h-8 p-0 rounded-full ml-2 flex items-center justify-center"
          >
            <Phone className="text-black text-sm" />
          </motion.button>
        </motion.div>

        {/* Pizza Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ x: -5 }}
          className="absolute bottom-5 right-5 bg-white text-black px-3 py-2 rounded-xl shadow-md flex items-center gap-3 backdrop-blur-sm bg-opacity-90"
        >
          <img
            src="https://images.unsplash.com/photo-1594007654729-407eedc4be95"
            alt="Pizza"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-bold text-sm">Cheese Pizza</p>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <Star className="w-3 h-3" /> 
              <Star className="w-3 h-3" /> 
              <Star className="w-3 h-3" /> 
              <Star className="w-3 h-3" />
            </div>
            <p className="text-sm font-semibold text-gray-800">₹299/-</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}