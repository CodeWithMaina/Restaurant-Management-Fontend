import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthSate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: null | any;
  token: string | null;
  isAuthenticated: boolean;
  userType: string | null;
}

const initialState: AuthSate = {
  user: null,
  token: null,
  isAuthenticated: false,
  userType: null,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setCredantials: (
      state,
      action: PayloadAction<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user: any;
        token: string;
        userType: string | null;
      }>
    ) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.isAuthenticated = true;
    },
    clearCreadentials:(state)=>{
        state.user = null;
      state.token = null;
      state.userType = null;
      state.isAuthenticated = false;
    }
  },
});

export const { setCredantials, clearCreadentials } = authSlice.actions;
export default authSlice.reducer;
