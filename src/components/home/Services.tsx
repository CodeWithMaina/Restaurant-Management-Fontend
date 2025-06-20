import React, { useState } from "react";
import {
  ChefHat,
  Clock,
  Gift,
  Utensils,
  Moon,
  Sun,
  ArrowRight,
  Star,
} from "lucide-react";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
}

const CulinaryServices: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const services: ServiceCard[] = [
    {
      id: "catering",
      title: "Premium Catering",
      description:
        "Delight your guests with our expertly crafted culinary creations",
      icon: <ChefHat className="w-8 h-8" />,
      color: "bg-yellow-400",
      features: ["Custom Menus", "Professional Service", "Fresh Ingredients"],
    },
    {
      id: "delivery",
      title: "Fast Delivery",
      description: "We deliver your meal faster to your door",
      icon: <Clock className="w-8 h-8" />,
      color: "bg-yellow-400",
      features: ["30min Delivery", "Hot & Fresh", "Real-time Tracking"],
    },
    {
      id: "online-ordering",
      title: "Online Ordering",
      description: "Explore menu & order with easy online ordering",
      icon: <Utensils className="w-8 h-8" />,
      color: "bg-yellow-400",
      features: ["Easy Interface", "24/7 Available", "Multiple Payment"],
    },
    {
      id: "gift-cards",
      title: "Gift Cards",
      description: "Give the gift of exceptional dining with our gift cards",
      icon: <Gift className="w-8 h-8" />,
      color: "bg-yellow-400",
      features: ["Digital Cards", "Custom Amounts", "No Expiry"],
    },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Header with Dark Mode Toggle */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl bg-yellow-400`}>
              <ChefHat className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold">CulinaryHub</span>
          </div>

          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                : "bg-gray-200 hover:bg-gray-300 text-yellow-600"
            }`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  isDarkMode
                    ? "bg-gray-800 text-yellow-400 border border-gray-700"
                    : "bg-gray-200 text-yellow-600 border border-gray-300"
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                OUR STORY & SERVICES
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Our Culinary Journey
                <br />
                <span className="text-yellow-400">And Services</span>
              </h1>

              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Rooted in passion, we create unforgettable dining experiences
                and offer exceptional culinary services, blending culinary
                artistry with warm hospitality.
              </p>
            </div>

            <button className="group inline-flex items-center px-8 py-4 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>Explore Services</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">500+</div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">1000+</div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Events Served
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">5★</div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Service Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={
                  "group relative p-6 bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
                }
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon with yellow background */}
                <div
                  className={`inline-flex p-3 rounded-xl ${service.color} text-black mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                  {service.title}
                </h3>

                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center text-xs"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2`}
                      ></div>
                      <span
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-yellow-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulinaryServices;
