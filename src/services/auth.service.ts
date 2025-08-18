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
  accessToken: string;
  refreshToken?: string;
}

export interface RegisterResponse {
  user: User;
  verificationToken: string;
  message: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiService.post<{ data: LoginResponse }>('/auth/login', credentials);
      const { accessToken, refreshToken, user } = response.data;
  
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
  
      return { user, accessToken, refreshToken };
    } catch (error: any) {
      if (error.response?.data?.message === 'Please verify your email before logging in.') {
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
      this.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User> {
    return apiService.get<User>('/auth/me');
  }

  async refreshToken(): Promise<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');

    const { accessToken } = await apiService.post<{ accessToken: string }>('/auth/refresh-token', {
      refreshToken,
    });

    localStorage.setItem('accessToken', accessToken);
    return { accessToken };
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>('/auth/forgot-password', { email });
  }

  async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<{ message: string }> {
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

  async updateProfinle(data: Partial<User>): Promise<User> {
    return apiService.put<User>('/auth/profile', data);
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiService.get(`/auth/verifyemail/${token}`);
  }

  async resendVerification(email: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>('/auth/resend-verification', { email });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export const authService = new AuthService();
export default authService;
