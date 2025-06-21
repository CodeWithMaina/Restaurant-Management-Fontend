// MealMenu.tsx
import React from "react";
import MealSection from "../MealSection";
import CategoryPill from "../CategoryPill";
import MealCard from "../MealCard";
import { menuItemApi } from "../../features/api/menuItemApi";
import { categoryApi } from "../../features/api/categoryApi";
import { Loading } from "../Loading";

// Placeholder image URLs - replace with your actual images
// const placeholderMainDish =
//   "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";
// const placeholderBreakfast =
//   "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";
// const placeholderDessert =
//   "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";
// const placeholderBrowseAll =
//   "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";


const MealMenu: React.FC = () => {
  const { data: menuItemData, isLoading, isError } = menuItemApi.useFetchMenuItemQuery();
  const {data: categoryData, isLoading: isCategoryLoading, isError: isCategoryError} = categoryApi.useFetchCategoryQuery();

  console.log(categoryData)
  if (isLoading || isCategoryLoading) {
    return (<div > <Loading/> </div>);
  }

  if (isError || !menuItemData || isCategoryError) {
    return <div className="text-center py-8 text-red-500">Error loading menu items</div>;
  }


  return (
    <div className=" mx-auto px-4 bg-black py-8">
      <h1 className="text-4xl font-bold mb-8">CUSTOMER FAVORITES</h1>

      <MealSection title="Popular Categories">
        <div className="flex flex-wrap gap-4">
          {
            categoryData?.map((category)=>(<CategoryPill key={category.id} title={category.name}/>))
          }
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
