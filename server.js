const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// DEV logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount router
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running ${process.env.NODE_ENV} mode on port ${PORT} !`.yellow.bold
  );
});

// Handle unhandle rejuctions
process.on('unhandledRejection', (err, promis) => {
  console.log(`Error: ${err.message}`);
  // close the server
  server.close(() => process.exit(1));
});