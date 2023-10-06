require('dotenv').config();
const express = require('express');
const app = express();
const ussdRoutes = require('../routes/ussdRoutes');
const callRoutes = require('../routes/callRoutes');

// middleware for json 
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

app.use('/ussd', ussdRoutes);
app.use('/connect_client', callRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on ${PORT} ...`));
