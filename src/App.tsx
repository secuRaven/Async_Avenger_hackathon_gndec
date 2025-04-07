import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import Assignments from './pages/Assignments';
import Exams from './pages/Exams';
import Fees from './pages/Fees';
import AcademicPerformance from './pages/AcademicPerformance';
import AdminPanel from './pages/AdminPanel';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SportsEvents from './pages/SportsEvents';
import TechnicalEvents from './pages/TechnicalEvents';
import Chatbot from './components/Chatbot';
import { ThemeProvider } from './context/ThemeContext';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// AdminRoute component to protect admin routes
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin' ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public routes - no authentication required */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/sports" element={<SportsEvents />} />
              <Route path="/tech" element={<TechnicalEvents />} />
              
              {/* Protected routes */}
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/exams" element={
                <PrivateRoute>
                  <Exams />
                </PrivateRoute>
              } />
              <Route path="/fees" element={
                <PrivateRoute>
                  <Fees />
                </PrivateRoute>
              } />
              <Route path="/academic-performance" element={
                <PrivateRoute>
                  <AcademicPerformance />
                </PrivateRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;