import apiService from './api';
import type { User } from '../types/user';
import { adminDashboardService } from './dashboard.service';

export interface ProfileUpdateData {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserUpdateData {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  dateOfBirth?: string;
  phone?: string;
  address?: string;
  preferences?: any;
  isActive?: boolean;
  role?: 'student' | 'instructor' | 'admin' | 'content-manager';
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserStats {
  totalUsers: number;
  totalEnrollments: number;
  monthlyRevenue: number;
}

export interface SystemHealth {
  serverStatus: number;
  apiResponseTime: number;
  databaseStatus: number;
  errorRate: number;
}

export interface CourseApproval {
  id: string;
  title: string;
  instructor: string;
  description: string;
  imageUrl?: string;
}

class UserService {
  // Profile Management
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<{ success: boolean; data: { user: User } }>('/users/me');
    return response.data.user;
  }

  async updateProfile(data: ProfileUpdateData): Promise<User> {
    const response = await apiService.patch<{ success: boolean; data: { user: User } }>('/users/me/profile', data);
    return response.data.user;
  }

  async updatePassword(data: PasswordUpdateData): Promise<{ message: string }> {
    const response = await apiService.put<{ success: boolean; message: string }>('/users/me/password', data);
    return { message: response.message };
  }

  async uploadAvatar(formData: FormData): Promise<{ avatarUrl: string }> {
    const response = await apiService.upload<{ success: boolean; data: { avatarUrl: string } }>('/users/me/avatar', formData);
    return { avatarUrl: response.data.avatarUrl };
  }



  // Admin User Management
  async getAllUsers(): Promise<User[]> {
    return await apiService.get<User[]>('/users');
  }
  
  async getUserById(userId: string) {
    try {
      const response = await apiService.get<{ success: boolean; message: string; data: User }>(`/users/${userId}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch user by id:', error);
      throw error; // Let the caller handle the error
    }
  }
  async updateUserStatus(userId: string, status: 'active' | 'blocked'): Promise<User> {
    return apiService.patch<User>(`/users/${userId}/status`, { isActive: status === 'active' });
  }

  async promoteUser(userId: string, newRole: string): Promise<User> {
    return apiService.patch<User>(`/users/${userId}/promote`, { newRole });
  }

  async createUserWithRole(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }): Promise<User> {
    try {
      console.log('Creating user with data:', userData);
      const response = await apiService.post<{ success: boolean; data: { user: User } }>('/users', userData);
      console.log('Create user response:', response);
      return response.data.user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`/users/${userId}`);
  }

  async updateUser(userId: string, updateData: UserUpdateData): Promise<User> {
    const response = await apiService.patch<UpdateUserResponse>(`/users/${userId}`, updateData);
    return response.data.user;
  }
  

  // Admin Dashboard Stats
  async getDashboardStats(): Promise<UserStats> {
    return await adminDashboardService.getStats();
  }
z
  async getSystemHealth(): Promise<SystemHealth> {
    return await adminDashboardService.getSystemHealth();
  }

  async getCourseApprovals(): Promise<CourseApproval[]> {
     return await adminDashboardService.getCourseApprovals();
  }

  async approveCourse(courseId: string): Promise<CourseApproval> {
    return await adminDashboardService.approveCourse(courseId);
  }
  
  async rejectCourse(courseId: string): Promise<CourseApproval> {
    return await adminDashboardService.rejectCourse(courseId);
  }
  
}

export const userService = new UserService();
export default userService;
