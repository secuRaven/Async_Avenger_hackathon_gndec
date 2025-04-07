import React from 'react';
import { Book, User, MessageSquare, Calendar, Award, FileText } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Student Portal
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Manage your assignments, view your profile, and get help from our chatbot.
          </p>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your one-stop solution for academic management and campus engagement. Access course materials, 
            track your performance, participate in events, and stay connected with campus activities.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Book className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Assignments</h3>
                  <p className="mt-2 text-gray-600">
                    View, upload, and track your assignments from all courses. Get notifications for upcoming deadlines.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Profile Management</h3>
                  <p className="mt-2 text-gray-600">
                    Maintain your academic profile, update personal information, and track your progress through semesters.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Exams & Schedule</h3>
                  <p className="mt-2 text-gray-600">
                    Stay informed about upcoming exams, view your exam schedule, and access past results.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Events & Activities</h3>
                  <p className="mt-2 text-gray-600">
                    Participate in sports, tech events, competitions, and cultural activities happening around the campus.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Academic Records</h3>
                  <p className="mt-2 text-gray-600">
                    View your attendance, grades, CGPA, and performance metrics across different subjects.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Assistant Chatbot</h3>
                  <p className="mt-2 text-gray-600">
                    Get instant answers to your queries about courses, deadlines, events, and campus facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 