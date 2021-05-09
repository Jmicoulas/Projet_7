const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const regexEmail = require('../middleware/regexEmail');

router.post('/signup', regexEmail, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAllUsers', userCtrl.getUsers);
router.get('/getOneUser/:id', userCtrl.getOneUser)
router.delete('/deleteUser', auth, userCtrl.deleteUser);
router.post('/updateUser', auth, regexEmail, userCtrl.updateUser);

module.exports = router;