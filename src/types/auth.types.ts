

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
 export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'student' | 'instructor' | 'admin' | 'content-manager';
  }
  
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'student' | 'instructor' | 'admin' | 'content-manager';
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
  }
  