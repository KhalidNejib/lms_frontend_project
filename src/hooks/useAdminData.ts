import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminDashboardService } from '../services/dashboard.service';

// React Query hooks for admin dashboard
export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminDashboardService.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['admin', 'system-health'],
    queryFn: () => adminDashboardService.getSystemHealth(),
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => adminDashboardService.getAllUsers(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
};

export const useCourseApprovals = () => {
  return useQuery({
    queryKey: ['admin', 'course-approvals'],
    queryFn: () => adminDashboardService.getCourseApprovals(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
};

// Mutations
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: 'active' | 'blocked' }) =>
      adminDashboardService.updateUserStatus(userId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (error: Error) => {
      console.error('Failed to update user status:', error);
    },
  });
};

export const useApproveCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (courseId: string) => adminDashboardService.approveCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'course-approvals'] });
    },
    onError: (error: Error) => {
      console.error('Failed to approve course:', error);
    },
  });
};

export const useRejectCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ courseId, reason }: { courseId: string; reason?: string }) =>
      adminDashboardService.rejectCourse(courseId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'course-approvals'] });
    },
    onError: (error: Error) => {
      console.error('Failed to reject course:', error);
    },
  });
}; 