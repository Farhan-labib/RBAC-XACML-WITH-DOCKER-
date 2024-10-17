const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');  // Add this line to import axios

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.post('/pep', async (req, res) => {
    const { user, resource, action } = req.body;

    try {
        // Example request to the PDP for decision-making
        const pdpResponse = await axios.post('http://pdp:8080/pdp', { user, resource, action });
        console.log('Received decision from PDP:', pdpResponse.data);

        const decision = pdpResponse.data.decision;

        if (decision === 'Permit') {
            res.json({ status: 'Access granted' });
        } else {
            res.json({ status: 'Access denied' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`PEP server running on port ${port}`);
});
