export interface InstructorProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  specialization?: string;
  experience?: number;
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
  status: 'Done' | 'Progress' | 'Pending';
  imageUrl?: string;
  description?: string;
}

export interface AssessmentResult {
  courseName: string;
  assessmentName: string;
  averageScore: number;
  studentCount: number;
  status: string;
}

export interface EnrollmentTrend {
  month: string;
  enrollments: number;
}

export interface AssessmentResult {
  scoreRange: string;
  count: number;
}

export interface InstructorActivity {
  id: string;
  title: string;
  timeAgo: string;
  type: 'course' | 'student' | 'revenue';
}

export interface InstructorState {
  profile: InstructorProfile | null;
  stats: InstructorStats | null;
  courses: InstructorCourse[];
  enrollmentTrends: EnrollmentTrend[];
  assessmentResults: AssessmentResult[];
  activities: InstructorActivity[];
  loading: boolean;
  error: string | null;
} 