import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AssessmentResponse } from "../rtk/authApi";

interface OnboardingData {
  organization: string;
  department: string;
  team: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  onboarding: OnboardingData | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  onboarding: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, access_token, refresh_token },
      }: PayloadAction<{
        user: User;
        access_token: string;
        refresh_token: string;
      }>,
    ) => {
      state.user = user;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    verifyUser: (state) => {
      if (state.user) {
        state.user.is_verified = true;
      }
    },
    setOnboardingData: (state, action: PayloadAction<OnboardingData>) => {
      state.onboarding = action.payload;
    },
    setAssessmentResults: (state) => {
      if (state.user) {
        state.user.onboarding_completed = true;
      }
    },
  },
});

export const {
  setCredentials,
  logout,
  verifyUser,
  setOnboardingData,
  setAssessmentResults,
} = authSlice.actions;

export default authSlice.reducer;
