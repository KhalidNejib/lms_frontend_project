import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  enrolledAt: string;
}

interface CourseState {
  enrolledCourses: Course[];
  availableCourses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  enrolledCourses: [
    {
      id: '1',
      title: 'Javascript Fundamentals',
      description: 'Learn the basics of JavaScript programming',
      image: '/course-js.jpg',
      progress: 65,
      instructor: 'John Doe',
      duration: '8 weeks',
      level: 'beginner',
      category: 'Programming',
      enrolledAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Master advanced JavaScript concepts',
      image: '/course-js.jpg',
      progress: 70,
      instructor: 'Jane Smith',
      duration: '10 weeks',
      level: 'intermediate',
      category: 'Programming',
      enrolledAt: '2024-02-01'
    },
    {
      id: '3',
      title: 'Data Science Basics',
      description: 'Introduction to data science concepts',
      image: '/course-ds.jpg',
      progress: 60,
      instructor: 'Mike Johnson',
      duration: '12 weeks',
      level: 'beginner',
      category: 'Data Science',
      enrolledAt: '2024-01-20'
    },
    {
      id: '4',
      title: 'Machine Learning Fundamentals',
      description: 'Learn machine learning algorithms',
      image: '/course-ds.jpg',
      progress: 55,
      instructor: 'Sarah Wilson',
      duration: '14 weeks',
      level: 'intermediate',
      category: 'Data Science',
      enrolledAt: '2024-02-10'
    }
  ],
  availableCourses: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchEnrolledCourses = createAsyncThunk(
  'course/fetchEnrolled',
  async (_studentId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return initialState.enrolledCourses;
  }
);

export const fetchAvailableCourses = createAsyncThunk(
  'course/fetchAvailable',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return [];
  }
);

export const enrollInCourse = createAsyncThunk(
  'course/enroll',
  async (courseId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return courseId;
  }
);

export const updateCourseProgress = createAsyncThunk(
  'course/updateProgress',
  async ({ courseId, progress }: { courseId: string; progress: number }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { courseId, progress };
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setEnrolledCourses: (state, action: PayloadAction<Course[]>) => {
      state.enrolledCourses = action.payload;
    },
    updateCourseProgressLocal: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const course = state.enrolledCourses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(fetchAvailableCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCourses = action.payload;
      })
      .addCase(fetchAvailableCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch available courses';
      })
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, _action) => {
        state.loading = false;
        // In a real app, you would add the course to enrolledCourses
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to enroll in course';
      })
      .addCase(updateCourseProgress.fulfilled, (state, action) => {
        const course = state.enrolledCourses.find(c => c.id === action.payload.courseId);
        if (course) {
          course.progress = action.payload.progress;
        }
      });
  },
});

export const { setEnrolledCourses, updateCourseProgressLocal, clearError } = courseSlice.actions;
export default courseSlice.reducer; 