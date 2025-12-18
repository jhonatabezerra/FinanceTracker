export enum UserRole {
  Admin = 1,
  User = 2,
  Guest = 3
}

export interface User {
  id: number;
  name: string;
  email: string;
  userRole: UserRole;
  lastLoginAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}


