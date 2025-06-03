const express = require('express');
const app = express();
app.get('/admin', (req, res) => res.send('🔴 Admin Panel Active'));
app.listen(3002, '0.0.0.0', () => console.log('Admin running on 3002'));
