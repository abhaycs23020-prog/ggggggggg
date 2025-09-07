const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Data schema (example)
const Drawing = mongoose.model('Drawing', {
  player: String,
  type: String, // 'drawing' or 'guess'
  data: String  // base64 image or text
});

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API to save data
app.post('/api/save', async (req, res) => {
  try {
    const payload = req.body; // array of {player, type, data}
    await Drawing.insertMany(payload);
    res.status(200).send({ message: 'Saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Failed to save' });
  }
});

// API to fetch all results
app.get('/api/results', async (req, res) => {
  const drawings = await Drawing.find({});
  res.json(drawings);
});

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
