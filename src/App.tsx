import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/authSlice';
import type { AppDispatch } from './store/store';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import AdminLayout from './layouts/AdminLayout';
import InstructorLayout from './layouts/InstructorLayout';

// Pages
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthRoute from './components/common/AuthRoute';
import PageLoader from './components/common/PageLoader';
import ErrorPage from './pages/error/ErrorPage';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseDashboard from './pages/instructor/CourseDashboard';

// Course Pages
import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import CoursePlayer from './pages/courses/CoursePlayer';
import MyCourses from './pages/courses/MyCourses';

// CMS Pages
import ContentManager from './pages/cms/ContentManager';
import MediaLibrary from './pages/cms/MediaLibrary';

// User Pages
import Profile from './pages/user/Profile';
import Settings from './pages/user/Settings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="*" element={<ErrorPage type="404" />} />
      </Route>

      {/* Auth Routes with Minimal Layout */}
      <Route element={<AuthLayout />}>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
        </Route>
      </Route>

      {/* Authenticated User Routes */}
      <Route element={<MainLayout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/courses/:id/player" element={<CoursePlayer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Admin Routes with Admin Layout */}
      <Route element={<AdminLayout />}>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<div>User Management</div>} />
          <Route path="/admin/reports" element={<div>Reports</div>} />
        </Route>
      </Route>

      {/* Instructor Routes with Instructor Layout */}
      <Route element={<InstructorLayout />}>
        <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
          <Route path="/instructor/dashboard" element={<CourseDashboard />} />
          <Route path="/instructor/courses" element={<ContentManager />} />
          <Route path="/instructor/media" element={<MediaLibrary />} />
          <Route path="/instructor/analytics" element={<div>Analytics</div>} />
        </Route>
      </Route>
    </>
  )
);

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch current user on app load
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#FF9500',
          borderRadius: 8,
          colorLink: '#FF9500',
        },
        components: {
          Button: {
            colorPrimary: '#FF9500',
            colorPrimaryHover: '#FFAA33',
            colorPrimaryActive: '#E68600',
          },
          Menu: {
            colorItemBgSelected: '#FFF5E6',
          },
        },
      }}
    >
      <AntdApp>
        <RouterProvider 
          router={router} 
          fallbackElement={<PageLoader />}
        />
      </AntdApp>
    </ConfigProvider>
  );
};

export default App;