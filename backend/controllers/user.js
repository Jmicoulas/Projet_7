const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
          nom : req.body.nom,
          prenom : req.body.prenom,
          roles : '2'
        });
        db.query('INSERT INTO user SET ?', user, (err, res) => {
            if(err) throw err;
            console.log('Last insert ID:', res.insertId);
        })
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    db.query('SELECT * FROM user WHERE email = ?', email, (err, res) => {
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(err) throw err;
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  'rqOg7EwSwWLCnO23nan694ElZhni5oYA',
                  { expiresIn: '24h' }
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
    });
};