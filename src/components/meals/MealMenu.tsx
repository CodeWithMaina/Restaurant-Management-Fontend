// MealMenu.tsx
import React from 'react';
import MealSection from '../MealSection';
import CategoryPill from '../CategoryPill';
import MealCard from '../MealCard';


// Placeholder image URLs - replace with your actual images
const placeholderMainDish = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
const placeholderBreakfast = 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
const placeholderDessert = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
const placeholderBrowseAll = 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';

const salad1 = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
const salad2 = 'https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
const salad3 = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';

const MealMenu: React.FC = () => {
  const categories = [
    { title: 'Main Dish', subtitle: '(No choice)', active: true, imageUrl: placeholderMainDish },
    { title: 'Break Fast', subtitle: '(12 turns fast)', imageUrl: placeholderBreakfast },
    { title: 'Detsent', subtitle: '(48 draws)', imageUrl: placeholderDessert },
    { title: 'Browse All', subtitle: '(153 items)', imageUrl: placeholderBrowseAll },
  ];

  const standoutDishes = [
    {
      title: 'Fattonith salad',
      description: 'Fresh greens with premium ingredients',
      price: 24.0,
      rating: 4.9,
      imageUrl: salad1,
    },
    {
      title: 'Vegetable salad',
      description: 'Seasonal vegetables with house dressing',
      price: 26.0,
      rating: 4.6,
      imageUrl: salad2,
    },
    {
      title: 'Egg vegi salad',
      description: 'Organic eggs with mixed vegetables',
      price: 23.0,
      rating: 4.5,
      imageUrl: salad3,
    },
  ];

  return (
    <div className=" mx-auto px-4 bg-black py-8">
      <h1 className="text-4xl font-bold mb-8">CUSTOMER FAVORITES</h1>
      
      <MealSection title="Popular Categories">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <CategoryPill
              key={index}
              title={category.title}
              subtitle={category.subtitle}
              isActive={category.active}
              imageUrl={category.imageUrl}
            />
          ))}
        </div>
      </MealSection>

      <MealSection title="Standout Dishes From Our Menu" subtitle="SPEECH, DESETS">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standoutDishes.map((dish, index) => (
            <MealCard
              key={index}
              title={dish.title}
              description={dish.description}
              price={dish.price}
              rating={dish.rating}
              imageUrl={dish.imageUrl}
            />
          ))}
        </div>
      </MealSection>
    </div>
  );
};

export default MealMenu;