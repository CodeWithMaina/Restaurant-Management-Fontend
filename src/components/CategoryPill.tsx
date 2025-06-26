import React from "react";

interface CategoryPillProps {
  id?: number;
  title: string;
  fetchMealsInCategory: () => void;
  isSelected?: boolean;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ 
  id, 
  title, 
  fetchMealsInCategory,
  isSelected = false 
}) => {
  return (
    <button
      onClick={fetchMealsInCategory}
      className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-br from-yellow-400 to-yellow-300 text-black shadow-2xl shadow-yellow-400/25'
          : 'bg-gray-900/50 border border-yellow-400/20 text-white hover:bg-yellow-400/10 hover:border-yellow-400/40'
      }`}
    >
      <div className="relative z-10">
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className={`text-xs ${
          isSelected ? 'text-black/70' : 'text-gray-400'
        }`}>
          {/* Optional: Add count if available */}
        </p>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
};

export default CategoryPill;


// // CategoryPill.tsx
// import React from "react";

// interface CategoryPillProps {
//   id?: number;
//   title: string;
//   fetchMealsInCategory: ()=> void;
// }

// const CategoryPill: React.FC<CategoryPillProps> = ({ id, title, fetchMealsInCategory }) => {
//   return (
//     <div onClick={fetchMealsInCategory} className="btn badge badge-soft badge-warning lg:px-4 sm:2 lg:py-8 sm:py-5 lg:text-3xl md:text-2xl sm:text-2xl">{id}{title}</div>
//   );
// };

// export default CategoryPill;
