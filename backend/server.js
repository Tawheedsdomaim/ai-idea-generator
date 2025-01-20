const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/generateIdea', async (req, res) => {
    const userInput = req.body.input;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt: `Suggest creative ideas based on: ${userInput}`,
            model: 'text-davinci-003',
            max_tokens: 100,
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` },
        });
        res.json({ idea: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).send('Error generating idea');
    }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
