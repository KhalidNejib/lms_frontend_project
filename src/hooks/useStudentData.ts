import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Student, StudentProgress } from '../store/slices/studentSlice';
import { studentDashboardService } from '../services/dashboard.service';

// API functions using dashboard service
const fetchStudentProfile = async (_studentId: string): Promise<Student> => {
  try {
    return await studentDashboardService.getProfile();
  } catch (error) {
    // Fallback to mock data if API fails
    console.log('Using mock data for student profile');
  return {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    studentId: 'E173037',
    department: 'Computer Science',
    enrollmentDate: 'September 2023',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate student pursuing Computer Science with focus on web development and AI. Currently enrolled in multiple courses to enhance skills.',
    avatar: '/avatar.jpg'
  };
  }
};

const updateStudentProfile = async (profileData: Partial<Student>): Promise<Student> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return profileData as Student;
};

const fetchStudentProgress = async (_studentId: string): Promise<StudentProgress> => {
  try {
    return await studentDashboardService.getProgress();
  } catch (error) {
    // Fallback to mock data if API fails
    console.log('Using mock data for student progress');
  return {
    overallProgress: 75,
    monthlyProgress: 85,
    categories: [
      { category: 'website development', percentage: 95 },
      { category: 'AI', percentage: 50 }
    ]
  };
  }
};

const fetchStudentActivities = async (_studentId: string) => {
  try {
    return await studentDashboardService.getActivities();
  } catch (error) {
    // Fallback to mock data if API fails
    console.log('Using mock data for student activities');
  return [
    { id: '1', title: 'introduction to js', timeAgo: '3 hours ago', type: 'course' as const },
    { id: '2', title: 'Fundamental of python', timeAgo: '4 hours ago', type: 'course' as const },
    { id: '3', title: 'concept about app', timeAgo: '6 hours ago', type: 'assignment' as const }
  ];
  }
};

// React Query hooks
export const useStudentProfile = (studentId: string) => {
  return useQuery({
    queryKey: ['student', 'profile', studentId],
    queryFn: () => fetchStudentProfile(studentId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    retry: 3,
  });
};

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData: Partial<Student>) => updateStudentProfile(profileData),
    onSuccess: (data: Student) => {
      // Update the cache with new data
      queryClient.setQueryData(['student', 'profile', data.id], data);
              queryClient.invalidateQueries({ queryKey: ['student', 'profile'] });
    },
    onError: (error: Error) => {
      console.error('Failed to update profile:', error);
    },
  });
};

export const useStudentProgress = (studentId: string) => {
  return useQuery({
    queryKey: ['student', 'progress', studentId],
    queryFn: () => fetchStudentProgress(studentId),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

export const useStudentActivities = (studentId: string) => {
  return useQuery({
    queryKey: ['student', 'activities', studentId],
    queryFn: () => fetchStudentActivities(studentId),
    staleTime: 1 * 60 * 1000, // 1 minute
    gcTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
}; 