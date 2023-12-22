import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store.ts";
import { User } from "../../models/User.ts";

interface AuthState {
  user: User;
  authed: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: {} as User,
  authed: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.authed = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setAuth, setUser, setLoading } = authSlice.actions;

export const selectMain = (state: RootState) => state.main;

export default authSlice.reducer;
