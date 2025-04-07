const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Assignment = require('../models/Assignment');
const AssignmentSubmission = require('../models/AssignmentSubmission');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept pdf, doc, docx, and txt files
  const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Get all assignments (with filters)
router.get('/', async (req, res) => {
  console.log('GET /api/assignments - Fetching assignments');
  try {
    const { semester, department, subject } = req.query;
    const query = {};

    if (semester) query.semester = semester;
    if (department) query.department = department;
    if (subject) query.subject = subject;

    console.log('Query filters:', query);

    const assignments = await Assignment.find(query)
      .populate('createdBy', 'name')
      .sort({ dueDate: 1 });
    console.log(`Found ${assignments.length} assignments`);

    res.json(assignments);
  } catch (err) {
    console.error('Error in GET /api/assignments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  console.log(`GET /api/assignments/${req.params.id} - Fetching assignment by ID`);
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('createdBy', 'name');

    if (!assignment) {
      console.log('Assignment not found');
      return res.status(404).json({ error: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (err) {
    console.error('Error in GET /api/assignments/:id:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new assignment
router.post('/', async (req, res) => {
  console.log('POST /api/assignments - Creating new assignment');
  try {
    console.log('Request body:', req.body);
    const assignment = new Assignment(req.body);
    await assignment.save();
    console.log('Assignment created successfully:', assignment);
    res.status(201).json(assignment);
  } catch (err) {
    console.error('Error in POST /api/assignments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit assignment (file upload)
router.post('/:id/submit', upload.single('file'), async (req, res) => {
  console.log(`POST /api/assignments/${req.params.id}/submit - Submitting assignment`);
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      console.log('Assignment not found');
      // Remove uploaded file if assignment not found
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // If there's an existing file, delete it
    if (assignment.fileUrl) {
      const oldFilePath = path.join(__dirname, '..', '..', assignment.fileUrl);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Update assignment with new file details
    assignment.fileUrl = `/uploads/${req.file.filename}`;
    assignment.fileName = req.file.originalname;
    assignment.fileSize = req.file.size;
    assignment.fileType = req.file.mimetype;
    assignment.uploadDate = new Date();

    await assignment.save();
    console.log('File uploaded successfully:', {
      fileName: assignment.fileName,
      fileSize: assignment.fileSize,
      fileType: assignment.fileType
    });
    res.json(assignment);
  } catch (err) {
    // Remove uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error in POST /api/assignments/:id/submit:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get submission status
router.get('/:id/submission/:studentId', async (req, res) => {
  try {
    const submission = await AssignmentSubmission.findOne({
      assignment: req.params.id,
      student: req.params.studentId
    }).populate('assignment');

    if (!submission) {
      return res.status(404).json({ error: 'No submission found' });
    }

    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 