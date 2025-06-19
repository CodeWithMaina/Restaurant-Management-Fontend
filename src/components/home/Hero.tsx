import { Phone, Star } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="bg-black text-white px-6 py-12 md:py-20 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12 w-full">
      {/* Left Side */}
      <div className="flex flex-col gap-6 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Grab Big Deals <br /> on{" "}
          <span className="text-yellow-400">Yummy Meals!</span>
        </h1>
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet consectetur. Aenean mauris nam tortor
          curabitur phasellus.
        </p>

        <Link
          className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full w-fit"
          to="/"
        >
          Get Started
        </Link>

        {/* Happy Customers */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex -space-x-3">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt="Customer"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="Customer"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="Customer"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
          <div>
            <p className="text-sm">Our Happy Customers</p>
            <div className="flex items-center text-yellow-400">
              <Star className="mr-1" />
              <span className="text-white font-semibold">4.8</span>
              <span className="text-gray-400 ml-2">(18.5k Review)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative w-full max-w-lg">
        <img
          src="https://images.unsplash.com/photo-1605478902915-7c2cfb2c42c9"
          alt="Grilled Chicken"
          className="rounded-3xl shadow-xl object-cover w-full h-auto"
        />

        {/* Floating Contact Card */}
        <div className="absolute bottom-5 left-5 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
          <img
            src="https://i.pravatar.cc/30?img=5"
            alt="Jon"
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <p className="font-bold">Jon Williamson</p>
            <p className="text-gray-400 text-xs">Food Courier</p>
          </div>
          <button className="bg-yellow-400 w-8 h-8 p-0 rounded-full ml-2">
            <Phone className="text-black text-sm" />
          </button>
        </div>

        {/* Pizza Card */}
        <div className="absolute bottom-5 right-5 bg-white text-black px-3 py-2 rounded-xl shadow-md flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1594007654729-407eedc4be95"
            alt="Pizza"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-bold text-sm">Cheese Pizza</p>
            <div className="flex items-center gap-1 text-yellow-400 text-sm">
              <Star /> <Star /> <Star /> <Star />
            </div>
            <p className="text-sm font-semibold text-gray-800">₹299/-</p>
          </div>
        </div>
      </div>
    </section>
  );
}
