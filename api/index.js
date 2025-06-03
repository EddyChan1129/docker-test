const express = require('express');
const app = express();
app.get('/api', (req, res) => res.send('🟡 API server working!'));
app.listen(3001, '0.0.0.0', () => console.log('API running on 3001'));
