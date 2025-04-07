import React, { useState } from 'react';
import { FileText, Calendar, Clock, AlertCircle } from 'lucide-react';

const Exams = () => {
  const [exams] = useState([
    {
      id: 1,
      title: 'Mid-Term Examination',
      course: 'Advanced Database Systems',
      date: '2025-04-20T09:00:00',
      duration: 180,
      status: 'upcoming',
      venue: 'Hall A-101',
      maxMarks: 100,
    },
    {
      id: 2,
      title: 'Final Examination',
      course: 'Data Structures and Algorithms',
      date: '2025-05-15T14:00:00',
      duration: 240,
      status: 'upcoming',
      venue: 'Hall B-201',
      maxMarks: 100,
    },
    {
      id: 3,
      title: 'Quiz 2',
      course: 'Full Stack Development',
      date: '2025-04-10T11:00:00',
      duration: 60,
      status: 'completed',
      marks: 45,
      maxMarks: 50,
      venue: 'Lab C-301',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'ongoing':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <AlertCircle className="h-4 w-4" />;
      case 'ongoing':
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${remainingMinutes}min`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Examinations</h1>
          <div className="flex space-x-2">
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">
              Calendar View
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              View Schedule
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 gap-4 p-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="border rounded-lg p-4 hover:border-indigo-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exam.title}
                    </h3>
                    <p className="text-gray-600">{exam.course}</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(exam.date)}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {formatDuration(exam.duration)}</span>
                      </span>
                    </div>
                    <p className="text-gray-500">Venue: {exam.venue}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                        exam.status
                      )}`}
                    >
                      {getStatusIcon(exam.status)}
                      <span className="capitalize">{exam.status}</span>
                    </span>
                    {exam.marks !== undefined && (
                      <span className="text-green-600 font-semibold">
                        Marks: {exam.marks}/{exam.maxMarks}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border hover:border-gray-300 transition-colors">
                    View Details
                  </button>
                  {exam.status === 'upcoming' && (
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors">
                      Set Reminder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;