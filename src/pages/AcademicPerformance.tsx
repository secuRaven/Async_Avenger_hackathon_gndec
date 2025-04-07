import React, { useState } from 'react';
import { Download, TrendingUp, Award, BookOpen, BarChart, Check, Loader, X, PieChart, LineChart } from 'lucide-react';

// Function to generate performance report PDF
const generatePDF = (performanceData: any[], analytics: any[], studentInfo: any) => {
  // Create content for the report
  const content = `
===============================================
ACADEMIC PERFORMANCE REPORT
===============================================
Student: ${studentInfo.name}
URN: ${studentInfo.urn}
Semester: ${studentInfo.semester}
Department: ${studentInfo.department}
Date Generated: ${new Date().toLocaleDateString()}

===============================================
ANALYTICS SUMMARY
===============================================
Overall GPA: ${analytics[0].value}
Average Score: ${analytics[1].value}
Completed Courses: ${analytics[2].value}
Performance Trend: ${analytics[3].value}

===============================================
SUBJECT PERFORMANCE
===============================================
${performanceData.map(item => (
  `Subject: ${item.subject}
  Midterm: ${item.midterm}%
  Final: ${item.final}%
  Assignments: ${item.assignments}%
  Attendance: ${item.attendance}%
  Grade: ${item.grade}
  Status: ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}
  
  `)).join('\n')}
===============================================
  `;

  // Create a blob with the text content
  const blob = new Blob([content], { type: 'text/plain' });
  
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a link element
  const link = document.createElement('a');
  
  // Set link properties
  link.href = url;
  link.download = `academic_performance_report_${studentInfo.urn}.txt`;
  
  // Append link to body
  document.body.appendChild(link);
  
  // Click the link to trigger download
  link.click();
  
  // Remove link from body
  document.body.removeChild(link);
  
  // Release the URL object
  URL.revokeObjectURL(url);
  
  return true;
};

