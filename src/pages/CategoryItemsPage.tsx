import { useSearchParams } from "react-router-dom";
import MealSection from "../components/MealSection";
import { menuItemApi } from "../features/api/menuItemApi";
import { useMemo } from "react";
import MealCard from "../components/MealCard";
import { categoryApi } from "../features/api/categoryApi";

type CategoryItemsPageParams = {
  categoryId: string | null;
};

export const CategoryItemsPage = () => {
  //Getting category ID from the query params
  const [searchParams] = useSearchParams();
  const params: CategoryItemsPageParams = {
    categoryId: searchParams.get("id"),
  };

  const categoryId = params.categoryId;
  const {data: categoryData} = categoryApi.useFetchCategoryByIdQuery(categoryId);
  console.log(categoryData)
  const {data: menuItemData} = menuItemApi.useFetchMenuItemQuery();

  //Getting data where categoryId aligns
  const categoryMenuItem = useMemo(() => 
  menuItemData?.filter(item => item.categoryId === Number(categoryId)) || [],
  [menuItemData, categoryId]
);

// console.log(menuItemData)

  return (
    <MealSection
      title="dfsghfg"
      subtitle="Where taste matters"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryMenuItem.map((dish) => (
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
  );
};
