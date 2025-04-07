import React, { useState, useEffect, useRef } from 'react';
import { FileText, Calendar, Clock, Upload, AlertTriangle, Download, X, BookOpen, Building2 } from 'lucide-react';

interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  semester: number;
  department: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  uploadDate?: string;
}

// Dummy assignments data
const dummyAssignments: Assignment[] = [
  {
    _id: "1",
    title: "Data Structures Assignment 1",
    description: "Implement a binary search tree with insertion, deletion, and traversal operations.",
    dueDate: "2024-04-15",
    subject: "Data Structures",
    semester: 3,
    department: "Computer Science Engineering"
  },
  {
    _id: "2",
    title: "Database Management System Project",
    description: "Design and implement a normalized database schema for a library management system.",
    dueDate: "2024-04-20",
    subject: "DBMS",
    semester: 4,
    department: "Computer Science"
  },
  {
    _id: "3",
    title: "Machine Learning Assignment",
    description: "Implement a neural network for image classification using TensorFlow.",
    dueDate: "2024-04-25",
    subject: "Machine Learning",
    semester: 6,
    department: "Computer Science"
  },
  {
    _id: "4",
    title: "Web Development Project",
    description: "Create a responsive e-commerce website using React and Node.js.",
    dueDate: "2024-04-30",
    subject: "Web Development",
    semester: 5,
    department: "Information Technology"
  },
  {
    _id: "5",
    title: "Operating Systems Lab",
    description: "Implement process scheduling algorithms: FCFS, SJF, and Round Robin.",
    dueDate: "2024-05-05",
    subject: "Operating Systems",
    semester: 4,
    department: "Computer Science Engineering"
  },
  {
    _id: "6",
    title: "Circuit Theory Assignment",
    description: "Analyze and solve complex AC circuit problems using mesh and nodal analysis.",
    dueDate: "2024-04-18",
    subject: "Circuit Theory",
    semester: 3,
    department: "Electronics and Communication Engineering"
  },
  {
    _id: "7",
    title: "Mechanics of Solids",
    description: "Solve problems related to stress, strain, and deformation in solid materials.",
    dueDate: "2024-04-22",
    subject: "Mechanics",
    semester: 4,
    department: "Mechanical Engineering"
  },
  {
    _id: "8",
    title: "Structural Analysis",
    description: "Analyze different types of structures under various loading conditions.",
    dueDate: "2024-04-28",
    subject: "Structures",
    semester: 5,
    department: "Civil Engineering"
  },
  {
    _id: "9",
    title: "Power Systems",
    description: "Design and analyze electrical power transmission and distribution systems.",
    dueDate: "2024-05-02",
    subject: "Power Systems",
    semester: 6,
    department: "Electrical Engineering"
  }
];

