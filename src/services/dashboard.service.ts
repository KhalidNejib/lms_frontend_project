import apiService from './api';

// ==================== TYPES ====================

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentId: string;
  enrollmentDate: string;
  phone: string;
  bio: string;
  avatar: string;
}

export interface StudentProgress {
  overallProgress: number;
  monthlyProgress: number;
  categories: Array<{
    category: string;
    percentage: number;
  }>;
}

export interface StudentActivity {
  id: string;
  title: string;
  timeAgo: string;
  type: 'course' | 'assignment' | 'achievement';
}

export interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  enrolledAt: Date;
}

export interface InstructorProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  joinDate: string;
}

export interface InstructorStats {
  totalEnrollments: number;
  courseRating: number;
  totalEarnings: number;
  completionRate: number;
}

export interface InstructorCourse {
  id: string;
  title: string;
  enrollments: number;
  revenue: number;
  rating: number;
  status: string;
}

export interface EnrollmentTrend {
  month: string;
  enrollments: number;
}



export interface AssessmentResult {
  courseName: string;
  assessmentName: string;
  averageScore: number;
  studentCount: number;
  status: string;
}


export interface AdminStats {
  totalUsers: number;
  totalEnrollments: number;
  monthlyRevenue: number;
  students: number;
  instructors: number;
  contentManagers: number;
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

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatarUrl?: string;
}

export interface InstructorActivity {
  id: string;
  title: string;
  timeAgo: string;
  type: 'course' | 'assessment' | 'student' | 'other';
}


// ==================== STUDENT DASHBOARD SERVICES ====================

class StudentDashboardService {
  /**
   * Get student profile
   */
  async getProfile(): Promise<StudentProfile> {
    try {
      const res = await apiService.get<{ data: StudentProfile }>('/dashboard/student/profile');
      return res.data;
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  }

  /**
   * Get student progress
   */
  async getProgress(): Promise<StudentProgress> {
    try {
      const res = await apiService.get<{ data: StudentProgress }>('/dashboard/student/progress');
      return res.data;
    } catch (error) {
      console.error('Error fetching student progress:', error);
      throw error;
    }
  }

  /**
   * Get student activities
   */
  async getActivities(): Promise<StudentActivity[]> {
    try {
      const res = await apiService.get<{ data: StudentActivity[] }>('/dashboard/student/activities');
      return res.data;
    } catch (error) {
      console.error('Error fetching student activities:', error);
      throw error;
    }
  }

  /**
   * Get enrolled courses
   */
  async getEnrolledCourses(): Promise<EnrolledCourse[]> {
    try {
      const res = await apiService.get<{ data: EnrolledCourse[] }>('/dashboard/student/courses');
       return res.data;
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      throw error;
    }
  }
}

// ==================== INSTRUCTOR DASHBOARD SERVICES ====================

class InstructorDashboardService {
  /**
   * Get instructor profile information
   */
  async getProfile(): Promise<InstructorProfile> {
    try {
      const res = await apiService.get<{ data: InstructorProfile }>('/dashboard/instructor/profile');
      return res.data;
    } catch (error) {
      console.error('Error fetching instructor profile:', error);
      throw error;
    }
  }

  /**
   * Get instructor statistics
   */
  async getStats(): Promise<InstructorStats> {
    try {
      const res = await apiService.get<{ data: InstructorStats }>('/dashboard/instructor/stats');
      return res.data;
    } catch (error) {
      console.error('Error fetching instructor stats:', error);
      throw error;
    }
  }

  /**
   * Get instructor courses
   */
  async getCourses(): Promise<InstructorCourse[]> {
    try {
      const res = await apiService.get<{ data: InstructorCourse[] }>('/dashboard/instructor/courses');
      return res.data;
    } catch (error) {
      console.error('Error fetching instructor courses:', error);
      throw error;
    }
  }

  /**
   * Get enrollment trends for instructor
   */
  async getEnrollmentTrends(): Promise<EnrollmentTrend[]> {
    try {
      const res = await apiService.get<{ data: EnrollmentTrend[] }>('/dashboard/instructor/enrollment-trends');
      return res.data;
    } catch (error) {
      console.error('Error fetching enrollment trends:', error);
      throw error;
    }
  }

