// features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalAmount += action.payload.price;
    },
    
    // Dedicated increase quantity action
    increaseItemQuantity(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }
    },
    
    // Dedicated decrease quantity action
    decreaseItemQuantity(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);

      if (!existingItem) return;

      if (existingItem.quantity === 1) {
        // Remove item if quantity reaches 0
        state.items = state.items.filter(item => item.id !== itemId);
      } else {
        existingItem.quantity--;
      }

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
    },
    
    // Improved delete item action
    deleteItemFromCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const itemToRemove = state.items.find(item => item.id === itemId);
      
      if (!itemToRemove) return;

      state.totalQuantity -= itemToRemove.quantity;
      state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
      state.items = state.items.filter(item => item.id !== itemId);
    },
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;