import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/api/authApi";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import { menuItemApi } from "../features/api/menuItemApi";
import { categoryApi } from "../features/api/categoryApi";
import { userApi } from "../features/api/userApi";
import { restaurantApi } from "../features/api/restaurantApi";

// Create a persist config for AuthState
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthenticated", "userType"],
};

//Create a persistenet reducer for auth
const persistAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [restaurantApi.reducerPath]: restaurantApi.reducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    //Use the persisted reducer
    auth: persistAuthReducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      userApi.middleware,
      menuItemApi.middleware,
      categoryApi.middleware,
      restaurantApi.middleware
    ),
});

// Export the persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
