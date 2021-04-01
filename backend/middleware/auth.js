const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'rqOg7EwSwWLCnO23nan694ElZhni5oYA');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'ID utilisateur invalide';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: 'Requête non authentifiée' });
  }
};