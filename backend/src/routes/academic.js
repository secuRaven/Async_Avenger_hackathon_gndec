const express = require('express');
const router = express.Router();
const AcademicPerformance = require('../models/AcademicPerformance');

// Get academic performance for a student
router.get('/:studentId', async (req, res) => {
  try {
    const performance = await AcademicPerformance.findOne({ student: req.params.studentId });
    if (!performance) {
      return res.status(404).send({ error: 'Academic performance not found' });
    }
    res.send(performance);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create or update academic performance
router.post('/', async (req, res) => {
  try {
    const performance = await AcademicPerformance.findOneAndUpdate(
      { student: req.body.student, semester: req.body.semester },
      req.body,
      { new: true, upsert: true }
    );
    res.send(performance);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get academic performance report
router.get('/:studentId/report', async (req, res) => {
  try {
    const performance = await AcademicPerformance.findOne({ student: req.params.studentId })
      .populate('student', 'name studentId');
    
    if (!performance) {
      return res.status(404).send({ error: 'Academic performance not found' });
    }

    // Generate report data
    const report = {
      studentInfo: performance.student,
      semester: performance.semester,
      gpa: performance.gpa,
      completedCredits: performance.completedCredits,
      subjects: performance.subjects,
      overallPerformance: calculateOverallPerformance(performance.subjects)
    };

    res.send(report);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Helper function to calculate overall performance
function calculateOverallPerformance(subjects) {
  const totalSubjects = subjects.length;
  if (totalSubjects === 0) return 0;

  const performanceMap = {
    excellent: 4,
    good: 3,
    average: 2,
    poor: 1
  };

  const totalScore = subjects.reduce((sum, subject) => {
    return sum + performanceMap[subject.status];
  }, 0);

  return (totalScore / totalSubjects).toFixed(2);
}

module.exports = router; 