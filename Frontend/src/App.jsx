import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import MoodCheckPage from './pages/MoodCheckPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import TimerPage from './pages/TimerPage';
import CompletionPage from './pages/CompletionPage';
import HistoryPage from './pages/HistoryPage';
import ProfilePage from './pages/ProfilePage';

// Layout wrapper with Navbar
const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-cream-50">
    <Navbar />
    <main className="flex-1">{children}</main>
  </div>
);

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <LandingPage />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginPage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <RegisterPage />
              </Layout>
            }
          />

          {/* Onboarding (Protected, but allows users before onboarding is completed) */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute requireOnboarding={false}>
                <Layout>
                  <OnboardingPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Protected Application Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood-check"
            element={
              <ProtectedRoute>
                <Layout>
                  <MoodCheckPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/activity/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ActivityDetailPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/timer/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <TimerPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/completion"
            element={
              <ProtectedRoute>
                <Layout>
                  <CompletionPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <Layout>
                  <HistoryPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
