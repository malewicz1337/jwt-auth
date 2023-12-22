import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";
import { setUser, setAuth, setLoading } from "../slices/authSlice";
import { User } from "../../models/User";
import axios from "axios";
import { AuthResponse } from "../../models/responses/AuthResponse";
import { API_URL } from "../../axios";

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { dispatch }) => {
    try {
      const response = await AuthService.login(email, password);

      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error("Login failed", error);
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async ({ email, password }: LoginPayload, { dispatch }) => {
    try {
      const response = await AuthService.registration(email, password);

      localStorage.setItem("token", response.data.accessToken);
      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error("Registration failed", error);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_args, { dispatch }) => {
    try {
      await AuthService.logout();

      localStorage.removeItem("token");
      dispatch(setAuth(false));
      dispatch(setUser({} as User));
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
);

export const chechAuth = createAsyncThunk(
  "auth/check",
  async (_args, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.accessToken);

      dispatch(setAuth(true));
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error("Check Auth failed", error);
    } finally {
      dispatch(setLoading(false));
    }
    return true;
  }
);
