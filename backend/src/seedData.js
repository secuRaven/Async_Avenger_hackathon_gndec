const mongoose = require('mongoose');
const Assignment = require('./models/Assignment');
require('dotenv').config();

const dummyAssignments = [
  {
    title: "Data Structures Assignment 1",
    description: "Implement a binary search tree with insertion, deletion, and traversal operations.",
    dueDate: "2024-04-15",
    subject: "Data Structures",
    semester: 3,
    department: "Computer Science"
  },
  {
    title: "Database Management System Project",
    description: "Design and implement a normalized database schema for a library management system.",
    dueDate: "2024-04-20",
    subject: "DBMS",
    semester: 4,
    department: "Computer Science"
  },
  {
    title: "Machine Learning Assignment",
    description: "Implement a neural network for image classification using TensorFlow.",
    dueDate: "2024-04-25",
    subject: "Machine Learning",
    semester: 6,
    department: "Computer Science"
  },
  {
    title: "Web Development Project",
    description: "Create a responsive e-commerce website using React and Node.js.",
    dueDate: "2024-04-30",
    subject: "Web Development",
    semester: 5,
    department: "Computer Science"
  },
  {
    title: "Operating Systems Lab",
    description: "Implement process scheduling algorithms: FCFS, SJF, and Round Robin.",
    dueDate: "2024-05-05",
    subject: "Operating Systems",
    semester: 4,
    department: "Computer Science"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing assignments
    await Assignment.deleteMany({});
    console.log('Cleared existing assignments');

    // Insert dummy assignments
    const insertedAssignments = await Assignment.insertMany(dummyAssignments);
    console.log(`Added ${insertedAssignments.length} dummy assignments`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 