import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import { menuItemApi } from "../features/api/menuItemApi";
import { categoryApi } from "../features/api/categoryApi";
import { userApi } from "../features/api/userApi";
import { restaurantApi } from "../features/api/restaurantApi";
import cartReducer from "../features/cart/cartSlice";
import { orderApi } from "../features/api/ordersApi";
import { commentApi } from "../features/api/commentApi";
import { statesApi } from "../features/api/statesApi";
import { citiesApi } from "../features/api/citiesApi";

// Persist configs
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthenticated", "userType", "restaurantId"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "totalQuantity", "totalAmount"],
};

// Create persisted reducers
const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [statesApi.reducerPath]: statesApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    auth: persistAuthReducer,
    cart: persistCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      menuItemApi.middleware,
      categoryApi.middleware,
      restaurantApi.middleware,
      orderApi.middleware,
      statesApi.middleware,
      citiesApi.middleware,
      commentApi.middleware
    ),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;