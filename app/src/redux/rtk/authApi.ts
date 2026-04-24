import { api } from "./baseApi";

export interface Organization {
  label: string;
  value: string;
}

export interface Role {
  label: string;
  value: string;
}

export interface Department {
  label: string;
  value: string;
}

export interface Team {
  label: string;
  value: string;
}

export interface OrganizationsResponse {
  success: boolean;
  message: string;
  data: {
    organizations: Organization[];
  };
}

export interface DepartmentsResponse {
  success: boolean;
  message: string;
  data: {
    departments: Department[];
  };
}

export interface TeamsResponse {
  success: boolean;
  message: string;
  data: {
    teams: Team[];
  };
}

export interface RolesResponse {
  success: boolean;
  message: string;
  data: {
    roles: Role[];
  };
}

export interface AssessmentAnswer {
  question_id: string;
  answer: string;
}

export interface AssessmentRequest {
  answers: AssessmentAnswer[];
}

export interface AssessmentResponse {
  success: boolean;
  message: string;
  data: {
    overall_score: number;
    condition: string;
    dimension_scores: {
      PC: number;
      MR: number;
      MC: number;
      PA: number;
      RC: number;
    };
    next_reassessment_date: string;
  };
}

export interface ProfileRequest {
  name: string;
  age: number;
  gender: string;
  company: string;
  department: string;
  team: string;
  role: string;
  height_cm: number;
  weight_kg: number;
  profile_image_url?: string | null;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: any; // Simplified for now
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password?: string;
  organization_name?: string;
  role?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  is_verified: boolean;
  onboarding_completed: boolean;
  organization_name?: string;
  role?: string;
  created_at: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: User;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest extends VerifyCodeRequest {
  new_password: string;
  confirm_password: string;
}

export interface CommonResponse {
  success: boolean;
  message: string;
  data: any;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<OrganizationsResponse, void>({
      query: () => "/meta/organizations",
    }),
    getDepartments: builder.query<DepartmentsResponse, string>({
      query: (organization_name) => ({
        url: "/meta/departments",
        params: { organization_name },
      }),
    }),
    getTeams: builder.query<TeamsResponse, { organization_name: string; department: string }>({
      query: ({ organization_name, department }) => ({
        url: "/meta/teams",
        params: { organization_name, department },
      }),
    }),
    getRoles: builder.query<RolesResponse, string>({
      query: (organization_name) => ({
        url: "/meta/roles",
        params: { organization_name },
      }),
    }),
    createProfile: builder.mutation<ProfileResponse, ProfileRequest>({
      query: (body) => ({
        url: "/users/me/profile",
        method: "POST",
        body,
      }),
    }),
    submitAssessment: builder.mutation<AssessmentResponse, AssessmentRequest>({
      query: (body) => ({
        url: "/assessments/checkins",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<RegisterResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation<CommonResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    verifyResetCode: builder.mutation<CommonResponse, VerifyCodeRequest>({
      query: (body) => ({
        url: "/auth/verify-reset-code",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation<CommonResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
    deleteAccount: builder.mutation<CommonResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrganizationsQuery,
  useGetDepartmentsQuery,
  useLazyGetDepartmentsQuery,
  useGetTeamsQuery,
  useLazyGetTeamsQuery,
  useGetRolesQuery,
  useLazyGetRolesQuery,
  useCreateProfileMutation,
  useSubmitAssessmentMutation,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
} = authApi;
