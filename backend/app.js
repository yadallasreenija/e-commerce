const express = require('express');
const ErrorHandler = require('./utils/Error');
const userRouter = require("./controller/user");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Fixed typo
app.use(express.urlencoded({ extended: true }));
app.use(express.static('upload'))

app.use('/api', userRouter); // Fixed incorrect variable name

if (process.env.NODE_ENV !== 'production')
    require('dotenv').config({ path: 'backend/config/.env' });

app.use(ErrorHandler);
module.exports = app;