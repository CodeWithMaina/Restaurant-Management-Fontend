// import React, { useState } from "react";
// import { Search, Filter } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { menuItemApi } from "../../features/api/menuItemApi";
// import { categoryApi } from "../../features/api/categoryApi";
// import { Loading } from "../Loading";
// import CategoryPill from "../CategoryPill";
// import MealCard from "../MealCard";

// const MealMenu: React.FC = () => {
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const {
//     data: menuItemData = [],
//     isLoading,
//     isError,
//   } = menuItemApi.useFetchMenuItemQuery();

//   const {
//     data: categoryData = [],
//     isLoading: isCategoryLoading,
//     isError: isCategoryError,
//   } = categoryApi.useFetchCategoryQuery();

//   const fetchMealsInCategory = (categoryId: number) => {
//     setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
//     navigate(`/category-items?id=${categoryId}`);
//   };

//   if (isLoading || isCategoryLoading) {
//     return <Loading />;
//   }

//   if (isError || isCategoryError) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         Error loading menu items
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
//       {/* Hero Section */}
//       <div className="relative py-20 px-4">
//         <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-300/5"></div>
//         <div className="relative max-w-7xl mx-auto text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-4">
//             <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
//               CUSTOMER FAVORITES
//             </span>
//           </h1>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto">
//             Discover our most loved dishes, crafted with passion and served with excellence
//           </p>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 pb-16">
//         {/* Search and Filters */}
//         <div className="mb-12">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="relative flex-1 max-w-md">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search dishes..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-yellow-400/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
//               />
//             </div>
//             <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800/50 text-yellow-400 rounded-xl border border-yellow-400/20 hover:bg-yellow-400/10 transition-all">
//               <Filter className="w-5 h-5" />
//               <span>Filter</span>
//             </button>
//           </div>
//         </div>

//         {/* Categories Section */}
//         <div className="mb-16">
//           <div className="flex items-center mb-8">
//             <h2 className="text-3xl font-bold text-white mr-4">Popular Categories</h2>
//             <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
//           </div>
          
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categoryData.map((category) => (
//               <CategoryPill
//                 key={category.id}
//                 id={category.id}
//                 title={category.name}
//                 fetchMealsInCategory={() => fetchMealsInCategory(category.id)}
//                 isSelected={selectedCategory === category.id}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Menu Items Section */}
//         <div>
//           <div className="flex items-center mb-8">
//             <h2 className="text-3xl font-bold text-white mr-4">Standout Dishes From Our Menu</h2>
//             <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
//           </div>
//           <p className="text-yellow-400/80 text-sm uppercase tracking-wider mb-8">SPECIAL DESSERTS</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {menuItemData.map((dish) => (
//               <MealCard
//                 key={dish.id}
//                 id={dish.id}
//                 title={dish.name}
//                 description={dish.description}
//                 price={dish.price}
//                 imageUrl={dish.imageUrl}
//                 category={dish.category?.name}
//                 restaurantName={dish.restaurant?.name}
//                 ingredients={dish.ingredients}
//                 active={dish.active}
//               />
//             ))}
//           </div>
          
//           {/* Load More Button */}
//           <div className="text-center mt-12">
//             <button className="px-8 py-3 bg-gray-800/50 text-yellow-400 font-medium rounded-xl border border-yellow-400/20 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all">
//               Load More Dishes
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealMenu;


// MealMenu.tsx
import React from "react";
import MealSection from "../MealSection";
import CategoryPill from "../CategoryPill";
import MealCard from "../MealCard";
import { menuItemApi } from "../../features/api/menuItemApi";
import { categoryApi } from "../../features/api/categoryApi";
import { Loading } from "../Loading";
import { useNavigate } from "react-router";

const MealMenu: React.FC = () => {

  const navigate = useNavigate();

  const {
    data: menuItemData,
    isLoading,
    isError,
  } = menuItemApi.useFetchMenuItemQuery();

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = categoryApi.useFetchCategoriesQuery();

  const fetchMealsInCategory = (categoryId: number) => {
    navigate(`/category-items?id=${categoryId}`)
      };

  if (isLoading || isCategoryLoading) {
    return (
      <div>
        {" "}
        <Loading />{" "}
      </div>
    );
  }

  if (isError || !menuItemData || isCategoryError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading menu items
      </div>
    );
  }

  return (
    <div className=" mx-auto px-4 bg-black py-8">
      <h1 className="text-4xl font-bold mb-8">CUSTOMER FAVORITES</h1>

      <MealSection title="Popular Categories">
        <div className="flex flex-wrap gap-4">
          {categoryData?.map((category) => (
            <CategoryPill
              key={category.id}
              fetchMealsInCategory={()=>fetchMealsInCategory(category.id)}
              title={category.name}
            />
          ))}
        </div>
      </MealSection>

      <MealSection
        title="Standout Dishes From Our Menu"
        subtitle="SPEECH, DESETS"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItemData.map((dish) => (
            <MealCard
              key={dish.id}
              id={dish.id}
              title={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={dish.imageUrl}
              category={dish.category.name}
              restaurantName={dish.restaurant.name}
              ingredients={dish.ingredients}
              active={dish.active} 
              />
          ))}
        </div>
      </MealSection>
    </div>
  );
};

export default MealMenu;
