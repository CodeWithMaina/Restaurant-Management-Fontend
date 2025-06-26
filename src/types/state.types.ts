import type { TCityState } from "./city.types";

export type TState = {
  id: number;
  code: string;
  name: string;
  city: TCityState;
};