// import React from "react";
// import {
//   Star,
//   Clock,
//   MapPin,
//   Heart,
//   ShoppingCart,
//   Check,
//   X,
// } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../features/cart/cartSlice";

// interface MealCardProps {
//   id: number;
//   title: string;
//   description: string;
//   price: number | string;
//   imageUrl?: string | null;
//   category?: string;
//   restaurantName?: string;
//   ingredients?: string;
//   active?: boolean;
//   rating?: number;
//   cookTime?: string;
// }

// const MealCard: React.FC<MealCardProps> = ({
//   id,
//   title,
//   description,
//   price,
//   imageUrl,
//   category = "Uncategorized",
//   restaurantName = "Unknown Restaurant",
//   ingredients = [],
//   active = true,
//   rating = 4.5,
//   cookTime = "20 min",
// }) => {
//   const dispatch = useDispatch();

//   const numericPrice = typeof price === "string" ? parseFloat(price) : price;

//   const handleAddToCart = () => {
//     if (!active) return;
//     dispatch(
//       addItemToCart({
//         id,
//         name: title,
//         price: numericPrice,
//         imageUrl: imageUrl || undefined,
//       })
//     );
//   };

//   const toggleFavorite = () => {
//     console.log(`Toggling favorite for item: ${id}`);
//   };

//   return (
//     <div className="group bg-gray-900/50 rounded-2xl overflow-hidden border border-yellow-400/10 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-400/10">
//       {/* Image */}
//       <div className="relative h-48 overflow-hidden">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-amber-50 to-orange-100 flex items-center justify-center">
//             <img
//               src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
//               alt={title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

//         {/* Floating badges */}
//         <div className="absolute top-4 left-4 flex space-x-2">
//           <div className="bg-yellow-400 text-black px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1">
//             <Star className="w-3 h-3 fill-current" />
//             <span>{rating}</span>
//           </div>
//         </div>

//         <button
//           onClick={toggleFavorite}
//           className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-yellow-400 hover:text-black transition-colors"
//         >
//           <Heart className="w-4 h-4" />
//         </button>

//         {/* Availability badge */}
//         <div className="absolute bottom-4 right-4">
//           <div
//             className={`flex items-center px-2 py-1 rounded-full ${
//               active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//             }`}
//           >
//             {active ? (
//               <>
//                 <Check className="w-4 h-4" />
//                 <span className="ml-1 text-sm font-semibold">Available</span>
//               </>
//             ) : (
//               <>
//                 <X className="w-4 h-4" />
//                 <span className="ml-1 text-sm font-semibold">Unavailable</span>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-6">
//         <div className="flex items-start justify-between mb-3">
//           <div>
//             <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">
//               {title}
//             </h3>
//             <div className="flex items-center space-x-4 text-sm text-gray-400">
//               <div className="flex items-center space-x-1">
//                 <MapPin className="w-3 h-3" />
//                 <span>{restaurantName}</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Clock className="w-3 h-3" />
//                 <span>{cookTime}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

//         {/* Ingredients */}
//         {ingredients && (
//           <div className="mb-4">
//             <h4 className="text-sm font-semibold text-yellow-400 mb-1">
//               Ingredients:
//             </h4>
//             <div className="px-3 py-2 bg-yellow-400/10 text-yellow-400 text-sm rounded-lg border border-yellow-400/20">
//               {ingredients}
//             </div>
//           </div>
//         )}

//         {/* Price and Add to Cart */}
//         <div className="flex items-center justify-between">
//           <div className="text-2xl font-bold text-yellow-400">
//             ${numericPrice.toFixed(2)}
//           </div>
//           <button
//             onClick={handleAddToCart}
//             disabled={!active}
//             className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg ${
//               active
//                 ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-black hover:from-yellow-300 hover:to-yellow-400 hover:shadow-yellow-400/25 hover:scale-105"
//                 : "bg-gray-800/50 text-gray-400 cursor-not-allowed"
//             }`}
//           >
//             <ShoppingCart className="w-4 h-4" />
//             <span>{active ? "Add to Cart" : "Unavailable"}</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealCard;



// import React from "react";
// import { Check, X } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { addItemToCart } from "../features/cart/cartSlice";

// interface MealCardProps {
//   id: number;
//   title: string;
//   description: string;
//   price: number | string;
//   imageUrl?: string | null;
//   category?: string;
//   restaurantName?: string;
//   ingredients?: string;
//   active?: boolean;
// }

// const MealCard: React.FC<MealCardProps> = ({
//   id,
//   title,
//   description,
//   price,
//   imageUrl,
//   category = "Uncategorized",
//   restaurantName = "Unknown Restaurant",
//   ingredients,
//   active = true,
// }) => {
//   const dispatch = useDispatch();

//    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

//   const handleAddToCart = () => {
//     dispatch(addItemToCart({
//       id,
//       name: title,
//       price: numericPrice,
//       imageUrl: imageUrl || undefined,
//     }));
//   };
//   return (
//     <div
//       className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
//         !active ? "opacity-70" : ""
//       }`}
//     >
//       <div className="relative h-48 w-full">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full bg-gradient-to-r from-amber-50 to-orange-100 flex items-center justify-center">
//             <img
//               src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
//               alt={title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         <div className="absolute top-3 right-3 flex items-center space-x-2">
//           <div
//             className={`flex items-center px-2 py-1 rounded-full ${
//               active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//             }`}
//           >
//             {active ? (
//               <>
//                 <Check className="w-4 h-4" />
//                 <span className="ml-1 text-sm font-semibold">Available</span>
//               </>
//             ) : (
//               <>
//                 <X className="w-4 h-4" />
//                 <span className="ml-1 text-sm font-semibold">Unavailable</span>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="p-5">
//         <div className="flex justify-between items-start mb-2">
//           <h3 className="text-xl font-bold text-gray-900">{title}</h3>
//           <span className="text-2xl font-bold text-black">
//             ${numericPrice.toFixed(2)}
//           </span>
//         </div>

//         <div className="flex items-center text-sm text-gray-500 mb-3">
//           <span className="bg-gray-100 px-2 py-1 rounded mr-2">{category}</span>
//           <span className="truncate" title={restaurantName}>
//             @{restaurantName}
//           </span>
//         </div>

//         <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

//         {ingredients && (
//           <div className="mb-4">
//             <h4 className="text-sm font-semibold text-gray-700 mb-1">
//               Ingredients:
//             </h4>
//             <p className="text-sm text-gray-500 line-clamp-2">{ingredients}</p>
//           </div>
//         )}

//         <button
//           onClick={() => handleAddToCart()}
//           className={`btn w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
//             !active ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           disabled={!active}
//         >
//           {active ? "Add to Cart" : "Currently Unavailable"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MealCard;


import React from "react";
import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cart/cartSlice";

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
  id,
  title,
  description,
  price,
  imageUrl,
  category = "Uncategorized",
  restaurantName = "Unknown Restaurant",
  ingredients,
  active = true,
}) => {
  const dispatch = useDispatch();

   const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  const handleAddToCart = () => {
    dispatch(addItemToCart({
      id,
      name: title,
      price: numericPrice,
      imageUrl: imageUrl || undefined,
    }));
  };
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
            ${numericPrice.toFixed(2)}
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
          onClick={() => handleAddToCart()}
          className={`btn w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
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