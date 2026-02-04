// Protected Route Component
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height: '100vh' }}>
        <div className="animate-spin" style={{ 
          width: '48px', 
          height: '48px', 
          border: '4px solid var(--color-primary-soft)', 
          borderTop: '4px solid var(--color-primary)',
          borderRadius: '50%'
        }}></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'villager') return <Navigate to="/villager/dashboard" replace />;
    if (user.role === 'sarpanch') return <Navigate to="/sarpanch/dashboard" replace />;
    if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
