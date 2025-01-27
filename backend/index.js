const express = require('express');
const cors = require('cors');
const pluginRoutes = require('./routes/plugin');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/plugin', pluginRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
