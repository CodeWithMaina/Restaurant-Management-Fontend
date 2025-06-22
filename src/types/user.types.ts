interface State {
  id: number;
  name: string;
  code: string;
}

interface City {
  id: number;
  name: string;
  stateId: number;
  state: State;
}

export interface TAddress {
  id: number;
  streetAddress1: string;
  streetAddress2: string | null;
  zipCode: string;
  deliveryInstructions: string | null;
  userId: number;
  cityId: number;
  createdAt: string;
  updatedAt: string;
  city: City;
}

interface Restaurant {
  id: number;
  name: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
  createdAt: string;
  updatedAt: string;
}

interface OwnedRestaurant {
  id: number;
  restaurantId: number;
  ownerId: number;
  restaurant: Restaurant;
}

interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  itemPrice: string;
  price: string;
  comment: string | null;
}

interface OrderStatus {
  id: number;
  orderId: number;
  statusCatalogId: number;
  createdAt: string;
}

interface Order {
  id: number;
  restaurantId: number;
  estimatedDeliveryTime: string;
  actualDeliveryTime: string | null;
  deliveryAddressId: number;
  userId: number;
  driverId: number | null;
  price: string;
  discount: string;
  finalPrice: string;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  statuses: OrderStatus[];
}

interface Comment {
  id: number;
  orderId: number;
  userId: number;
  commentText: string;
  isComplaint: boolean;
  isPraise: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Driver {
  id: number;
  carMake: string;
  carModel: string;
  carYear: number;
  userId: number;
  online: boolean;
  delivering: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TUserType = 'admin' | 'customer' | 'driver' | 'restaurant_owner';

export interface TUser {
  id: number;
  name: string;
  contactPhone: string;
  phoneVerified: boolean;
  email: string;
  emailVerified: boolean;
  confirmationCode: string | null;
  password: string;
  userType: TUserType;
  createdAt: string;
  updatedAt: string;
  addresses: TAddress[];
  driver: Driver | null;
  ownedRestaurants: OwnedRestaurant[];
  orders: Order[];
  comments: Comment[];
}

// Response type for the HTTP endpoint
export type TUsersResponse = TUser[];