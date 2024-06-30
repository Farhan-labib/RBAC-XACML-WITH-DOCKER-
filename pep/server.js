const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 8080; // Port for PEP service

app.use(bodyParser.json());

// Example endpoint for PEP
app.post('/pep', async (req, res) => {
    const { user, resource, action } = req.body;

    try {
        // Send request to PDP for decision using service name
        const pdpResponse = await axios.post('http://pdp:8080/pdp', { user, resource });
        console.log('Received decision from PDP:', pdpResponse.data);
        // Example: Check PDP decision
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
