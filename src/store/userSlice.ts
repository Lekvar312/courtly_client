import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService, logoutService, getCurrentUserService, signupService } from "../services/AuthServices";

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutService();
      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Помилка при виході");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, { rejectWithValue, dispatch }) => {
    try {
      const accessToken = await loginService(credentials);
      localStorage.setItem("accessToken", accessToken);
      dispatch(getCurrentUser()); // Після логіну отримуємо поточного користувача
      return accessToken;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Помилка авторизації");
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup", 
  async (creadentials: {name:string, email:string, password: string}, {rejectWithValue}) => {
    try{
      const response = await signupService(creadentials)
      localStorage.setItem("accessToken", response.accessToken)
      return response
    }catch(error:any){
      return rejectWithValue(error.response?.data?.message || "Помилка реєстрації")
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUserService();
      return response.data; // Якщо все ок, то дані користувача
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Помилка при отриманні користувача");
    }
  }
);

interface UserState {
  user: { name: string; email: string; role: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null, 
  token: localStorage.getItem("accessToken") || null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
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
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Дані користувача
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      });
  },
});

export const authActions = userSlice.actions;
export default userSlice.reducer;
