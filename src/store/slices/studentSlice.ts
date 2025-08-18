import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { studentDashboardService } from '../../services/dashboard.service';

// ------------------- STATE TYPES -------------------
export interface Student {
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
  categories: {
    category: string;
    percentage: number;
  }[];
}

export interface StudentActivity {
  id: string;
  title: string;
  timeAgo: string;
  type: 'course' | 'assignment' | 'quiz';
}

export interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  enrolledAt: Date;
}

interface StudentState {
  profile: Student | null;
  progress: StudentProgress | null;
  activities: StudentActivity[];
  enrolledCourses: EnrolledCourse[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  profile: null,
  progress: null,
  activities: [],
  enrolledCourses: [],
  loading: false,
  error: null,
};

// ------------------- ASYNC THUNKS -------------------
export const fetchStudentProfile = createAsyncThunk(
  'student/fetchProfile',
  async () => {
    try {
      const response = await studentDashboardService.getProfile();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch student profile');
    }
  }
);

export const fetchStudentProgress = createAsyncThunk(
  'student/fetchProgress',
  async () => {
    try {
      const response = await studentDashboardService.getProgress();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch student progress');
    }
  }
);

export const fetchStudentActivities = createAsyncThunk(
  'student/fetchActivities',
  async () => {
    try {
      const response = await studentDashboardService.getActivities();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch student activities');
    }
  }
);

export const fetchEnrolledCourses = createAsyncThunk(
  'student/fetchEnrolledCourses',
  async () => {
    try {
      const response = await studentDashboardService.getEnrolledCourses();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch enrolled courses');
    }
  }
);

// ------------------- SLICE -------------------
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Student>) => {
      state.profile = action.payload;
    },
    updateProgress: (state, action: PayloadAction<Partial<StudentProgress>>) => {
      if (state.progress) {
        state.progress = { ...state.progress, ...action.payload };
      }
    },
    addActivity: (state, action: PayloadAction<StudentActivity>) => {
      state.activities.unshift(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----------- PROFILE -----------
      .addCase(fetchStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })

      // ----------- PROGRESS -----------
      .addCase(fetchStudentProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchStudentProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch progress';
      })

      // ----------- ACTIVITIES -----------
      .addCase(fetchStudentActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchStudentActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch activities';
      })

      // ----------- ENROLLED COURSES -----------
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrolled courses';
      });
  },
});

export const { setProfile, updateProgress, addActivity, clearError } = studentSlice.actions;
export default studentSlice.reducer;
