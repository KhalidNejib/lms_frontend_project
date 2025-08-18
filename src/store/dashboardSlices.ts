import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  StudentProfile,
  StudentProgress,
  StudentActivity,
  EnrolledCourse,
  InstructorProfile,
  InstructorStats,
  InstructorCourse,
  EnrollmentTrend,
  AssessmentResult,
  AdminStats,
  SystemHealth,
  User,
  CourseApproval
} from '../services/dashboard.service';
import {
  studentDashboardService,
  instructorDashboardService,
  adminDashboardService
} from '../services/dashboard.service';

// ==================== STATE TYPES ====================

interface RoleState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface DashboardState {
  student: RoleState<{
    profile: StudentProfile | null;
    progress: StudentProgress | null;
    activities: StudentActivity[];
    courses: EnrolledCourse[];
  }>;
  instructor: RoleState<{
    profile: InstructorProfile | null;
    stats: InstructorStats | null;
    courses: InstructorCourse[];
    trends: EnrollmentTrend[];
    assessments: AssessmentResult[];
    activities: StudentActivity[];
  }>;
  admin: RoleState<{
    stats: AdminStats | null;
    systemHealth: SystemHealth | null;
    users: User[];
    approvals: CourseApproval[];
  }>;
}

// ==================== INITIAL STATE ====================

const initialState: DashboardState = {
  student: {
    data: {
      profile: null,
      progress: null,
      activities: [],
      courses: []
    },
    loading: false,
    error: null
  },
  instructor: {
    data: {
      profile: null,
      stats: null,
      courses: [],
      trends: [],
      assessments: [],
      activities: []
    },
    loading: false,
    error: null
  },
  admin: {
    data: {
      stats: null,
      systemHealth: null,
      users: [],
      approvals: []
    },
    loading: false,
    error: null
  }
};

// ==================== ASYNC THUNKS ====================

// ------- Student Thunks -------
export const fetchStudentDashboard = createAsyncThunk(
  'dashboard/fetchStudentDashboard',
  async () => {
    const [profile, progress, activities, courses] = await Promise.all([
      studentDashboardService.getProfile(),
      studentDashboardService.getProgress(),
      studentDashboardService.getActivities(),
      studentDashboardService.getEnrolledCourses()
    ]);
    return { profile, progress, activities, courses };
  }
);

// ------- Instructor Thunks -------
export const fetchInstructorDashboard = createAsyncThunk(
  'dashboard/fetchInstructorDashboard',
  async () => {
    const [profile, stats, courses, trends, assessments, activities] = await Promise.all([
      instructorDashboardService.getProfile(),
      instructorDashboardService.getStats(),
      instructorDashboardService.getCourses(),
      instructorDashboardService.getEnrollmentTrends(),
      instructorDashboardService.getAssessmentResults(),
      instructorDashboardService.getActivities()
    ]);
    return { profile, stats, courses, trends, assessments, activities };
  }
);

// ------- Admin Thunks -------
export const fetchAdminDashboard = createAsyncThunk(
  'dashboard/fetchAdminDashboard',
  async () => {
    const [stats, systemHealth, users, approvals] = await Promise.all([
      adminDashboardService.getStats(),
      adminDashboardService.getSystemHealth(),
      adminDashboardService.getAllUsers(),
      adminDashboardService.getCourseApprovals()
    ]);
    return { stats, systemHealth, users, approvals };
  }
);

// ==================== SLICE ====================

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ==== Student ====
    builder
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.student.loading = true;
        state.student.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.student.loading = false;
        state.student.data = action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.student.loading = false;
        state.student.error = action.error?.message ?? 'Failed to fetch student dashboard';
      });

    // ==== Instructor ====
    builder
      .addCase(fetchInstructorDashboard.pending, (state) => {
        state.instructor.loading = true;
        state.instructor.error = null;
      })
      .addCase(fetchInstructorDashboard.fulfilled, (state, action) => {
        state.instructor.loading = false;
        state.instructor.data = action.payload;
      })
      .addCase(fetchInstructorDashboard.rejected, (state, action) => {
        state.instructor.loading = false;
        state.instructor.error = action.error?.message ?? 'Failed to fetch instructor dashboard';
      });

    // ==== Admin ====
    builder
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.admin.loading = true;
        state.admin.error = null;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.admin.loading = false;
        state.admin.data = action.payload;
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.admin.loading = false;
        state.admin.error = action.error?.message ?? 'Failed to fetch admin dashboard';
      });
  }
});

export default dashboardSlice.reducer;
