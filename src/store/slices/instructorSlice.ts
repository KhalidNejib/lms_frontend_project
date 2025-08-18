import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { 
  InstructorState, 
  InstructorProfile, 
  InstructorStats, 
  InstructorCourse,
  InstructorActivity,
  AssessmentResult 
} from '../../types/instructor';
import { instructorDashboardService } from '../../services/dashboard.service';

const initialState: InstructorState = {
  profile: null,
  stats: null,
  courses: [],
  enrollmentTrends: [],
  assessmentResults: [],
  activities: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchInstructorProfile = createAsyncThunk(
  'instructor/fetchProfile',
  async (instructorId: string) => {
    try {
      const response = await instructorDashboardService.getProfile();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch instructor profile');
    }
  }
);

export const fetchInstructorStats = createAsyncThunk(
  'instructor/fetchStats',
  async (instructorId: string) => {
    try {
      const response = await instructorDashboardService.getStats();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch instructor stats');
    }
  }
);

export const fetchInstructorCourses = createAsyncThunk(
  'instructor/fetchCourses',
  async (instructorId: string) => {
    try {
      const response = await instructorDashboardService.getCourses();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch instructor courses');
    }
  }
);

export const fetchEnrollmentTrends = createAsyncThunk(
  'instructor/fetchEnrollmentTrends',
  async (instructorId: string) => {
    try {
      const response = await instructorDashboardService.getEnrollmentTrends();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch enrollment trends');
    }
  }
);

export const fetchAssessmentResults = createAsyncThunk(
  'instructor/fetchAssessmentResults',
  async (instructorId: string) => {
    try {
      const response = await instructorDashboardService.getAssessmentResults();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch assessment results');
    }
  }
);

export const fetchInstructorActivities = createAsyncThunk(
  'instructor/fetchActivities',
  async (instructorId: string) => {
    try {
      const response = await instructorDashboardService.getActivities();
      return response;
    } catch (error: any) {
      throw new Error(error?.message || 'Failed to fetch instructor activities');
    }
  }
);

export const updateInstructorProfile = createAsyncThunk(
  'instructor/updateProfile',
  async (profileData: Partial<InstructorProfile>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return profileData;
  }
);

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<InstructorProfile>) => {
      state.profile = action.payload;
    },
    updateStats: (state, action: PayloadAction<Partial<InstructorStats>>) => {
      if (state.stats) {
        state.stats = { ...state.stats, ...action.payload };
      }
    },
    addCourse: (state, action: PayloadAction<InstructorCourse>) => {
      state.courses.unshift(action.payload);
    },
    updateCourse: (state, action: PayloadAction<{ id: string; updates: Partial<InstructorCourse> }>) => {
      const courseIndex = state.courses.findIndex(course => course.id === action.payload.id);
      if (courseIndex !== -1) {
        state.courses[courseIndex] = { ...state.courses[courseIndex], ...action.payload.updates };
      }
    },
    addActivity: (state, action: PayloadAction<InstructorActivity>) => {
      state.activities.unshift(action.payload);
    },
    setAssessmentResults: (state, action: PayloadAction<any>) => {
      state.assessmentResults = action.payload; 
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(fetchInstructorStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchInstructorStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stats';
      })
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      .addCase(updateInstructorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInstructorProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.profile) {
          state.profile = { ...state.profile, ...action.payload };
        }
      })
      .addCase(updateInstructorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile';
      })
      .addCase(fetchEnrollmentTrends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentTrends.fulfilled, (state, action: PayloadAction<EnrollmentTrend[]>) => {
        state.loading = false;
        state.enrollmentTrends = action.payload;
      })
      .addCase(fetchEnrollmentTrends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrollment trends';
      })
      .addCase(fetchInstructorActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorActivities.fulfilled, (state, action: PayloadAction<InstructorActivity[]>) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchInstructorActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch instructor activities';
      })
      .addCase(fetchAssessmentResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssessmentResults.fulfilled, (state, action: PayloadAction<AssessmentResult[]>) => {
        state.loading = false;
        state.assessmentResults = action.payload;
      })
      .addCase(fetchAssessmentResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch assessment results';
      });
      
      
  },
});

export const { 
  setProfile, 
  updateStats, 
  addCourse, 
  updateCourse, 
  addActivity, 
  setAssessmentResults,
  clearError 
} = instructorSlice.actions;

export default instructorSlice.reducer; 