import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { menuItemApi } from "../features/api/menuItemApi";
import { categoryApi } from "../features/api/categoryApi";
import MealCard from "../components/MealCard";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";
import { ArrowLeft } from "lucide-react";
import { ErrorMessage } from "../components/ErrorMessage";

type CategoryItemsPageParams = {
  categoryId: string | null;
};

export const CategoryItemsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params: CategoryItemsPageParams = {
    categoryId: searchParams.get("id"),
  };

  const categoryId = params.categoryId;
  
  // Fetch category and menu items data
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryError
  } = categoryApi.useFetchCategoryByIdQuery(categoryId);
  
  const {
    data: menuItemData,
    isLoading: isMenuItemsLoading,
    error: menuItemsError
  } = menuItemApi.useFetchMenuItemQuery();

  // Filter menu items by category
  const categoryMenuItem = useMemo(() => 
    menuItemData?.filter(item => item.categoryId === Number(categoryId)) || [],
    [menuItemData, categoryId]
  );

  // Loading and error states
  if (isCategoryLoading || isMenuItemsLoading) {
    return <Loading />;
  }

  if (categoryError || menuItemsError) {
    return <ErrorMessage message="Failed to load category items. Please try again later." />;
  }

  if (!categoryMenuItem.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Categories
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Items Found
        </h2>
        <p className="text-gray-600">
          There are currently no items available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark mb-4"
        >
          <ArrowLeft className="mr-2" /> Back to Categories
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {categoryData?.name || "Category Items"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {categoryData?.description || "Discover our delicious offerings"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
      </div>
    </div>
  );
};