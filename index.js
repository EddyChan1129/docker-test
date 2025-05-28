const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/test')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error(err));

const Item = mongoose.model('Item', { name: String });

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json(item);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
});
