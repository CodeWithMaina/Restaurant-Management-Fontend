import type { TCity } from "./city.types";

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
  city: TCity;
}