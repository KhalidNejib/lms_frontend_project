// import React, { useEffect } from 'react';
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   Navigate,
// } from 'react-router-dom';
// import { ConfigProvider, theme } from 'antd';
// import { useDispatch } from 'react-redux';
// import { getCurrentUser } from './store/authSlice';
// import type { AppDispatch } from './store/store';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import ErrorBoundary from "./components/common/ErrorBoundary"

// // Layouts
// import PublicLayout from './components/common/Layout';
// import DashboardLayout from './components/DashboardUi/MainDashLayout';

// // Route Guards
// import ProtectedRoute from './components/common/ProtectedRoute';

// // Auth Pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import ResetPassword from './pages/auth/ResetPassword';
// import VerifyEmail from './pages/auth/VerifyEmail';

// // General Pages
// import NotFound from './pages/Notfound/Notfound';
// import ProfilePage from './pages/profile';
// import ConfigurationPage from './pages/dashboard/Configuration';

// // Dashboard Pages

// import AdminDashboard from "./pages/dashboard/admin"
// import StudentDashboard from "./pages/dashboard/student"
// import InstructorDashboard from './pages/dashboard/instructor';


// // Course Pages
// import CourseList from './pages/courses/CourseList';
// import CourseDetail from './pages/courses/CourseDetail';
// import CoursePlayer from './pages/courses/CoursePlayer';

// // CMS Pages
// import ContentManager from './pages/cms/ContentManager';
// import MediaLibrary from './pages/cms/MediaLibrary';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       {/* Public Routes */}
//       <Route element={<PublicLayout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//         <Route path="/verifyemail" element={<VerifyEmail />} />
//         <Route path="/verifyemail/:token" element={<VerifyEmail />} />
        
//       </Route>

//       {/* Protected Dashboard Layout */}
//       <Route element={<ProtectedRoute />}>
//         <Route element={<DashboardLayout />}>
//           {/* All Authenticated Users */}
//           <Route path="/dashboard/admin" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
//           <Route path="/dashboard/student" element={<ErrorBoundary><StudentDashboard/></ErrorBoundary>} />
//           <Route path="/dashboard/instructor" element={<ErrorBoundary><InstructorDashboard/></ErrorBoundary>} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/configuration" element={<ConfigurationPage />} />
//           {/* <Route path="/courses" element={<CourseList />} />
//             <Route path="/courses/:id" element={<CourseDetail />} />
//           <Route path="/courses/:id/player" element={<CoursePlayer />} /> */}
//         </Route>
//       </Route>

//       {/* Admin-Only Routes */}
//       <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="/dashboard/admin" element={<AdminDashboard />} />
//         </Route>
//       </Route>

//       {/* student only route */}
//       <Route element={<ProtectedRoute allowedRoles={['student']} />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="/dashboard/admin" element={<StudentDashboard/>} />
//         </Route>
//       </Route>

//       {/* Instructor-Only Routes */}
//       <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
//         <Route element={<DashboardLayout />}>
          
//           <Route path="/cms/content" element={<ContentManager />} />
//           <Route path="/cms/media" element={<MediaLibrary />} />
//         </Route>
//       </Route>

//       {/* Default Redirect */}
//       <Route path="/" element={<Navigate to="/dashboard" replace />} />

//       {/* 404 */}
//       <Route path="*" element={<NotFound />} />
//     </>
//   )
// );

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       retry: 1,
//     },
//   },
// });
// const App: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     dispatch(getCurrentUser());
//   }, [dispatch]);

//   return (
//     <QueryClientProvider client={queryClient}>
//     <ConfigProvider
//       theme={{
//         algorithm: theme.defaultAlgorithm,
//         token: {
//           colorPrimary: '#FF9500',
//         },
//       }}
//     >
//       <RouterProvider router={router} />
//     </ConfigProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;


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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts & Guards
import PublicLayout from './components/common/Layout';
import DashboardLayout from './components/DashboardUi/MainDashLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Error Handling
import ErrorBoundary from './components/common/ErrorBoundary';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// General Pages
import NotFound from './pages/Notfound/Notfound';
import ProfilePage from './pages/profile';
import ConfigurationPage from './pages/dashboard/Configuration';

// Dashboard Pages
import AdminDashboard from './pages/dashboard/admin';
import StudentDashboard from './pages/dashboard/student';
import InstructorDashboard from './pages/dashboard/instructor';

// CMS Pages (Instructor only)
import ContentManager from './pages/cms/ContentManager';
import MediaLibrary from './pages/cms/MediaLibrary';
import UserDetailPage from "./pages/dashboard/UserDetail"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/verifyemail/:token" element={<VerifyEmail />} />
         {/* Redirect to default dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Fallback NotFound Route */}
       <Route path="*" element={<NotFound />} />
      </Route>

      {/* Protected Routes for All Authenticated Users */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Role-Based Dashboards */}
          <Route path="/dashboard/admin/" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
          <Route path="/dashboard/admin/users/:id" element={<UserDetailPage />} />
          <Route path="/dashboard/student" element={<ErrorBoundary><StudentDashboard /></ErrorBoundary>} />
          <Route path="/dashboard/instructor" element={<ErrorBoundary><InstructorDashboard /></ErrorBoundary>} />

          {/* Shared Authenticated Pages */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/configuration" element={<ConfigurationPage />} />

          {/* Instructor-only CMS Routes */}
          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="/cms/content" element={<ContentManager />} />
            <Route path="/cms/media" element={<MediaLibrary />} />
          </Route>
        </Route>
      </Route>

     
    </>
  )
);

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
  

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;









