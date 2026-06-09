const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Bypass local DNS issues for MongoDB SRV

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const { normalizeText } = require('./logic/textProcessor');
const { extractSkills } = require('./logic/skillExtractor');
const { analyzeResume } = require('./logic/atsScorer');
const { getJobRoles } = require('./data/jobRoles');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });


// MongoDB Native Client Setup
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  family: 4 // Forces IPv4 to bypass common Node.js 17+ DNS ECONNREFUSED bugs
});

let db;
let clientPromise;

async function getDB() {
  if (db) return db; // Return cached connection
  if (!clientPromise) {
    // Start connection once
    clientPromise = client.connect().catch(err => {
      console.error('MongoDB connection error.', err);
      clientPromise = null;
      throw err;
    });
  }
  await clientPromise;
  db = client.db('smartresume');
  console.log('Successfully connected to MongoDB Cloud via Native Driver.');
  return db;
}

async function requireDB(req, res, next) {
  try {
    req.db = await getDB();
    next();
  } catch (error) {
    return res.status(500).json({ msg: 'Database connection failed', error: error.message });
  }
}

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdfData = await pdf(req.file.buffer);
    const normalizedResumeText = normalizeText(pdfData.text);
    const skillsIndex = extractSkills(normalizedResumeText);
    const results = analyzeResume(
      skillsIndex,
      normalizedResumeText,
      getJobRoles(),
      req.body.customJobDescription
    );

    return res.json({
      success: true,
      extractedData: {
        skills: skillsIndex,
      },
      results,
    });
  } catch (error) {
    console.error('Resume analysis failed', error);
    return res.status(500).json({ error: 'Failed to process resume' });
  }
});

app.get('/api/jobs', (_req, res) => {
  res.json(getJobRoles());
});

// Routes
app.use('/api/auth', requireDB, require('./routes/auth'));
app.use('/api/resume', requireDB, require('./routes/resume'));

app.get('/api/health', async (req, res) => {
  try {
    await getDB();
    res.json({ status: 'ok', message: 'Smart Resume API is running with Native MongoDB integration.' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'MongoDB disconnected' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API for Vercel serverless deployment
module.exports = app;
