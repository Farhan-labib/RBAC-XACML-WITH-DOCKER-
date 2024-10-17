const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // for making HTTP requests

const app = express();
const port = 8080; // Port for PDP service

app.use(bodyParser.json());

// Example endpoint for PDP
app.post('/pdp', async (req, res) => {
    const { user, resource, action } = req.body;

    try {
        // Fetch policies from PAP
        const response = await axios.get('http://pap:8082/pap/policies'); // Assuming PAP is running on port 8082
        const policies = response.data;

        // Example: Check if user role permits access to the resource based on fetched policies
        const decision = policies.some(policy =>
            policy.role === user.role && policy.resource === resource && policy.action===action  && policy.decision === 'Permit'
        ) ? 'Permit' : 'Deny';

        res.json({ decision });
    } catch (error) {
        console.error('Error fetching policies from PAP:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`PDP server running on port ${port}`);
});
