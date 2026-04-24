import { api } from "./baseApi";

export interface Question {
  id: string;
  text: string;
  driver: string;
  response_type: "scale" | "multiple_choice";
  options: string[];
  weight: number;
  order: number;
  step: number;
}

export interface QuestionsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    page: number;
    size: number;
    total_pages: number;
    questions: Question[];
  };
}

export const questionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionsResponse, { page: number; size?: number }>({
      query: ({ page, size = 5 }) => ({
        url: "/questions",
        params: { page, size },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetQuestionsQuery, useLazyGetQuestionsQuery } = questionsApi;
