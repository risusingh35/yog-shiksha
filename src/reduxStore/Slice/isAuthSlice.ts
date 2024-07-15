// store/slices/isAuthSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const login = createAsyncThunk(
  `api/login/`,
  async (loginPayload,{ rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/auth/login`,loginPayload
      );
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue("Failed to fetch login");
      }
    } catch (error:any) {
      return rejectWithValue(
        error.message || "An error occurred while retrieving login."
      );
    }
  }
);

const initialState = {
  loading: false,
  errorMessage: null,
  isAuth: false,
  token: null,
  loggedInUser:null
};

const isAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      // console.log({action});
      
      state.isAuth = action.payload.isAuth;
      state.token = action.payload.token;
      state.loggedInUser = action.payload.loggedInUser;
    },
    resetIsAuth: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state:any) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = action.payload.isAuth;
        state.token = action.payload.token;
        state.loggedInUser = action.payload.loggedInUser;
        state.errorMessage = null;
      })
      .addCase(login.rejected, (state, action:any) => {
        state.loading = false;
        state.isAuth = false;
        state.token = null;
        state.loggedInUser = null;
        state.errorMessage = action.payload.errorMessage;
      });
  },
});

export const { setIsAuth, resetIsAuth } = isAuthSlice.actions;
export default isAuthSlice.reducer;
