// types/restaurant.types.ts
export interface Restaurant {
  id: number;
  name: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
  createdAt: string;
  updatedAt: string;
  city: {
    name: string;
  };
}

export interface RestaurantResponse {
  data: Restaurant;
  message: string;
  success: boolean;
}