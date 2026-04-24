// Shared navigation and data types for Dominion Wellness Solutions

/** User object returned from the API */
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

/** Auth state */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

/** Generic API response wrapper */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/** Pagination meta */
export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
