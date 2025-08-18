const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

import { authService } from './auth.service'; // import your authService

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // New helper: centralized fetch with refresh token retry
  private async fetchWithAuth<T>(input: RequestInfo, init: RequestInit, retry = true): Promise<T> {
    let response = await fetch(input, init);

    if (response.status === 401 && retry) {
      // Try refresh token
      try {
        await authService.refreshToken(); // This updates accessToken in localStorage

        // Retry original request with new token
        const newHeaders = {
          ...init.headers,
          Authorization: `Bearer ${authService.getToken()}`,
        };
        response = await fetch(input, { ...init, headers: newHeaders });
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect or throw error
        authService.clearTokens();
        // Optionally: window.location.href = '/login';
        throw refreshError;
      }
    }

    return this.handleResponse<T>(response);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.fetchWithAuth<T>(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetchWithAuth<T>(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetchWithAuth<T>(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.fetchWithAuth<T>(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }
  
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.fetchWithAuth<T>(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
  }
  



  async upload<T>(endpoint: string, formData: FormData): Promise<T> {
    const token = localStorage.getItem('accessToken');
    return this.fetchWithAuth<T>(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
  }
}

export const apiService = new ApiService();
export default apiService;