  /**
   * Get assessment results for instructor courses
   */
  async getAssessmentResults(): Promise<AssessmentResult[]> {
    try {
      const res = await apiService.get<{ data: AssessmentResult[] }>('/dashboard/instructor/assessment-results');
      return res.data;
    } catch (error) {
      console.error('Error fetching assessment results:', error);
      throw error;
    }
  }

  /**
   * Get instructor recent activities
   */
  async getActivities(): Promise<InstructorActivity[]> {
    try {
      const res = await apiService.get<{ data: InstructorActivity[] }>('/dashboard/instructor/activities');
      return res.data; // <--- important fix
    } catch (error) {
      console.error('Error fetching instructor activities:', error);
      throw error;
    }
  }
  
}


// ==================== ADMIN DASHBOARD SERVICES ====================

class AdminDashboardService {
  /**
   * Get admin dashboard statistics
   */
  async getStats(): Promise<AdminStats> {
    try {
      return await apiService.get<AdminStats>('/dashboard/admin/stats');
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      throw error;
    }
  }

  /**
   * Get system health information
   */
  async getSystemHealth(): Promise<SystemHealth> {
    try {
      return await apiService.get<SystemHealth>('/dashboard/admin/system-health');
    } catch (error) {
      console.error('Error fetching system health:', error);
      throw error;
    }
  }

  /**
   * Get all users for admin management
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await apiService.get<User[]>('/dashboard/admin/users');
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  /**
   * Update user status (active/blocked)
   */
  async updateUserStatus(userId: string, status: 'active' | 'blocked'): Promise<User> {
    try {
      return await apiService.put<User>(`/dashboard/admin/users/${userId}/status`, { status });
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  /**
   * Get course approvals for admin
   */
  async getCourseApprovals(): Promise<CourseApproval[]> {
    try {
      const res = await apiService.get<{ success: boolean; courses: CourseApproval[] }>(
        '/dashboard/admin/course-approvals'
      );
  
      // ✅ Ensure each course has an `id` property
      const coursesWithId = res.courses.map(course => ({
        ...course,
        id: course._id || course.courseId || course.id, // normalize to `id`
      }));
  
      return coursesWithId;
    } catch (error) {
      console.error('Error fetching course approvals:', error);
      throw error;
    }
  }
  
  async approveCourse(courseId: string): Promise<InstructorCourse> {
    try {
      const res = await apiService.patch<{ success: boolean; message: string; course: InstructorCourse }>(
        `/dashboard/admin/courses/${courseId}/approve`
      );
  
      // ✅ Normalize `id`
      return {
        ...res.course,
        id: res.course._id || res.course.courseId || res.course.id,
      };
    } catch (error) {
      console.error('Error approving course:', error);
      throw error;
    }
  }
  
  async rejectCourse(courseId: string): Promise<InstructorCourse> {
    try {
      const res = await apiService.patch<{ success: boolean; message: string; course: InstructorCourse }>(
        `/dashboard/admin/courses/${courseId}/reject`
      );
  
      // ✅ Normalize `id`
      return {
        ...res.course,
        id: res.course._id || res.course.courseId || res.course.id,
      };
    } catch (error) {
      console.error('Error rejecting course:', error);
      throw error;
    }
  }
  

  /**
 * Submit a course for approval
 */
async submitCourseForApproval(courseId: string): Promise<{ message: string }> {
  try {
    return await apiService.patch<{ message: string }>(`/dashboard/instructor/courses/${courseId}/submit`);
  } catch (error) {
    console.error('Error submitting course for approval:', error);
    throw error;
  }
}
}
// ==================== EXPORT SERVICES ====================

export const studentDashboardService = new StudentDashboardService();
export const instructorDashboardService = new InstructorDashboardService();
export const adminDashboardService = new AdminDashboardService();

// Default export for backward compatibility
export default {
  student: studentDashboardService,
  instructor: instructorDashboardService,
  admin: adminDashboardService,
}; 


