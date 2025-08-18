import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { instructorDashboardService } from '../services/dashboard.service';

// React Query hooks for instructor dashboard
export const useInstructorProfile = (instructorId: string) => {
  return useQuery({
    queryKey: ['instructor', 'profile', instructorId],
    queryFn: () => instructorDashboardService.getProfile(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
  });
};

export const useInstructorStats = (instructorId: string) => {
  return useQuery({
    queryKey: ['instructor', 'stats', instructorId],
    queryFn: () => instructorDashboardService.getStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useInstructorCourses = (instructorId: string) => {
  return useQuery({
    queryKey: ['instructor', 'courses', instructorId],
    queryFn: () => instructorDashboardService.getCourses(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useEnrollmentTrends = (instructorId: string) => {
  return useQuery({
    queryKey: ['instructor', 'enrollment-trends', instructorId],
    queryFn: () => instructorDashboardService.getEnrollmentTrends(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useAssessmentResults = (instructorId: string) => {
  return useQuery({
    queryKey: ['instructor', 'assessment-results', instructorId],
    queryFn: () => instructorDashboardService.getAssessmentResults(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

export const useInstructorActivities = (instructorId: string) => {
  return useQuery({
    queryKey: ['instructor', 'activities', instructorId],
    queryFn: () => instructorDashboardService.getActivities(),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
}; 