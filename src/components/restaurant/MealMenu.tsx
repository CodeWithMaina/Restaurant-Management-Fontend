// MealMenu.tsx
import React from "react";
import { useNavigate } from "react-router";
import { menuItemApi } from "../../features/api/menuItemApi";
import { categoryApi } from "../../features/api/categoryApi";
import { Loading } from "../Loading";
import CategoryPill from "../CategoryPill";
import MealCard from "../MealCard";

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
    navigate(`/category-items?id=${categoryId}`);
  };

  if (isLoading || isCategoryLoading) {
    return <Loading />;
  }

  if (isError || !menuItemData || isCategoryError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading menu items
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 md:px-8 py-8 bg-black text-white">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
          CUSTOMER FAVORITES
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover our most loved dishes, crafted with passion and served with excellence
        </p>
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
          Popular Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          {categoryData?.map((category) => (
            <CategoryPill
              key={category.id}
              fetchMealsInCategory={() => fetchMealsInCategory(category.id)}
              title={category.name}
            />
          ))}
        </div>
      </section>

      {/* Menu Items Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Standout Dishes
          </h2>
          <span className="text-yellow-400 text-sm uppercase tracking-wider">
            SPECIAL DESSERTS
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItemData.map((dish) => (
            <MealCard
              key={dish.id}
              id={dish.id}
              title={dish.name}
              description={dish.description}
              price={dish.price}
              imageUrl={dish.imageUrl}
              category={dish.category?.name}
              restaurantName={dish.restaurant?.name}
              ingredients={dish.ingredients}
              active={dish.active}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MealMenu;