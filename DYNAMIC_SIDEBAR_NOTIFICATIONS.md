# Dynamic Sidebar & Notification System

This document describes the implementation of dynamic user data in the sidebar and the notification bell system across all dashboards.

## 🎯 **Dynamic Sidebar Features**

### **User Profile Integration**
- **Dynamic User Name**: Displays the actual logged-in user's name from authentication
- **Dynamic User ID**: Shows the user's unique identifier
- **Dynamic Avatar**: Displays user's profile picture if available
- **Role-based Display**: Shows appropriate user information based on role

### **Implementation Details**

#### **Sidebar Component** (`src/components/DashboardUi/Sidebar.tsx`)
```typescript
// Uses useAuth hook to get current user data
const { user } = useAuth();

const currentUser = {
  name: user?.name || 'User',
  id: user?.id || 'E173037',
  avatarUrl: user?.avatarUrl || undefined,
  role: user?.role || 'student',
};
```

#### **Authentication Hook** (`src/hooks/useAuth.ts`)
- Updated User interface to include `avatarUrl`
- Provides real-time user data to all components
- Handles authentication state management

## 🔔 **Notification Bell System**

### **Features**
- **Real-time Notifications**: Displays user-specific notifications
- **Unread Count Badge**: Shows number of unread notifications
- **Interactive Popover**: Click to view all notifications
- **Mark as Read**: Individual and bulk read actions
- **Delete Notifications**: Remove unwanted notifications
- **Type-based Icons**: Different icons for info, success, warning, error
- **Time Stamps**: Shows when notifications were created

### **Notification Types**
- **Info**: General information (blue icon)
- **Success**: Positive updates (green icon)
- **Warning**: Important alerts (yellow icon)
- **Error**: Critical issues (red icon)

### **Implementation Details**

#### **Notification Service** (`src/services/notification.service.ts`)
```typescript
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  link?: string;
}
```

#### **Notification Hooks** (`src/hooks/useNotifications.ts`)
- `useNotifications()` - Get all notifications
- `useNotificationCount()` - Get unread count
- `useMarkNotificationAsRead()` - Mark individual as read
- `useMarkAllNotificationsAsRead()` - Mark all as read
- `useDeleteNotification()` - Delete notification

#### **Dashboard Header Integration** (`src/components/DashboardUi/DashboardHeader.tsx`)
```typescript
// Notification bell with badge
<Popover content={notificationContent} trigger="click">
  <Badge count={notificationCount?.unread || 0}>
    <Button icon={<BellOutlined />} />
  </Badge>
</Popover>
```

## 🍞 **Functional Breadcrumbs**

### **Features**
- **Dynamic Generation**: Automatically generates breadcrumbs based on current route
- **Smart Labeling**: Converts URL segments to readable labels
- **Icon Support**: Shows appropriate icons for Home and Dashboard
- **Clickable Navigation**: Links to parent pages
- **Current Page Highlighting**: Last item is not clickable

### **Implementation Details**

#### **Breadcrumbs Component** (`src/components/DashboardUi/Breadcrumbs.tsx`)
```typescript
// Auto-generates breadcrumbs from URL
const generateBreadcrumbs = () => {
  const pathSegments = location.pathname.split('/').filter(Boolean);
  // Maps segments to readable labels
  // Adds appropriate icons
  // Makes all but last item clickable
};
```

#### **Route Mapping**
- `/dashboard/student` → Home / Dashboard / Student
- `/dashboard/instructor` → Home / Dashboard / Instructor
- `/dashboard/admin` → Home / Dashboard / Admin
- `/profile` → Home / Profile

## 🔧 **Backend Support**

