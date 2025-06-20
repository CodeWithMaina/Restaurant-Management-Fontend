// CategoryPill.tsx
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CategoryPillProps {
  title: string;
  subtitle: string;
  isActive?: boolean;
  imageUrl: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ title, subtitle, isActive = false, imageUrl }) => {
  return (
    <div 
      className={`flex flex-col p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 overflow-hidden ${
        isActive ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <div className="relative h-32 mb-3 rounded-md overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isActive ? 'from-yellow-400/80' : 'from-gray-900/40'} to-transparent`} />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{title}</h3>
        <ChevronRight className="w-5 h-5" />
      </div>
      <p className="text-sm opacity-75">{subtitle}</p>
    </div>
  );
};

export default CategoryPill;