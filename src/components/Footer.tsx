import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'} mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <GraduationCap className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="ml-2 text-xl font-bold">EduManager</span>
            </Link>
            <p className="mt-4 text-sm">
              Empowering students with the tools they need to succeed in their academic journey.
              Our platform streamlines educational management and enhances campus engagement.
            </p>
            <div className="mt-6 flex space-x-4">
              <a 
                href="#" 
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assignments" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Assignments
                </Link>
              </li>
              <li>
                <Link to="/exams" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Exams
                </Link>
              </li>
              <li>
                <Link to="/fees" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Fees
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/academic-performance" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Academic Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tech" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Technical Events
                </Link>
              </li>
              <li>
                <Link to="/sports" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Sports Events
                </Link>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Library Resources
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Student Handbook
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className={`text-sm ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                  Study Materials
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  GNE College Campus, Ludhiana, Punjab, India - 141006
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-sm">+91 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="text-sm">contact@edumanager.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} EduManager. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className={`text-xs ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-xs ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-xs ${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'}`}>
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 