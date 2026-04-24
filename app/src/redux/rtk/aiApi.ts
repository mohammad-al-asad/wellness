import { api } from "./baseApi";

export interface UserSummary {
  name: string;
  greeting_message: string;
  profile_image: string | null;
}

export interface OverallPerformance {
  overall_score: number;
  score_label: string;
  percentage_change: number;
  summary_text: string;
}

export interface DimensionBreakdown {
  key: string;
  label: string;
  score: number;
  condition: string;
  description: string;
  status_tag: string;
}

export interface RadarChartData {
  key: string;
  label: string;
  score: number;
}

export interface ProgressDay {
  day_label: string;
  score_value: number | null;
}

export interface ImprovementPlanItem {
  title: string;
  description: string;
  based_on_dimension: string;
}

export interface BehaviorStreak {
  type: string;
  current_days: number;
  status: string;
}

export interface DashboardIndicator {
  key: string;
  label: string;
  value: string;
  status: string;
  meta: any;
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    user_summary: UserSummary;
    overall_performance: OverallPerformance;
    dimension_breakdown: DimensionBreakdown[];
    radar_chart_data: RadarChartData[];
    last_7_days_progress: ProgressDay[];
    personalized_improvement_plan: ImprovementPlanItem[];
    leader_action_plan: ImprovementPlanItem[];
    behavior_streaks: BehaviorStreak[];
    daily_checkin_status: {
      should_show_daily_checkin: boolean;
      last_checkin_date: string | null;
      daily_checkin_completed_today: boolean;
    };
    trend_insight: string;
    dashboard_indicators: DashboardIndicator[];
    burnout_alert: any;
    last_updated_at: string;
    live_sync_status: string;
  };
}

export const aiApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<DashboardResponse, void>({
      query: () => "/dashboard/home",
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardQuery } = aiApi;
