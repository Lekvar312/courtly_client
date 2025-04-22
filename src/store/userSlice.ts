import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Accessibility, Archive, User } from "lucide-react";

type User = {
  _id?: string;
  name: string;
  email: string;
  role: string;
};
type UserState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
};
const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const storedUser = localStorage.getItem("user");
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

if (storedUser && storedAccessToken && storedRefreshToken) {
  const user = JSON.parse(storedUser);
  initialState.user = user;
  initialState.accessToken = storedAccessToken;
  initialState.refreshToken = storedRefreshToken;
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("accessToken", JSON.stringify(action.payload.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(action.payload.refreshToken));
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
