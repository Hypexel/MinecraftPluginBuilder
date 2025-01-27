const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Save plugin code
app.post('/save', (req, res) => {
  const { filename, code } = req.body;
  fs.writeFileSync(`plugins/${filename}`, code);
  res.status(200).send('File saved successfully!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
