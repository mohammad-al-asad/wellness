import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardResponse } from "../rtk/aiApi";

interface AiState {
  dashboardData: DashboardResponse["data"] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AiState = {
  dashboardData: null,
  isLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    setDashboardData: (state, action: PayloadAction<DashboardResponse["data"]>) => {
      state.dashboardData = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDashboardData, setLoading, setError } = aiSlice.actions;
export default aiSlice.reducer;
