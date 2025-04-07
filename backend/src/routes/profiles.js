const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudentProfile = require('../models/StudentProfile');
const User = require('../models/User');

// Get profile by user ID
router.get('/:userId', auth, async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile
router.put('/:userId', auth, async (req, res) => {
  try {
    // Check if the user is updating their own profile
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized to update this profile' });
    }

    const {
      name,
      phone,
      address,
      dateOfBirth,
      department,
      semester,
      batch
    } = req.body;

    // Find and update profile
    let profile = await StudentProfile.findOne({ user: req.params.userId });

    if (!profile) {
      // If profile doesn't exist, create new one
      profile = new StudentProfile({
        user: req.params.userId,
        phone,
        address,
        dateOfBirth,
        department,
        semester,
        batch
      });
    } else {
      // Update existing profile
      profile.phone = phone;
      profile.address = address;
      profile.dateOfBirth = dateOfBirth;
      profile.department = department;
      profile.semester = semester;
      profile.batch = batch;
    }

    // Update user name if provided
    if (name) {
      await User.findByIdAndUpdate(req.params.userId, { name });
    }

    await profile.save();

    // Fetch updated profile with user details
    const updatedProfile = await StudentProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email');

    res.json(updatedProfile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 