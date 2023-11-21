require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const credentials = require('../middleware/credentials');
const corsOptions = require('../config/corsOptions');
const mongoose = require("mongoose");
const connectDB = require('../config/dbConnection');
const ussdRoutes = require('../routes/ussdRoutes');
const callRoutes = require('../routes/callRoutes');
const authRoutes = require('../routes/authRoutes');
const ambulanceRoutes = require('../routes/ambulanceRoutes');
const hospitalRoutes = require('../routes/hospitalRoutes');
const registerRoutes = require('../routes/registerRoutes');
const countRoutes = require('../routes/countRoutes');

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// middleware for json 
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// health check end point
app.get('/health', (req, res) => {
  res.status(200).json("OK");
});

app.use('/ussd', ussdRoutes);
app.use('/connect_client', callRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ambulance', ambulanceRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/count', countRoutes);

const staticPath = path.resolve('./');
app.use(express.static(path.join(staticPath, 'dashboard/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.join(staticPath, 'dashboard/dist/index.html'))
);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

const PORT = process.env.PORT;

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
  app.listen(PORT, () => console.log(`App running on ${PORT} ...`));
});
