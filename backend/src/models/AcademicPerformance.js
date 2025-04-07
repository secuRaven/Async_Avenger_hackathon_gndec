const mongoose = require('mongoose');

const academicPerformanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  subjects: [{
    name: {
      type: String,
      required: true
    },
    midterm: {
      type: Number,
      min: 0,
      max: 100
    },
    final: {
      type: Number,
      min: 0,
      max: 100
    },
    assignments: {
      type: Number,
      min: 0,
      max: 100
    },
    attendance: {
      type: Number,
      min: 0,
      max: 100
    },
    grade: {
      type: String,
      enum: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F']
    },
    status: {
      type: String,
      enum: ['excellent', 'good', 'average', 'poor'],
      required: true
    }
  }],
  gpa: {
    type: Number,
    min: 0,
    max: 4.0
  },
  completedCredits: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const AcademicPerformance = mongoose.model('AcademicPerformance', academicPerformanceSchema);
module.exports = AcademicPerformance; 