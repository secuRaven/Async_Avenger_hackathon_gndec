import React from 'react';
import { Download, TrendingUp, Award, BookOpen, BarChart } from 'lucide-react';

const AcademicPerformance = () => {
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
      icon: <Award className="analytics-icon" />,
    },
    {
      title: 'Average Score',
      value: '87%',
      icon: <TrendingUp className="analytics-icon" />,
    },
    {
      title: 'Completed Courses',
      value: '5/6',
      icon: <BookOpen className="analytics-icon" />,
    },
    {
      title: 'Performance Trend',
      value: '+12%',
      icon: <BarChart className="analytics-icon" />,
    },
  ];

  const handleDownloadReport = () => {
    // Implement report download logic here
    console.log('Downloading report...');
  };

  return (
    <div className="container">
      <h1>Academic Performance</h1>
      
      {/* Analytics Cards */}
      <div className="grid">
        {analytics.map((item, index) => (
          <div key={index} className="analytics-card">
            {item.icon}
            <div className="analytics-content">
              <div className="analytics-title">{item.title}</div>
              <div className="analytics-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Download and View Analytics buttons */}
      <div className="flex justify-between items-center mb-6">
        <button className="download-btn" onClick={handleDownloadReport}>
          <Download className="download-icon" />
          Download Report
        </button>
        <button className="download-btn">
          <BarChart className="download-icon" />
          View Analytics
        </button>
      </div>

      {/* Performance Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Midterm</th>
              <th>Final</th>
              <th>Assignments</th>
              <th>Attendance</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((item, index) => (
              <tr key={index}>
                <td>{item.subject}</td>
                <td>{item.midterm}%</td>
                <td>{item.final}%</td>
                <td>{item.assignments}%</td>
                <td>{item.attendance}%</td>
                <td>{item.grade}</td>
                <td>
                  <span className={`status-badge status-${item.status}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicPerformance; 