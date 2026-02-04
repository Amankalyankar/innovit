// Main App Component with Routing
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import i18n from './i18n/config';

// Pages
import Login from './pages/Login';
import VillagerDashboard from './pages/villager/VillagerDashboard';
import RaiseComplaint from './pages/villager/RaiseComplaint';
import ViewComplaints from './pages/villager/ViewComplaints';
import Transparency from './pages/villager/Transparency';
import SarpanchDashboard from './pages/sarpanch/SarpanchDashboard';
import ManageComplaints from './pages/sarpanch/ManageComplaints';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';

// Styles
import './styles/theme.css';
import './index.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />

            {/* Villager Routes */}
            <Route
              path="/villager/dashboard"
              element={
                <ProtectedRoute allowedRoles={['villager']}>
                  <VillagerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/villager/raise-complaint"
              element={
                <ProtectedRoute allowedRoles={['villager']}>
                  <RaiseComplaint />
                </ProtectedRoute>
              }
            />
            <Route
              path="/villager/view-complaints"
              element={
                <ProtectedRoute allowedRoles={['villager']}>
                  <ViewComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/villager/transparency"
              element={
                <ProtectedRoute allowedRoles={['villager']}>
                  <Transparency />
                </ProtectedRoute>
              }
            />

            {/* Sarpanch Routes */}
            <Route
              path="/sarpanch/dashboard"
              element={
                <ProtectedRoute allowedRoles={['sarpanch']}>
                  <SarpanchDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sarpanch/manage-complaints"
              element={
                <ProtectedRoute allowedRoles={['sarpanch']}>
                  <ManageComplaints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sarpanch/budget"
              element={
                <ProtectedRoute allowedRoles={['sarpanch']}>
                  <Transparency />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sarpanch/progress"
              element={
                <ProtectedRoute allowedRoles={['sarpanch']}>
                  <ManageComplaints />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/villages"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />

            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
