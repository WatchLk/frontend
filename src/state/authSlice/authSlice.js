import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signUp } from "./authApis";

const initialState = {
  currentUser: null,
  token: null,
  signInStatus: "idle",
  signUpStatus: "idle",
  error: null,
};

export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (loginData) => {
    return await signIn(loginData);
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signUpAsync",
  async (registerData) => {
    return await signUp(registerData);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    resetSignInStatus: (state) => {
      state.signInStatus = "idle";
      state.error = null;
    },
    resetSignUpStatus: (state) => {
      state.signUpStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.signInStatus = "pending";
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.signInStatus = "fulfilled";
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.signInStatus = "rejected";
        state.error = action.error.message;
        state.currentUser = null;
        state.token = null;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.signUpStatus = "pending";
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state) => {
        state.signUpStatus = "fulfilled";
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.signUpStatus = "rejected";
        state.error = action.error.message;
        state.currentUser = null;
        state.token = null;
      });
  },
});

export const { signOut, resetSignInStatus, resetSignUpStatus } =
  authSlice.actions;

export default authSlice.reducer;
