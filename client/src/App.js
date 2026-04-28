import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import AddRecordPage from './pages/AddRecordPage';
import DoctorDashboard from './pages/DoctorDashboard';
import EmergencyProfile from './pages/EmergencyProfile';

// Simple Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/auth" />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to={role === 'patient' ? '/patient' : '/doctor'} />;
    }

    return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/emergency/:id" element={<EmergencyProfile />} />
        
        <Route 
          path="/patient" 
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/patient/add" 
          element={
            <ProtectedRoute allowedRole="patient">
              <AddRecordPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/doctor" 
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
