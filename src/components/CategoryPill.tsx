// CategoryPill.tsx
import React from "react";

interface CategoryPillProps {
  id?: number;
  title: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ title }) => {
  return (
    <div className="btn badge badge-soft badge-warning lg:px-4 sm:2 lg:py-8 sm:py-5 lg:text-3xl md:text-2xl sm:text-2xl">{title}</div>
  );
};

export default CategoryPill;
