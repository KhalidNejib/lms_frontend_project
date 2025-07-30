import React from 'react';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

// Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CourseDashboard from './pages/dashboard/CourseDashboard';
import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import CoursePlayer from './pages/courses/CoursePlayer';
import ContentManager from './pages/cms/ContentManager';
import MediaLibrary from './pages/cms/MediaLibrary';
import Layout from './components/common/Layout';

import MediaManager from './components/Midia/MidiaManager';
import PageViewer from './pages/cms/PageViewer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/courses" element={<CourseDashboard />} />

      {/* Courses */}
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/courses/:id/player" element={<CoursePlayer />} />

      {/* CMS */}
      <Route path="/cms/content" element={<ContentManager />} />
      <Route path="/cms/media" element={<MediaLibrary />} />
      <Route path="/admin/media" element={<MediaManager />} />
      <Route path="/pages/:slug" element={<PageViewer />} />


      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#FF9500', // override primary button color to orange
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

export default App;
