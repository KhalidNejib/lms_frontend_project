import apiService from './api';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface NotificationCount {
  total: number;
  unread: number;
  byType: {
    info: number;
    success: number;
    warning: number;
    error: number;
  };
}

class NotificationService {
  /**
   * Get all notifications for the current user
   */
  async getNotifications(): Promise<Notification[]> {
    try {
      return await apiService.get<Notification[]>('/notifications');
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Return mock data if API fails
      return this.getMockNotifications();
    }
  }

  /**
   * Get notification count (total and unread)
   */
  async getNotificationCount(): Promise<NotificationCount> {
    try {
      return await apiService.get<NotificationCount>('/notifications/count');
    } catch (error) {
      console.error('Error fetching notification count:', error);
      // Return mock data if API fails
      return {
        total: 5,
        unread: 3,
        byType: {
          info: 2,
          success: 1,
          warning: 1,
          error: 1
        }
      };
    }
  }

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId: string): Promise<{ message: string }> {
    try {
      return await apiService.put<{ message: string }>(`/notifications/${notificationId}/read`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<{ message: string }> {
    try {
      return await apiService.put<{ message: string }>('/notifications/read-all');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  }

  /**
   * Delete a notification
   */
  async deleteNotification(notificationId: string): Promise<{ message: string }> {
    try {
      return await apiService.delete<{ message: string }>(`/notifications/${notificationId}`);
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  }

  /**
   * Mock notifications for fallback
   */
  private getMockNotifications(): Notification[] {
    return [
      {
        id: '1',
        title: 'Course Update',
        message: 'New content has been added to your enrolled course "React Fundamentals"',
        type: 'info',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        link: '/courses/react-fundamentals'
      },
      {
        id: '2',
        title: 'Assignment Due',
        message: 'Your assignment "JavaScript Basics" is due in 2 days',
        type: 'warning',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        link: '/assignments/javascript-basics'
      },
      {
        id: '3',
        title: 'Course Completed',
        message: 'Congratulations! You have completed the course "HTML & CSS Basics"',
        type: 'success',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        link: '/certificates/html-css-basics'
      },
      {
        id: '4',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 2-4 AM',
        type: 'info',
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      },
      {
        id: '5',
        title: 'New Course Available',
        message: 'A new course "Advanced JavaScript" is now available for enrollment',
        type: 'success',
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
        link: '/courses/advanced-javascript'
      }
    ];
  }
}

export const notificationService = new NotificationService();
export default notificationService; 