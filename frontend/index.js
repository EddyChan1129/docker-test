const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('🟢 Frontend (React Site Simulation)'));
app.listen(3000, '0.0.0.0', () => console.log('Frontend running on 3000'));