### **Notification Controller** (`src/controllers/notification.controller.ts`)
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/count` - Get notification count
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification
- `POST /api/notifications` - Create notification

### **Notification Routes** (`src/routes/notification.routes.ts`)
- All routes protected with authentication
- User-specific data filtering
- Proper error handling

## 🎨 **UI/UX Features**

### **Sidebar Enhancements**
- **Hover Effects**: Smooth animations on profile card
- **Role-based Styling**: Different colors for each role
- **Responsive Design**: Collapses on smaller screens
- **Profile Navigation**: Click to view/edit profile

### **Notification UI**
- **Popover Design**: Clean, organized notification list
- **Visual Indicators**: Unread notifications have background color
- **Action Buttons**: Quick mark as read and delete actions
- **Time Display**: Relative time (e.g., "2h ago", "1d ago")
- **Empty State**: Shows "No notifications" when empty

### **Breadcrumb Styling**
- **Consistent Colors**: Uses brand colors (#FF9500 for links)
- **Icon Integration**: Home and Dashboard icons
- **Proper Spacing**: Clean separation between items
- **Typography**: Clear hierarchy with proper font weights

## 🔄 **Data Flow**

### **User Authentication Flow**
1. User logs in → `useAuth` hook updates
2. Sidebar receives user data → Updates display
3. Header receives user data → Updates avatar
4. All components reflect current user

### **Notification Flow**
1. Backend creates notification → Stored in database
2. Frontend polls for updates → React Query cache
3. Badge updates automatically → Shows unread count
4. User clicks bell → Popover shows notifications
5. User interacts → Updates backend and cache

### **Breadcrumb Flow**
1. User navigates → URL changes
2. Breadcrumb component detects → Generates new breadcrumbs
3. Route mapping applied → Converts to readable labels
4. UI updates → Shows current path

## 🚀 **Usage Examples**

### **Using Dynamic Sidebar**
```typescript
// Sidebar automatically shows current user
const Sidebar = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <Avatar src={user?.avatarUrl} />
      <Text>Hi, {user?.name}</Text>
      <Text>{user?.id}</Text>
    </div>
  );
};
```

### **Using Notifications**
```typescript
// In any dashboard component
const Dashboard = () => {
  const { data: notifications } = useNotifications();
  const { data: count } = useNotificationCount();
  
  return (
    <div>
      <Badge count={count?.unread}>
        <BellIcon />
      </Badge>
    </div>
  );
};
```

### **Using Breadcrumbs**
```typescript
// Automatically generates breadcrumbs
const Dashboard = () => {
  return (
    <div>
      <Breadcrumbs />
      {/* Dashboard content */}
    </div>
  );
};
```

## 🔒 **Security Features**

### **Authentication**
- All notification endpoints require valid JWT token
- User can only access their own notifications
- Role-based access control for admin functions

### **Data Protection**
- User data is filtered and sanitized
- No sensitive information exposed in UI
- Proper error handling for unauthorized access

## 📱 **Responsive Design**

### **Mobile Support**
- Sidebar collapses on mobile devices
- Notification popover adapts to screen size
- Breadcrumbs wrap properly on small screens
- Touch-friendly interaction areas

### **Desktop Experience**
- Full sidebar always visible
- Hover effects and animations
- Keyboard navigation support
- Proper focus management

## 🧪 **Testing Considerations**

### **Unit Tests**
- Test notification service methods
- Test breadcrumb generation logic
- Test user data integration

### **Integration Tests**
- Test notification flow end-to-end
- Test authentication integration
- Test responsive behavior

### **User Acceptance Tests**
- Test notification interactions
- Test breadcrumb navigation
- Test dynamic user display

## 🔮 **Future Enhancements**

### **Real-time Updates**
- WebSocket integration for live notifications
- Push notifications for mobile
- Desktop notifications

### **Advanced Features**
- Notification preferences
- Email notifications
- Notification categories
- Custom notification sounds

### **Analytics**
- Notification engagement tracking
- User interaction patterns
- Performance monitoring

## 📋 **Deployment Checklist**

### **Backend**
- [ ] Notification routes registered
- [ ] Authentication middleware configured
- [ ] Database models created (if using real database)
- [ ] Environment variables set

### **Frontend**
- [ ] Notification service configured
- [ ] React Query provider set up
- [ ] Authentication context configured
- [ ] API base URL updated

### **Testing**
- [ ] Notification flow tested
- [ ] User authentication tested
- [ ] Responsive design verified
- [ ] Error handling tested

This implementation provides a complete, production-ready dynamic sidebar and notification system that enhances user experience across all dashboards. 