import { useState, useEffect, useCallback } from 'react';

interface Course {
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
}

interface CourseFilters {
  category?: string;
  instructor?: string;
  priceRange?: { min: number; max: number };
  rating?: number;
}

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<CourseFilters>({});

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/courses');
      
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      
      const data = await response.json();
      setCourses(data);
      setFilteredCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (courseData: Omit<Course, 'id'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
      
      const newCourse = await response.json();
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create course');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCourse = useCallback(async (id: string, courseData: Partial<Course>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      
      const updatedCourse = await response.json();
      setCourses(prev => prev.map(course => 
        course.id === id ? updatedCourse : course
      ));
      return updatedCourse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update course');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCourse = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/courses/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      
      setCourses(prev => prev.filter(course => course.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete course');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyFilters = useCallback((newFilters: CourseFilters) => {
    setFilters(newFilters);
    
    let filtered = [...courses];
    
    if (newFilters.category) {
      filtered = filtered.filter(course => 
        course.category.toLowerCase().includes(newFilters.category!.toLowerCase())
      );
    }
    
    if (newFilters.instructor) {
      filtered = filtered.filter(course => 
        course.instructor.toLowerCase().includes(newFilters.instructor!.toLowerCase())
      );
    }
    
    if (newFilters.priceRange) {
      filtered = filtered.filter(course => 
        course.price >= newFilters.priceRange!.min && 
        course.price <= newFilters.priceRange!.max
      );
    }
    
    if (newFilters.rating) {
      filtered = filtered.filter(course => course.rating >= newFilters.rating!);
    }
    
    setFilteredCourses(filtered);
  }, [courses]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  return {
    courses: filteredCourses,
    isLoading,
    error,
    filters,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    applyFilters,
  };
}; 