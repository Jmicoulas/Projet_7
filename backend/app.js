const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const db = mysql.createConnection({
    host: "localhost",
    user: "GroupomaniaDB",
    password: "Praline1306*",
    database: "groupomania"
    });

db.connect(function(err) {
        if (err) throw err;
        console.log("Connecté à la base de données MySQL!");
      });

app.use('/api/auth', userRoutes);
app.use('/api', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;