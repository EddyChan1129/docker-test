const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/testdb';

app.use(express.json());

// 連接 MongoDB
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 建立 schema
const Item = mongoose.model('Item', {
  name: String,
  quantity: Number
});

// 🟢 GET 所有 item
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// 🟡 POST 新增 item
app.post('/items', async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

// 🔵 PUT 更新 item
app.put('/items/:id', async (req, res) => {
  const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// 🔴 DELETE 刪除 item
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// 開始監聽
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
