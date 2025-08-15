import apiService from './api';

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

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterResponse {
  user: User;
  verificationToken: string;
  message: string;
}





class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse>{
    try {
      const response = await apiService.post <LoginResponse>('/auth/login', credentials);
  
      // ✅ Store tokens in localStorage
      localStorage.setItem('token', response.token);
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
  
      return response;
    } catch (error: any) {
      if (error.response?.data?.message === 'Please verify your email before logging in') {
        throw new Error('Please verify your email before logging in.');
      }
      throw error;
    }
  }
  
  

  async register(data: RegisterData): Promise<RegisterResponse> {
    return apiService.post<RegisterResponse>('/auth/register', data);
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  }

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/auth/me');
  }

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await apiService.post<{ token: string }>('/auth/refresh', {
      refreshToken,
    });
    
    localStorage.setItem('token', response.token);
    return response;
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>('/auth/forgot-password', { email });
  }

  async resetPassword(
    token: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<{ message: string }> {
    return apiService.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
      confirmPassword,
    });
  }
  

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return apiService.put<User>('/auth/profile', data);
  }

 
  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiService.get(`/auth/verifyemail/${token}`);
  }
  
  async resendVerification(email: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>('/auth/resend-verification', {
      email,
    });
  }
  

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

export const authService = new AuthService();
export default authService; 