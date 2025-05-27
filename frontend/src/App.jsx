// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Login from './components/Login';
import Logout from './components/Logout';
import RegisterForm from './components/RegisterForm';

import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import ManagerPage from './pages/ManagerPage';

import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          

          {/* Routes protégées accessibles aux rôles user, admin, manager */}
          <Route element={<ProtectedRoute roles={['user', 'admin', 'manager']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* Routes protégées accessibles uniquement aux admins */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          {/* Routes protégées accessibles uniquement aux managers */}
          <Route element={<ProtectedRoute roles={['manager']} />}>
            <Route path="/manager" element={<ManagerPage />} />
          </Route>

          {/* Route accès refusé */}
          <Route path="/unauthorized" element={<h2>Accès refusé</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
