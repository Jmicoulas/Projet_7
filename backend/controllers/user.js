const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require('../mysqlParam');

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const user = req.body;
   bcrypt.hash(user.password, 10) 
  .then(hash => {
      user.password = hash;
      db.query(`INSERT INTO user SET ?`, user, (err, res, next) => {
          if (err) {
              console.log(err)
              return res.status(400).json("erreur")
          }
          return res.status(201).json({message : 'Votre compte a bien été crée !'});
      });
  });
};  

exports.login = (req, res, next) => {
  if (req.body.email && req.body.password) {
    
    db.query("SELECT * FROM user WHERE email= ?",req.body.email, (err, res, next) => {
      console.log(res.email);
      console.log(res);
      if (res.length > 0) {
        bcrypt.compare(req.body.password, res.password).then((valid) => {
          if (!valid) {
            res.status(401).json({ message: "Utilisateur ou mot de passe inconnu" });
          } else {
            console.log(email, "s'est connecté");
            res.status(200).json({
              email: res.email,
              status: status,
              token: jwt.sign(
                { userId: res.id, status: status },
                "rqOg7EwSwWLCnO23nan694ElZhni5oYA",
                { expiresIn: "24h" }
              ),
            });
          }
        });
      } else {
        res
          .status(401)
          .json({ message: "Utilisateur ou mot de passe inconnu" });
      }
    });
  } else {
    res
      .status(500)
      .json({ message: "Entrez votre email et votre mot de passe" });
  }
};

exports.deleteUser = (req, res, next) => {
  db.query("DELETE FROM user WHERE email= ?", req.body.email, (error, res) => {
    if (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    console.log("Le compte a bien été supprimé !");
    return res
      .status(200)
      .json({ message: "Votre compte a bien été supprimé !" });
  });
};

exports.getUsers = (req, res, next) => {
  db.query(
    "SELECT * FROM user WHERE email =?", req.body.email, (error, res) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(results);
    }
  );
};

exports.updateUser = (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10).then((hash) => {
    password = hash;
    db.query(`UPDATE user password='${password}'  WHERE email=${email}`,
      (error, res) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res
          .status(200)
          .json({ message: "Votre compte ont bien été modifié !" });
      }
    );
  });
};

exports.getOneUser = (req, res, next) => {
  db.query(
    "SELECT * FROM user WHERE email=?",
    req.params.email,
    (error, res) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(results);
    }
  );
};
