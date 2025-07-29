import { useState, useEffect, useCallback } from 'react';

interface Content {
  id: string;
  title: string;
  type: 'text' | 'video' | 'pdf' | 'quiz';
  content: string;
  courseId: string;
  moduleId: string;
  order: number;
  duration?: number;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface ContentFilters {
  type?: string;
  courseId?: string;
  moduleId?: string;
}

export const useContent = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [filteredContent, setFilteredContent] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ContentFilters>({});

  const fetchContent = useCallback(async (courseId?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const url = courseId ? `/api/courses/${courseId}/content` : '/api/content';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      
      const data = await response.json();
      setContent(data);
      setFilteredContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createContent = useCallback(async (contentData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create content');
      }
      
      const newContent = await response.json();
      setContent(prev => [...prev, newContent]);
      return newContent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create content');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateContent = useCallback(async (id: string, contentData: Partial<Content>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update content');
      }
      
      const updatedContent = await response.json();
      setContent(prev => prev.map(item => 
        item.id === id ? updatedContent : item
      ));
      return updatedContent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update content');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteContent = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete content');
      }
      
      setContent(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete content');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadFile = useCallback(async (file: File, type: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      const response = await fetch('/api/content/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload file');
      }
      
      const uploadResult = await response.json();
      return uploadResult;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const applyFilters = useCallback((newFilters: ContentFilters) => {
    setFilters(newFilters);
    
    let filtered = [...content];
    
    if (newFilters.type) {
      filtered = filtered.filter(item => item.type === newFilters.type);
    }
    
    if (newFilters.courseId) {
      filtered = filtered.filter(item => item.courseId === newFilters.courseId);
    }
    
    if (newFilters.moduleId) {
      filtered = filtered.filter(item => item.moduleId === newFilters.moduleId);
    }
    
    setFilteredContent(filtered);
  }, [content]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, applyFilters]);

  return {
    content: filteredContent,
    isLoading,
    error,
    filters,
    fetchContent,
    createContent,
    updateContent,
    deleteContent,
    uploadFile,
    applyFilters,
  };
}; 