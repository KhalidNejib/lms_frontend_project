import apiService from './api';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  price: number;
  image: string;
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  price: number;
  image?: string;
}

export interface UpdateCourseData extends Partial<CreateCourseData> {
  status?: 'draft' | 'published' | 'archived';
}

export interface CourseFilters {
  category?: string;
  instructor?: string;
  status?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
}

class CourseService {
  async getCourses(filters?: CourseFilters): Promise<Course[]> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            queryParams.append(`${key}Min`, value.min.toString());
            queryParams.append(`${key}Max`, value.max.toString());
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }
    
    const endpoint = filters ? `/courses?${queryParams.toString()}` : '/courses';
    return apiService.get<Course[]>(endpoint);
  }

  async getCourse(id: string): Promise<Course> {
    return apiService.get<Course>(`/courses/${id}`);
  }

  async createCourse(data: CreateCourseData): Promise<Course> {
    return apiService.post<Course>('/courses', data);
  }

  async updateCourse(id: string, data: UpdateCourseData): Promise<Course> {
    return apiService.put<Course>(`/courses/${id}`, data);
  }

  async deleteCourse(id: string): Promise<void> {
    return apiService.delete<void>(`/courses/${id}`);
  }

  async enrollInCourse(courseId: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(`/courses/${courseId}/enroll`);
  }

  async unenrollFromCourse(courseId: string): Promise<{ message: string }> {
    return apiService.delete<{ message: string }>(`/courses/${courseId}/enroll`);
  }

  async getEnrolledCourses(): Promise<Course[]> {
    return apiService.get<Course[]>('/courses/enrolled');
  }

  async getInstructorCourses(): Promise<Course[]> {
    return apiService.get<Course[]>('/courses/instructor');
  }

  async uploadCourseImage(courseId: string, file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiService.upload<{ imageUrl: string }>(`/courses/${courseId}/image`, formData);
  }

  async getCourseProgress(courseId: string): Promise<{
    completed: number;
    total: number;
    percentage: number;
  }> {
    return apiService.get<{
      completed: number;
      total: number;
      percentage: number;
    }>(`/courses/${courseId}/progress`);
  }

  async rateCourse(courseId: string, rating: number, review?: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>(`/courses/${courseId}/rate`, {
      rating,
      review,
    });
  }

  async getCourseReviews(courseId: string): Promise<{
    id: string;
    userId: string;
    userName: string;
    rating: number;
    review: string;
    createdAt: string;
  }[]> {
    return apiService.get<{
      id: string;
      userId: string;
      userName: string;
      rating: number;
      review: string;
      createdAt: string;
    }[]>(`/courses/${courseId}/reviews`);
  }

  async searchCourses(query: string): Promise<Course[]> {
    return apiService.get<Course[]>(`/courses/search?q=${encodeURIComponent(query)}`);
  }

  async getCategories(): Promise<{ id: string; name: string; count: number }[]> {
    return apiService.get<{ id: string; name: string; count: number }[]>('/courses/categories');
  }
}

export const courseService = new CourseService();
export default courseService; 