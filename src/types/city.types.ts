import type { TState } from "./state.types";

export type TCity = {
  id: number;
  name: string;
  stateId: number;
  state: TState;
};


export type TCityState = {
  id: number;
  name: string;
  stateId: number;
};