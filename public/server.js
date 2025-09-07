const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Schema
const Drawing = mongoose.model('Drawing', {
  player: String,
  type: String,
  data: String
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Save game data
app.post('/api/save', async (req, res) => {
  try {
    await Drawing.insertMany(req.body);
    res.status(200).send({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).send({ error: "Failed to save" });
  }
});

// Get results
app.get('/api/results', async (req, res) => {
  const results = await Drawing.find({});
  res.json(results);
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
