const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const db = require('./models')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const webRoutes = require('./routes/web');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/auth', userRoutes);
app.use('/api', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/', webRoutes);

app.post('/send', upload.none(), (req, res) => {
  const formData = req.body;
  console.log('form data', formData);
  res.sendStatus(200);
});

module.exports = app;