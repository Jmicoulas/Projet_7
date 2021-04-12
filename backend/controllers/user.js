const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../mysqlParam");

exports.signup = (req, res, next) => {
  const user = req.body;
  db.query("SELECT COUNT(email) AS ifEmailExist FROM user WHERE email= ?",
    user.email,
    (err, results, next) => {
      let string = JSON.stringify(results);
        let json = JSON.parse(string);
      if (json[0].ifEmailExist =! 0) {
        console.log("Cette adresse email est déjà utilisé");
        res.status(400).json("Cette adresse email a déjà été utilisé pour créer un compte");
      } else {
        bcrypt.hash(user.password, 10).then((hash) => {
          user.password = hash;
          db.query(`INSERT INTO user SET ?`, user, (err, results, next) => {
            if (err) {
              console.log(err);
              res.status(400).json("erreur lors de la création du compte");
            }
            res.status(201).json({ message: "Votre compte a bien été crée !" });
          });
        });
      }
    });
};

exports.login = (req, res, next) => {
  if (req.body.email && req.body.password) {
    db.query(
      "SELECT * FROM user WHERE email= ?",
      req.body.email,
      (err, results, next) => {
        if (err) {
          console.log("error in fetching data");
        }
        let string = JSON.stringify(results);
        let json = JSON.parse(string);
        // to get one value here is the option console.log(json[0].email);
        if (results.length > 0) {
          bcrypt.compare(req.body.password, json[0].password).then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Utilisateur ou mot de passe inconnu" });
            } else {
              console.log(json[0].email, "s'est connecté");
              res.status(200).json({
                email: res.email,
                token: jwt.sign(
                  { userId: json[0].id},
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
      }
    );
  } else {
    res
      .status(500)
      .json({ message: "Entrer votre email et votre mot de passe" });
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
    "SELECT * FROM user WHERE email =?",
    req.body.email,
    (error, res) => {
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
    db.query(
      `UPDATE user password='${password}'  WHERE email=${email}`,
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
    "SELECT * FROM user WHERE id=?",
    req.params.id,
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(results);
    }
  );
};
