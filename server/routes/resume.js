const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { ObjectId } = require('mongodb');

// Get current user's resume
router.get('/', auth, async (req, res) => {
  try {
    const db = req.db;
    const resumesCollection = db.collection('resumes');

    const resume = await resumesCollection.findOne({ userId: new ObjectId(req.user.id) });
    if (!resume) {
      return res.status(404).json({ msg: 'No resume found for this user' });
    }

    res.json(resume.resumeData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update or strictly create user's resume
router.post('/', auth, async (req, res) => {
  try {
    const db = req.db;
    const resumesCollection = db.collection('resumes');
    const { resumeData } = req.body;

    const filter = { userId: new ObjectId(req.user.id) };
    const updateDef = {
      $set: {
        userId: new ObjectId(req.user.id),
        resumeData: resumeData,
        lastUpdated: new Date()
      }
    };

    // Upsert creates it if it doesn't exist, updates if it does.
    const result = await resumesCollection.updateOne(filter, updateDef, { upsert: true });

    res.json({ msg: 'Resume saved successfully', result });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
