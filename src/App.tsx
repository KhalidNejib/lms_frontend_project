import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './store/authSlice';
import type { AppDispatch } from './store/store';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

import CourseDashboard from './pages/dashboard/CourseDashboard';

import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import CoursePlayer from './pages/courses/CoursePlayer';

import ContentManager from './pages/cms/ContentManager';
import MediaLibrary from './pages/cms/MediaLibrary';

import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>

      {/*  Public Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />
      <Route path="/verifyemail/:token" element={<VerifyEmail />} />
      

      {/*  Authenticated (any role) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/player" element={<CoursePlayer />} />
      </Route>

      

      {/* Admin Only */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Route>

      {/*  Instructor Only */}
      <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
        <Route path="/dashboard/courses" element={<CourseDashboard />} />
        <Route path="/cms/content" element={<ContentManager />} />
        <Route path="/cms/media" element={<MediaLibrary />} />
      </Route>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 Fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#FF9500',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
