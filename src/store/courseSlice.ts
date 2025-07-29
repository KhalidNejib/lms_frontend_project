import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import courseService, { Course, CreateCourseData, UpdateCourseData, CourseFilters } from '../services/course.service';

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  isLoading: boolean;
  error: string | null;
  filters: CourseFilters;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  isLoading: false,
  error: null,
  filters: {},
};

export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (filters?: CourseFilters) => {
    const courses = await courseService.getCourses(filters);
    return courses;
  }
);

export const fetchCourse = createAsyncThunk(
  'course/fetchCourse',
  async (id: string) => {
    const course = await courseService.getCourse(id);
    return course;
  }
);

export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (data: CreateCourseData) => {
    const course = await courseService.createCourse(data);
    return course;
  }
);

export const updateCourse = createAsyncThunk(
  'course/updateCourse',
  async ({ id, data }: { id: string; data: UpdateCourseData }) => {
    const course = await courseService.updateCourse(id, data);
    return course;
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id: string) => {
    await courseService.deleteCourse(id);
    return id;
  }
);

export const enrollInCourse = createAsyncThunk(
  'course/enrollInCourse',
  async (courseId: string) => {
    const response = await courseService.enrollInCourse(courseId);
    return { courseId, message: response.message };
  }
);

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<CourseFilters>) => {
      state.filters = action.payload;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      // Fetch Single Course
      .addCase(fetchCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch course';
      })
      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses.push(action.payload);
        state.error = null;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to create course';
      })
      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update course';
      })
      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = state.courses.filter(course => course.id !== action.payload);
        if (state.currentCourse?.id === action.payload) {
          state.currentCourse = null;
        }
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to delete course';
      })
      // Enroll in Course
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        // Update enrollment status if needed
        state.error = null;
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to enroll in course';
      });
  },
});

export const { clearError, setFilters, clearCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer; 