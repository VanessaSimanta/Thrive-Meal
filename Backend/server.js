const express = require('express');
const app = express();
const PORT = 8000;

app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from Node.js backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});