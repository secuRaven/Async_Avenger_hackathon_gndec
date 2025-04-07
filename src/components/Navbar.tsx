import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, BookOpen, FileText, DollarSign, User, Menu, X, BarChart, LogOut, Users, Sun, Moon, Trophy, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAuthenticated(!!token);
    setIsAdmin(user.role === 'admin');
  };

  useEffect(() => {
    if (!['/login', '/register'].includes(location.pathname)) {
      checkAuth();
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path ? true : false;
  };

  const renderAuthLinks = () => (
    <div className="flex space-x-2">
      <Link 
        to="/login" 
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive('/login')
            ? 'bg-blue-600 text-white shadow-md' 
            : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
        }`}
      >
        Login
      </Link>
      <Link 
        to="/register" 
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive('/register')
            ? 'bg-indigo-600 text-white shadow-md' 
            : 'border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700'
        }`}
      >
        Register
      </Link>
    </div>
  );

  const NavLink = ({ to, icon: Icon, children }: { to: string; icon: React.ElementType; children: React.ReactNode }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
        isActive(to)
          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
          : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className={`${
      isDarkMode 
        ? 'bg-gray-800 text-white border-b border-gray-700' 
        : 'bg-white text-gray-800 border-b border-gray-200 shadow-sm'
    } sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                EduManager
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {location.pathname === '/login' || location.pathname === '/register' ? (
              renderAuthLinks()
            ) : !isAuthenticated ? (
              renderAuthLinks()
            ) : (
              <div className="flex items-center space-x-2">
                {isAdmin ? (
                  <NavLink to="/admin" icon={Users}>
                    Admin Panel
                  </NavLink>
                ) : (
                  <>
                    <NavLink to="/assignments" icon={BookOpen}>
                      Assignments
                    </NavLink>
                    <NavLink to="/sports" icon={Trophy}>
                      Sports
                    </NavLink>
                    <NavLink to="/tech" icon={Cpu}>
                      Tech Events
                    </NavLink>
                    <NavLink to="/profile" icon={User}>
                      Profile
                    </NavLink>
                    <NavLink to="/exams" icon={FileText}>
                      Exams
                    </NavLink>
                    <NavLink to="/fees" icon={DollarSign}>
                      Fees
                    </NavLink>
                    <NavLink to="/academic-performance" icon={BarChart}>
                      Performance
                    </NavLink>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium border border-red-300 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
          {location.pathname === '/login' || location.pathname === '/register' ? (
            <div className="flex flex-col space-y-2 px-2">
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/login')
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/register')
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Register
              </Link>
            </div>
          ) : !isAuthenticated ? (
            <div className="flex flex-col space-y-2 px-2">
              <Link
                to="/login"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/login')
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/register')
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                }`}
              >
                Register
              </Link>
            </div>
          ) : (
            <>
              {isAdmin ? (
                <Link
                  to="/admin"
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                    isActive('/admin')
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Admin Panel
                </Link>
              ) : (
                <>
                  <Link
                    to="/assignments"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/assignments')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Assignments
                  </Link>
                  <Link
                    to="/sports"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/sports')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Trophy className="h-5 w-5 mr-2" />
                    Sports
                  </Link>
                  <Link
                    to="/tech"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/tech')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Cpu className="h-5 w-5 mr-2" />
                    Tech Events
                  </Link>
                  <Link
                    to="/profile"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/profile')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/exams"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/exams')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Exams
                  </Link>
                  <Link
                    to="/fees"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/fees')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Fees
                  </Link>
                  <Link
                    to="/academic-performance"
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive('/academic-performance')
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <BarChart className="h-5 w-5 mr-2" />
                    Performance
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 mt-2"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;