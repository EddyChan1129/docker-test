// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('🎉 Hello from Dockerized Node.js!');
});

const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`App running on http://localhost:${port}`);
});
