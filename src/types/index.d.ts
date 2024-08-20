declare type AuthResponse = {
  message: string;
  userInfo: User;
  token: string;
  tokenExpiry: string;
};

declare type ErrorResponse = {
  errorCode: number;
  message: string;
  errors: null | string[];
};

declare type User = {
  user_id: number;
  username: string;
  email: string;
  msisdn: string;
  full_name: string;
  role_id: number;
};

declare type QueryParams = {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
};

declare type DashboardSummaryResponse = {
  message: string;
  data: DataSummary[];
  summary: {
    totalRevenue: number;
    totalExpenses: number;
  };
  pagination: Pagination;
};

declare type DateParams = {
  from?: string;
  to?: string;
};

declare type DataSummary = {
  trans_date: string;
  revenue: number;
  expenses: number;
};

declare type Pagination = {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};
