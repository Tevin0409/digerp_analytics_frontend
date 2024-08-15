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
