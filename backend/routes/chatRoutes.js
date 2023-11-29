const express = require('express');
const axios = require('axios');

const router = express.Router();

require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;

router.post('/mensaje', async (req, res) => {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: "text-davinci-003", // o el modelo que prefieras
            prompt: req.body.mensaje,   // El mensaje del usuario
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ respuesta: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
