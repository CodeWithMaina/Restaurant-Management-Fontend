import React from "react";
import { Check, X } from "lucide-react";

interface MealCardProps {
  id: number;
  title: string;
  description: string;
  price: number | string;
  imageUrl?: string | null;
  category?: string;
  restaurantName?: string;
  ingredients?: string;
  active?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({
  title,
  description,
  price,
  imageUrl,
  category = "Uncategorized",
  restaurantName = "Unknown Restaurant",
  ingredients,
  active = true,
}) => {
  const priceValue = typeof price === "string" ? parseFloat(price) : price;

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        !active ? "opacity-70" : ""
      }`}
    >
      <div className="relative h-48 w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-amber-50 to-orange-100 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <div
            className={`flex items-center px-2 py-1 rounded-full ${
              active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {active ? (
              <>
                <Check className="w-4 h-4" />
                <span className="ml-1 text-sm font-semibold">Available</span>
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                <span className="ml-1 text-sm font-semibold">Unavailable</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <span className="text-2xl font-bold text-black">
            ${priceValue.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded mr-2">{category}</span>
          <span className="truncate" title={restaurantName}>
            @{restaurantName}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {ingredients && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">
              Ingredients:
            </h4>
            <p className="text-sm text-gray-500 line-clamp-2">{ingredients}</p>
          </div>
        )}

        <button
          className={`w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
            !active ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!active}
        >
          {active ? "Add to Cart" : "Currently Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default MealCard;
