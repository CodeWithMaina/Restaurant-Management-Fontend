type Restaurant = {
  name: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
};

export type Category = {
  id: number;
  name: string;
};

type OrderItem = {
  orderId: number;
  menuItemId: number;
  quantity: number;
  itemPrice: string;
  price: string;
  comment: string;
};

export type MenuItem = {
  imageUrl: string | null | undefined;
  id: number;
  name: string;
  restaurantId: number;
  categoryId: number;
  description: string;
  ingredients: string;
  price: number | string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  restaurant: Restaurant;
  category: Category;
  orderItems: OrderItem[];
};

// If you want to exclude createdAt and updatedAt (as in your normalization example)
// type MenuItemSelect = Omit<MenuItem, 'createdAt' | 'updatedAt'>;

// For the array of menu items
export type MenuItemsResponse = MenuItem[];
// type MenuItemsSelectResponse = MenuItemSelect[];


export type MenuItemFormValues = {
  name: string;
  restaurantId: number;
  categoryId: number;
  description: string;
  ingredients: string;
  price: number;
  active: boolean;
};
