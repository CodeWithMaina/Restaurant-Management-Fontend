
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
  id?: number;
  data: Restaurant;
  message: string;
  success: boolean;
}





// types/restaurant.types.ts
// export type TRestaurant = {
//   id: number;
//   name: string;
//   streetAddress: string;
//   zipCode: string;
//   city: {
//     id: number;
//     name: string;
//     state: {
//       name: string;
//     };
//   };
// };

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
  id?: number;
  name: string;
  streetAddress: string;
  zipCode: string;
  city: {
    id: number;
    name: string;
    state: {
      name: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

export type TRestaurantFormData = {
  id?: number;
  name: string;
  streetAddress: string;
  zipCode: string;
  cityId: number;
};



export type TCity = {
  id: number;
  name: string;
  state: {
    id: number;
    name: string;
    code: string;
  };
};

export type TRestaurant = {
  id: number;
  name: string;
  streetAddress: string;
  zipCode: string;
  city: TCity;
  createdAt?: string;
  updatedAt?: string;
};

// export type TRestaurantFormData = {
//   name: string;
//   streetAddress: string;
//   zipCode: string;
//   cityId: number;
// };