const Assignments = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>({});
  const [submitting, setSubmitting] = useState<{ [key: string]: boolean }>({});
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement }>({});
  const [filter, setFilter] = useState({ semester: '', subject: '', department: '' });

  // Add department mapping for acronyms
  const departmentMap: Record<string, string[]> = {
    'CSE': ['Computer Science', 'Computer Science Engineering'],
    'ECE': ['Electronics and Communication Engineering', 'Electronics Engineering'],
    'ME': ['Mechanical Engineering'],
    'CE': ['Civil Engineering'],
    'EE': ['Electrical Engineering'],
    'IT': ['Information Technology']
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileClick = (assignmentId: string) => {
    fileInputRefs.current[assignmentId]?.click();
  };

  const handleFileChange = (assignmentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should not exceed 10MB');
        return;
      }
      
      setSelectedFiles(prev => ({
        ...prev,
        [assignmentId]: file
      }));
      setError('');
    }
  };

  const handleSubmit = async (assignmentId: string) => {
    const file = selectedFiles[assignmentId];
    if (!file) return;

    try {
      setSubmitting(prev => ({ ...prev, [assignmentId]: true }));
      setUploadProgress(prev => ({ ...prev, [assignmentId]: 0 }));

      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({
          ...prev,
          [assignmentId]: Math.min(progress, 100)
        }));
        
        if (progress >= 100) {
          clearInterval(interval);
          // Simulate successful upload
          setAssignments(prev => prev.map(assignment => {
            if (assignment._id === assignmentId) {
              return {
                ...assignment,
                fileUrl: URL.createObjectURL(file),
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                uploadDate: new Date().toISOString()
              };
            }
            return assignment;
          }));
          
          // Clear selected file
          setSelectedFiles(prev => {
            const newState = { ...prev };
            delete newState[assignmentId];
            return newState;
          });
          setUploadProgress(prev => {
            const newState = { ...prev };
            delete newState[assignmentId];
            return newState;
          });
          setSubmitting(prev => ({ ...prev, [assignmentId]: false }));
        }
      }, 500);

    } catch (err: any) {
      setError(err.message);
      setSubmitting(prev => ({ ...prev, [assignmentId]: false }));
    }
  };

  const removeSelectedFile = (assignmentId: string) => {
    setSelectedFiles(prev => {
      const newState = { ...prev };
      delete newState[assignmentId];
      return newState;
    });
    if (fileInputRefs.current[assignmentId]) {
      fileInputRefs.current[assignmentId].value = '';
    }
  };

  // Enhanced filter function to support department acronyms
  const filteredAssignments = assignments.filter(assignment => {
    // Semester filter
    const semesterMatch = !filter.semester || assignment.semester.toString() === filter.semester;
    
    // Subject filter
    const subjectMatch = !filter.subject || 
      assignment.subject.toLowerCase().includes(filter.subject.toLowerCase());
    
    // Enhanced department filter
    let departmentMatch = !filter.department;
    
    if (filter.department) {
      const searchTerm = filter.department.toUpperCase();
      
      // Direct match with department name
      if (assignment.department.toLowerCase().includes(filter.department.toLowerCase())) {
        departmentMatch = true;
      } 
      // Check if search term is an acronym
      else if (Object.keys(departmentMap).includes(searchTerm)) {
        // Check if the assignment's department is in the mapped full names
        departmentMatch = departmentMap[searchTerm].some(dept => 
          assignment.department.toLowerCase().includes(dept.toLowerCase())
        );
      }
    }
    
    return semesterMatch && subjectMatch && departmentMatch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Assignments</h1>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow mb-6 border border-gray-300">
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                id="semester"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={filter.semester}
                onChange={(e) => setFilter(prev => ({ ...prev, semester: e.target.value }))}
              >
                <option value="">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>{`Semester ${sem}`}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                  placeholder="Filter by subject..."
                  value={filter.subject}
                  onChange={(e) => setFilter(prev => ({ ...prev, subject: e.target.value }))}
                />
                {filter.subject && (
                  <button
                    onClick={() => setFilter(prev => ({ ...prev, subject: '' }))}
                    className="absolute inset-y-0 right-0 mt-1 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="department"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                  placeholder="Filter by department or code (e.g. CSE)..."
                  value={filter.department}
                  onChange={(e) => setFilter(prev => ({ ...prev, department: e.target.value }))}
                />
                {filter.department && (
                  <button
                    onClick={() => setFilter(prev => ({ ...prev, department: '' }))}
                    className="absolute inset-y-0 right-0 mt-1 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.keys(departmentMap).map(acronym => (
                  <button
                    key={acronym}
                    onClick={() => setFilter(prev => ({ ...prev, department: acronym }))}
                    className={`text-xs px-2 py-1 rounded-md transition-colors ${
                      filter.department.toUpperCase() === acronym
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {acronym}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filter.semester || filter.subject || filter.department) && (
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-blue-50 p-3 rounded-md border border-blue-200">
              <span className="text-sm font-medium text-blue-700">Active Filters:</span>
              
              {filter.semester && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Semester: {filter.semester}
                  <button 
                    onClick={() => setFilter(prev => ({ ...prev, semester: '' }))}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {filter.subject && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Subject: {filter.subject}
                  <button 
                    onClick={() => setFilter(prev => ({ ...prev, subject: '' }))}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              {filter.department && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Department: {filter.department}
                  <button 
                    onClick={() => setFilter(prev => ({ ...prev, department: '' }))}
                    className="ml-1 text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              
              <button
                onClick={() => setFilter({ semester: '', subject: '', department: '' })}
                className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Show count of filtered assignments */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredAssignments.length} of {assignments.length} assignments
            </p>
          </div>

          {error && (
            <div className="p-4 text-red-600 bg-red-50 rounded-lg mb-6 border border-red-300">
              <AlertTriangle className="inline-block mr-2" />
              {error}
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {filteredAssignments.map((assignment) => (
            <div key={assignment._id} className="bg-white shadow rounded-lg p-6 border border-gray-300 hover:border-blue-400 transition-colors duration-200">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{assignment.title}</h2>
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>Subject: {assignment.subject}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="h-4 w-4 mr-1" />
                      <span>Semester: {assignment.semester}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <input
                  type="file"
                  ref={el => fileInputRefs.current[assignment._id] = el!}
                  onChange={(e) => handleFileChange(assignment._id, e)}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />

                {!selectedFiles[assignment._id] ? (
                  <button
                    onClick={() => handleFileClick(assignment._id)}
                    className="inline-flex items-center px-4 py-2 border border-gray-400 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </button>
                ) : (
                    <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {selectedFiles[assignment._id].name}
                      </span>
                          <span className="text-sm text-gray-500">
                            ({formatFileSize(selectedFiles[assignment._id].size)})
                      </span>
                        </div>
                        <button
                          onClick={() => removeSelectedFile(assignment._id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {uploadProgress[assignment._id] !== undefined && (
                        <div className="mt-2">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress[assignment._id]}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleSubmit(assignment._id)}
                      disabled={submitting[assignment._id]}
                      className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {submitting[assignment._id] ? (
                        'Uploading...'
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {assignment.fileUrl && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-green-300">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Uploaded File:</h3>
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4 text-gray-400" />
                    <a
                      href={assignment.fileUrl}
                      download={assignment.fileName}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {assignment.fileName}
                    </a>
                    <span className="text-sm text-gray-500">
                      ({assignment.fileSize && formatFileSize(assignment.fileSize)})
                    </span>
                  </div>
                  {assignment.uploadDate && (
                    <div className="mt-2 text-xs text-gray-500">
                      Uploaded: {new Date(assignment.uploadDate).toLocaleString()}
                    </div>
                  )}
                </div>
              )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;