const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "GroupomaniaDB",
  password: "Praline1306*",
  database: "groupomania",
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
