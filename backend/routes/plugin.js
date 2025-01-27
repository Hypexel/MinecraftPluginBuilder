const express = require('express');
const { buildPlugin } = require('../services/buildService');

const router = express.Router();

router.post('/build', async (req, res) => {
    try {
        const { config, sourceCode } = req.body;
        const jarPath = await buildPlugin(config, sourceCode);
        res.json({ jarPath });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
