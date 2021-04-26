const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');


const corsOption ={
  origin: '*',
};
app.use(cors(corsOption));

app.use('/api/auth', userRoutes);
app.use('/api', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;