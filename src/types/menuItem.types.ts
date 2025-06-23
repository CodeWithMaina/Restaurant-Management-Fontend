// Define types for nested objects
interface Category {
  name: string;
}

interface Restaurant {
  name: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
}

interface OrderItem {
  comment: string | null; // Assuming comment can be null if not provided
  itemPrice: string; // or number if converted
  menuItemId: number;
  orderId: number;
  price: string; // or number if converted
  quantity: number;
}

// Main MenuItem type
export interface MenuItem {
  active: boolean;
  category: Category;
  categoryId: number;
  createdAt: string; 
  description: string;
  id: number;
  ingredients: string;
  name: string;
  orderItems: OrderItem[];
  price: string; // or number if converted
  restaurant: Restaurant;
  restaurantId: number;
  updatedAt: string; // ISO date string
  imageUrl?: string | null;
}

// The response type is an array of MenuItems
export type MenuItemsResponse = MenuItem[];