const AcademicPerformance = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Student info - replace with actual data from your backend
  const studentInfo = {
    name: 'John Doe',
    urn: '19BCE1234',
    semester: 'Spring 2024',
    department: 'Computer Science Engineering'
  };

  // Sample data - replace with actual data from your backend
  const performanceData = [
    {
      subject: 'Mathematics',
      midterm: 85,
      final: 92,
      assignments: 88,
      attendance: 95,
      grade: 'A',
      status: 'excellent',
    },
    {
      subject: 'Physics',
      midterm: 78,
      final: 85,
      assignments: 82,
      attendance: 90,
      grade: 'B+',
      status: 'good',
    },
    {
      subject: 'Chemistry',
      midterm: 72,
      final: 78,
      assignments: 75,
      attendance: 85,
      grade: 'B',
      status: 'good',
    },
    {
      subject: 'English',
      midterm: 88,
      final: 90,
      assignments: 92,
      attendance: 98,
      grade: 'A',
      status: 'excellent',
    },
    {
      subject: 'Computer Science',
      midterm: 90,
      final: 95,
      assignments: 94,
      attendance: 92,
      grade: 'A+',
      status: 'excellent',
    },
  ];

  const analytics = [
    {
      title: 'Overall GPA',
      value: '3.8',
      icon: <Award className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Average Score',
      value: '87%',
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Completed Courses',
      value: '5/6',
      icon: <BookOpen className="h-6 w-6 text-purple-500" />,
    },
    {
      title: 'Performance Trend',
      value: '+12%',
      icon: <BarChart className="h-6 w-6 text-orange-500" />,
    },
  ];

  const handleDownloadReport = async () => {
    setDownloading(true);
    setDownloadSuccess(false);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate and download PDF report
      const success = generatePDF(performanceData, analytics, studentInfo);
      
      if (success) {
        setDownloadSuccess(true);
        // Reset success message after 3 seconds
        setTimeout(() => {
          setDownloadSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setDownloading(false);
    }
  };

  // Analytics modal content
  const AnalyticsModal = () => {
    if (!showAnalytics) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Performance Analytics</h2>
              <button 
                onClick={() => setShowAnalytics(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Bar Chart - Subject Performance */}
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Subject Performance</h3>
                <div className="h-64 flex items-end space-x-2">
                  {performanceData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="relative w-full flex justify-center mb-1">
                        <div 
                          className={`w-12 ${
                            item.final >= 90 ? 'bg-green-500' : 
                            item.final >= 80 ? 'bg-blue-500' : 
                            item.final >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          } rounded-t`} 
                          style={{ height: `${item.final}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis w-12 text-center">
                        {item.subject.substr(0, 4)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center mr-3">
                      <div className="w-3 h-3 bg-green-500 mr-1 rounded"></div>
                      <span>90-100%</span>
                    </div>
                    <div className="flex items-center mr-3">
                      <div className="w-3 h-3 bg-blue-500 mr-1 rounded"></div>
                      <span>80-89%</span>
                    </div>
                    <div className="flex items-center mr-3">
                      <div className="w-3 h-3 bg-yellow-500 mr-1 rounded"></div>
                      <span>70-79%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 mr-1 rounded"></div>
                      <span>Below 70%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Pie Chart - Assessment Breakdown */}
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Assessment Breakdown
                </h3>
                <div className="flex justify-center">
                  <div className="relative w-48 h-48">
                    <PieChart className="w-full h-full text-gray-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">87%</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Overall</span>
                      </div>
                    </div>
                    
                    {/* Pie chart segments (simplified visual representation) */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium py-1 px-2 rounded">
                      Midterm: 82%
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs font-medium py-1 px-2 rounded">
                      Final: 88%
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-medium py-1 px-2 rounded">
                      Assignments: 86%
                    </div>
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200 text-xs font-medium py-1 px-2 rounded">
                      Attendance: 92%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Progress over time */}
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Progress Over Time</h3>
                <div className="h-64 relative">
                  {/* Simplified line chart visualization */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div> {/* x-axis */}
                  <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-300"></div> {/* y-axis */}
                  
                  {/* Line path */}
                  <div className="absolute bottom-0 left-0 right-0 h-full p-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      <path
                        d="M0,70 Q25,30 50,50 T100,20"
                        stroke="#4F46E5"
                        strokeWidth="3"
                        fill="none"
                        className="drop-shadow"
                      />
                      <circle cx="0" cy="70" r="3" fill="#4F46E5" />
                      <circle cx="25" cy="30" r="3" fill="#4F46E5" />
                      <circle cx="50" cy="50" r="3" fill="#4F46E5" />
                      <circle cx="75" cy="35" r="3" fill="#4F46E5" />
                      <circle cx="100" cy="20" r="3" fill="#4F46E5" />
                    </svg>
                  </div>
                  
                  {/* Y-axis labels */}
                  <div className="absolute top-0 left-2 text-xs text-gray-600 dark:text-gray-400">100%</div>
                  <div className="absolute top-1/2 left-2 text-xs text-gray-600 dark:text-gray-400">50%</div>
                  <div className="absolute bottom-0 left-2 text-xs text-gray-600 dark:text-gray-400">0%</div>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-600 dark:text-gray-400 pt-2">
                    <span>Week 1</span>
                    <span>Week 4</span>
                    <span>Week 8</span>
                    <span>Week 12</span>
                    <span>Week 16</span>
                  </div>
                </div>
              </div>
              
              {/* Grade distribution */}
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Grade Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <span>A+</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <span>A</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <span>B+</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <span>B</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mb-1">
                      <span>C and below</span>
                      <span>0%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    <div className="font-medium">Your Position: Top 20%</div>
                    <div>Above class average by 12%</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setShowAnalytics(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
        <div className="text-sm text-gray-600">
          <div>Name: {studentInfo.name}</div>
          <div>URN: {studentInfo.urn}</div>
          <div>Semester: {studentInfo.semester}</div>
        </div>
      </div>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analytics.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-300 flex items-center">
            <div className="mr-4">
              {item.icon}
            </div>
            <div>
              <div className="text-sm text-gray-500">{item.title}</div>
              <div className="text-2xl font-semibold">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Download and View Analytics buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          className={`flex items-center px-4 py-2 rounded-md shadow-sm text-white transition-colors ${
            downloading 
              ? 'bg-gray-500 cursor-not-allowed' 
              : downloadSuccess 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={handleDownloadReport}
          disabled={downloading}
        >
          {downloading ? (
            <>
              <Loader className="h-5 w-5 mr-2 animate-spin" />
              Generating Report...
            </>
          ) : downloadSuccess ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Report Downloaded
            </>
          ) : (
            <>
              <Download className="h-5 w-5 mr-2" />
              Download Report
            </>
          )}
        </button>
        <button 
          className="flex items-center px-4 py-2 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          onClick={() => setShowAnalytics(true)}
        >
          <BarChart className="h-5 w-5 mr-2" />
          View Analytics
        </button>
      </div>

      {/* Performance Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-300">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Midterm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {performanceData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.midterm}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.final}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.assignments}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.attendance}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'excellent' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'good' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Analytics Modal */}
      <AnalyticsModal />
    </div>
  );
};

export default AcademicPerformance; 