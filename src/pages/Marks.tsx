import React, { useState } from 'react';
import { Award, BookOpen, BarChart } from 'lucide-react';

const Marks = () => {
  const [courses] = useState([
    {
      id: 1,
      name: 'Advanced Database Systems',
      code: 'CS401',
      assessments: [
        { type: 'Mid-Term', marks: 85, maxMarks: 100 },
        { type: 'Assignment 1', marks: 92, maxMarks: 100 },
        { type: 'Quiz 1', marks: 18, maxMarks: 20 },
      ],
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS301',
      assessments: [
        { type: 'Mid-Term', marks: 78, maxMarks: 100 },
        { type: 'Assignment 1', marks: 88, maxMarks: 100 },
        { type: 'Quiz 1', marks: 17, maxMarks: 20 },
      ],
    },
    {
      id: 3,
      name: 'Full Stack Development',
      code: 'CS501',
      assessments: [
        { type: 'Mid-Term', marks: 90, maxMarks: 100 },
        { type: 'Project 1', marks: 95, maxMarks: 100 },
        { type: 'Quiz 1', marks: 19, maxMarks: 20 },
      ],
    },
  ]);

  const calculateGrade = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const calculateCourseAverage = (assessments: Array<{ marks: number; maxMarks: number }>) => {
    const totalMarks = assessments.reduce((sum, assessment) => sum + assessment.marks, 0);
    const totalMaxMarks = assessments.reduce((sum, assessment) => sum + assessment.maxMarks, 0);
    return (totalMarks / totalMaxMarks) * 100;
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'B':
        return 'text-blue-600 bg-blue-100';
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      case 'D':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
          <div className="flex space-x-2">
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">
              Download Report
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              View Analytics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {courses.map((course) => {
            const courseAverage = calculateCourseAverage(course.assessments);
            const courseGrade = calculateGrade(courseAverage, 100);

            return (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h2>
                      <p className="text-gray-600">{course.code}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Course Grade:</span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(
                          courseGrade
                        )}`}
                      >
                        {courseGrade}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        {course.assessments.map((assessment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-5 w-5 text-gray-500" />
                              <span className="font-medium text-gray-700">
                                {assessment.type}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className="text-gray-600">
                                {assessment.marks}/{assessment.maxMarks}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(
                                  calculateGrade(assessment.marks, assessment.maxMarks)
                                )}`}
                              >
                                {calculateGrade(assessment.marks, assessment.maxMarks)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Course Statistics
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Average Score</span>
                            <span className="font-semibold">
                              {courseAverage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total Assessments</span>
                            <span className="font-semibold">
                              {course.assessments.length}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Highest Score</span>
                            <span className="font-semibold">
                              {Math.max(
                                ...course.assessments.map(
                                  (a) => (a.marks / a.maxMarks) * 100
                                )
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Marks;