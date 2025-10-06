const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB local URI
mongoose.connect('mongodb://localhost:27017/funlab')
  .then(() => console.log('✅ Connected to Local MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

// ✅ Mongoose Schema & Model
const entrySchema = new mongoose.Schema({
  name: String,
  regNo: String,
  contact: String,
  items: String,
}, { timestamps: true });

const Entry = mongoose.model('Entry', entrySchema);

// ✅ API Routes

// Get all entries
app.get('/api/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new entry
app.post('/api/entries', async (req, res) => {
  try {
    const entry = new Entry(req.body);
    const saved = await entry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid entry data' });
  }
});

// Delete entry by ID
app.delete('/api/entries/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
