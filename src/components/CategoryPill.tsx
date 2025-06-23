// CategoryPill.tsx
import React from "react";

interface CategoryPillProps {
  id?: number;
  title: string;
  fetchMealsInCategory: ()=> void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ id, title, fetchMealsInCategory }) => {
  return (
    <div onClick={fetchMealsInCategory} className="btn badge badge-soft badge-warning lg:px-4 sm:2 lg:py-8 sm:py-5 lg:text-3xl md:text-2xl sm:text-2xl">{id}{title}</div>
  );
};

export default CategoryPill;
