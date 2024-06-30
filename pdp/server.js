const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080; // Port for PDP service

app.use(bodyParser.json());

// Example endpoint for PDP
app.post('/pdp', (req, res) => {
    const { user, resource } = req.body;

    // Example: Check if user role permits access to the resource
    // Implement your policy evaluation logic here

    // Example: Hardcoded policy evaluation
    if (user.role === 'employee1' && resource === '/api/data1') {
        res.json({ decision: 'Permit' });
    } else if (user.role === 'employee2' && resource === '/api/data2') {
        res.json({ decision: 'Permit' });
    } else {
        res.json({ decision: 'Deny' });
    }
});

app.listen(port, () => {
    console.log(`PDP server running on port ${port}`);
});
