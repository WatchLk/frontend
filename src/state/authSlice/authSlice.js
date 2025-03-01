import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signIn, signInWithGoogle, signUp } from "./authApi";

const initialState = {
  currentUser: null,
  token: null,
  signInStatus: "idle",
  signUpStatus: "idle",
  authError: null,
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

export const signInWithGoogleAsync = createAsyncThunk(
  "auth/signInWithGoogleAsync",
  async (token) => {
    return await signInWithGoogle(token);
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
      state.authError = null;
    },
    resetSignInStatus: (state) => {
      state.signInStatus = "idle";
      state.authError = null;
    },
    resetSignUpStatus: (state) => {
      state.signUpStatus = "idle";
      state.authError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.signInStatus = "pending";
        state.authError = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.signInStatus = "fulfilled";
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.authError = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.signInStatus = "rejected";
        state.authError = action.error.message;
        state.currentUser = null;
        state.token = null;
      })
      .addCase(signUpAsync.pending, (state) => {
        state.signUpStatus = "pending";
        state.authError = null;
      })
      .addCase(signUpAsync.fulfilled, (state) => {
        state.signUpStatus = "fulfilled";
        state.authError = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.signUpStatus = "rejected";
        state.authError = action.error.message;
        state.currentUser = null;
        state.token = null;
      })
      .addCase(signInWithGoogleAsync.pending, (state) => {
        state.signInStatus = "pending";
        state.authError = null;
      })
      .addCase(signInWithGoogleAsync.fulfilled, (state, action) => {
        state.signInStatus = "fulfilled";
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.authError = null;
      });
  },
});

export const { signOut, resetSignInStatus, resetSignUpStatus } =
  authSlice.actions;

export default authSlice.reducer;
