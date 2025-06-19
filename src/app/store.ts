import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../features/api/userApi";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../features/auth/authSlice";


// Create a persist config for AuthState
const authPersistConfig = {
    key:'auth',
    storage,
    whitelist:['user','token','isAuthenticated','userType']
}

//Create a persistenet reducer for auth
const persistAuthReducer = persistReducer(authPersistConfig,authReducer);

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        //Use the persisted reducer
        auth: persistAuthReducer
    },

    middleware:(defaultMiddleware)=>defaultMiddleware({
        serializableCheck: false,
    }).concat(userApi.middleware)
})

// Export the persisted store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;