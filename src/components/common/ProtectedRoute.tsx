// ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import  type { RootState } from '../../store/store';

interface ProtectedRouteProps {
  allowedRoles?: string[]; // e.g. ['admin', 'instructor']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth
  );

  // Show loading spinner while checking
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If not logged in, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles are specified but user role not in it → block
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has correct role
  return <Outlet />;
};

export default ProtectedRoute;
