const bcrypt = require('bcryptjs');
const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const AcademicPerformance = require('../models/AcademicPerformance');

const initializeData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await StudentProfile.deleteMany({});
    await AcademicPerformance.deleteMany({});

    // Create sample users
    const password = await bcrypt.hash('password123', 8);
    
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password,
      studentId: 'STU2024001',
      role: 'student'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password,
      studentId: 'STU2024002',
      role: 'student'
    });

    // Create student profiles
    await StudentProfile.create({
      user: user1._id,
      phone: '+1 (555) 123-4567',
      address: '123 Campus Street, University City, ST 12345',
      dateOfBirth: '1999-05-15',
      department: 'Computer Science',
      semester: '6th Semester',
      batch: '2021-2025',
      enrollmentDate: '2021-08-15',
      settings: {
        emailNotifications: true,
        smsNotifications: false,
        twoFactorAuth: false
      }
    });

    await StudentProfile.create({
      user: user2._id,
      phone: '+1 (555) 987-6543',
      address: '456 University Ave, College Town, ST 12345',
      dateOfBirth: '2000-03-20',
      department: 'Computer Science',
      semester: '6th Semester',
      batch: '2021-2025',
      enrollmentDate: '2021-08-15',
      settings: {
        emailNotifications: true,
        smsNotifications: true,
        twoFactorAuth: true
      }
    });

    // Create academic performance records
    await AcademicPerformance.create({
      student: user1._id,
      semester: '6th Semester',
      subjects: [
        {
          name: 'Mathematics',
          midterm: 85,
          final: 92,
          assignments: 88,
          attendance: 95,
          grade: 'A',
          status: 'excellent'
        },
        {
          name: 'Physics',
          midterm: 78,
          final: 85,
          assignments: 82,
          attendance: 90,
          grade: 'B+',
          status: 'good'
        },
        {
          name: 'Computer Science',
          midterm: 90,
          final: 95,
          assignments: 94,
          attendance: 92,
          grade: 'A+',
          status: 'excellent'
        }
      ],
      gpa: 3.8,
      completedCredits: 90
    });

    await AcademicPerformance.create({
      student: user2._id,
      semester: '6th Semester',
      subjects: [
        {
          name: 'Mathematics',
          midterm: 92,
          final: 95,
          assignments: 90,
          attendance: 98,
          grade: 'A+',
          status: 'excellent'
        },
        {
          name: 'Physics',
          midterm: 88,
          final: 90,
          assignments: 85,
          attendance: 95,
          grade: 'A',
          status: 'excellent'
        },
        {
          name: 'Computer Science',
          midterm: 95,
          final: 98,
          assignments: 96,
          attendance: 96,
          grade: 'A+',
          status: 'excellent'
        }
      ],
      gpa: 4.0,
      completedCredits: 90
    });

    console.log('Sample data initialized successfully');
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};

module.exports = initializeData; 