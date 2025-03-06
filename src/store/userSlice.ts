import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
import { loginService, logoutService } from "../services/AuthServices";

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutService ()
      return; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Помилка при виході");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const accessToken = await loginService(credentials)
      localStorage.setItem("accessToken", accessToken)
      return accessToken
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Помилка авторизації");
    }
  }
);

const getUserFromToken = (token: string | null) => {
  if(!token) return null;
  try {
    return jwtDecode<{ name: string; email: string; role: string }>(token);
  } catch(error) {
    console.log(error)
    return null;;
  }
};



interface UserState {
  user: { name: string; email: string; role: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: getUserFromToken(localStorage.getItem("accessToken")),
  token: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.user = getUserFromToken(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authActions = userSlice.actions;
export default userSlice.reducer;
