import {
  CirclePlus,
  Globe,
  MapPin,
  Phone,
  Utensils,
  Truck,
  MessageSquare,
  BarChart3,
  Settings,
  ShoppingCart,
  CheckCircle,
  Package,
} from "lucide-react";
import { locations } from "../utils/data";

export const SideNav = () => {
  const directoryItems = [
    {
      name: "Menu Management",
      icon: <Utensils className="w-4 h-4" />,
      hasSubmenu: true,
      count: 45,
    },
    {
      name: "Categories",
      icon: <Package className="w-4 h-4" />,
      hasSubmenu: true,
      count: 8,
    },
    {
      name: "Order Management",
      icon: <ShoppingCart className="w-4 h-4" />,
      hasSubmenu: true,
      count: 23,
    },
    {
      name: "Delivery Tracking",
      icon: <Truck className="w-4 h-4" />,
      hasSubmenu: false,
      count: 5,
    },
    {
      name: "Customer Comments",
      icon: <MessageSquare className="w-4 h-4" />,
      hasSubmenu: true,
      count: 12,
    },
    {
      name: "Analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      hasSubmenu: false,
    },
  ];

  const operationalTeams = [
    { name: "Kitchen Staff", status: "online", count: 8 },
    { name: "Delivery Drivers", status: "mixed", count: 12, online: 7 },
    { name: "Customer Service", status: "online", count: 4 },
    { name: "Management", status: "online", count: 3 },
  ];

  const restaurantOwners = [
    {
      name: "Raghunanth Venu",
      role: "Owner & Manager",
      avatar: "RV",
      status: "online",
      restaurant_id: 1,
    },
    {
      name: "Clemence Onoja",
      role: "Co-Owner",
      avatar: "CO",
      status: "offline",
      restaurant_id: 1,
    },
    {
      name: "Monaz John",
      role: "Operations Manager",
      avatar: "MJ",
      status: "online",
      restaurant_id: 1,
    },
  ];

  const orderStats = [
    { label: "Pending Orders", count: 15, status: "warning" },
    { label: "In Preparation", count: 8, status: "info" },
    { label: "Out for Delivery", count: 5, status: "primary" },
    { label: "Completed Today", count: 127, status: "success" },
  ];

  return (
    <div className="w-80 bg-gray-900 text-white p-4 flex flex-col h-screen overflow-y-auto">
      {/* Header with Restaurant Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
          <span className="text-gray-900 font-bold text-sm">SP</span>
        </div>
        <div>
          <h1 className="text-white font-semibold text-sm">
            San Plasico Restaurant
          </h1>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MapPin className="w-3 h-3" />
            <span>Nairobi, Kenya - ID: 001</span>
          </div>
        </div>
      </div>

      {/* Restaurant Status & Tagline */}
      <div className="mb-4">
        <p className="text-purple-300 text-sm text-center mb-2">
          Indulge Where Flavor Meets Elegance
        </p>
        <div className="flex items-center justify-center gap-2 text-green-400 text-xs">
          <CheckCircle className="w-3 h-3" />
          <span>Restaurant Active • Accepting Orders</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {orderStats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded p-2 text-center">
            <div
              className={`text-lg font-bold ${
                stat.status === "success"
                  ? "text-green-400"
                  : stat.status === "warning"
                  ? "text-yellow-400"
                  : stat.status === "info"
                  ? "text-blue-400"
                  : "text-purple-400"
              }`}
            >
              {stat.count}
            </div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Edit Profile Button */}
      <button className="btn btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600 text-white mb-4 w-full text-sm">
        Edit Restaurant Profile
      </button>

      {/* Contact & Location Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-300 text-xs">
          <Globe className="w-3 h-3" />
          <span>sanplasico.com</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-xs">
          <Phone className="w-3 h-3" />
          <span>+254 745641 • Verified</span>
        </div>
      </div>

      {/* Service Areas */}
      <div className="mb-4">
        <div className="text-gray-400 text-xs mb-2">SERVICE AREAS</div>
        <div className="flex flex-wrap gap-1">
          {locations?.slice(0, 3).map((location, index) => (
            <span key={index} className="badge badge-outline text-xs px-2 py-1">
              {location.location}
            </span>
          ))}
          <span className="badge badge-outline text-xs px-2 py-1">
            Downtown
          </span>
        </div>
      </div>

      {/* Operational Teams Status */}
      <div className="mb-4">
        <div className="text-gray-400 text-xs mb-2">OPERATIONAL STATUS</div>
        {operationalTeams.map((team, index) => (
          <div key={index} className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  team.status === "online"
                    ? "bg-green-400"
                    : team.status === "mixed"
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
              ></div>
              <span className="text-gray-300 text-xs">{team.name}</span>
            </div>
            <div className="text-gray-400 text-xs">
              {team.online ? `${team.online}/${team.count}` : team.count}
            </div>
          </div>
        ))}
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Management Directory */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-400 text-xs font-semibold">
            MANAGEMENT DIRECTORY
          </h3>
          <CirclePlus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
        </div>
        <div className="space-y-1">
          {directoryItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-1 hover:bg-gray-800 rounded px-2 cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-gray-600 rounded-sm group-hover:border-purple-400"></div>
                {item.icon}
                <span className="text-gray-300 text-xs group-hover:text-white">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {item.count && (
                  <span className="bg-purple-600 text-white text-xs px-1 rounded-full">
                    {item.count}
                  </span>
                )}
                {item.hasSubmenu && (
                  <span className="text-gray-500 text-xs">▶</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* Restaurant Owners & Management */}
      <div className="mb-4">
        <h3 className="text-gray-400 text-xs font-semibold mb-3">
          RESTAURANT OWNERSHIP
        </h3>
        <div className="space-y-3">
          {restaurantOwners.map((owner, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {owner.avatar}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-gray-900 ${
                    owner.status === "online" ? "bg-green-400" : "bg-gray-500"
                  }`}
                ></div>
              </div>
              <div className="flex-1">
                <div className="text-white text-xs font-medium">
                  {owner.name}
                </div>
                <div className="text-gray-400 text-xs">{owner.role}</div>
              </div>
              <Settings className="w-3 h-3 text-gray-500 cursor-pointer hover:text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-auto pt-4">
        <button className="btn btn-outline border-gray-600 text-gray-300 hover:bg-gray-800 w-full text-xs">
          + Add Staff Member
        </button>
        <button className="btn btn-outline border-gray-600 text-gray-300 hover:bg-gray-800 w-full text-xs">
          View All Orders
        </button>
        <button className="btn btn-outline border-gray-600 text-gray-300 hover:bg-gray-800 w-full text-xs">
          Restaurant Settings
        </button>
      </div>
    </div>
  );
};
