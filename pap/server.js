const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8082; // Different port from PEP and PDP

app.use(bodyParser.json());

// Example endpoint for PAP to manage policies
let policies = [
    {
        id: 1,
        resource: 'data1',
        action: 'read',
        role: 'employee1',
        decision: 'Permit'
    },
    {
        id: 2,
        resource: 'data2',
        action: 'write',
        role: 'employee2',
        decision: 'Permit'
    }
];

// Example endpoint to get all policies
app.get('/pap/policies', (req, res) => {
    res.json(policies);
});

app.listen(port, () => {
    console.log(`PAP server running on port ${port}`);
});
