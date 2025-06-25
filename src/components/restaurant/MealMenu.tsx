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
  } = categoryApi.useFetchCategoryQuery();

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
