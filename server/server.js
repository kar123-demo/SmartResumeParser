const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Bypass local DNS issues for MongoDB SRV

const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


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

async function connectDB() {
  try {
    await client.connect();
    db = client.db('smartresume'); // Connects to the smartresume database
    console.log('Successfully connected to MongoDB Cloud via Native Driver.');
  } catch (err) {
    console.error('MongoDB connection error. Please ensure your MONGO_URI is correct.', err);
  }
}

// Inject the db instance into the request object for routes to use
app.use((req, res, next) => {
  if (!db) {
    return res.status(503).json({ msg: 'Database connecting, please try again in a few seconds.' });
  }
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resume', require('./routes/resume'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Resume API is running with Native MongoDB integration.' });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the Express API for Vercel serverless deployment
module.exports = app;
