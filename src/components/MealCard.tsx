// MealCard.tsx
import React from 'react';
import { Star } from 'lucide-react';

interface MealCardProps {
  title: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
}

const MealCard: React.FC<MealCardProps> = ({ title, description, price, rating, imageUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex items-center bg-yellow-400 px-2 py-1 rounded-full">
          <Star className="w-4 h-4 fill-current text-yellow-600" />
          <span className="ml-1 text-sm font-semibold">{rating}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-black">${price.toFixed(2)}</span>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;