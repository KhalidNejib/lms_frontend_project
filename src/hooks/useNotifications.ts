import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import notificationService from '../services/notification.service';

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: notificationService.getNotifications,
  });
};

export const useNotificationCount = () => {
  return useQuery({
    queryKey: ['notificationCount'],
    queryFn: notificationService.getNotificationCount,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationService.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notificationCount'] });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notificationCount'] });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notificationCount'] });
    },
  });
}; 