const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const regexEmail = require('../middleware/regexEmail');

router.post('/signup', regexEmail, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAllUsers', userCtrl.getUsers);
router.get('/getOneUser/:id', userCtrl.getOneUser)
router.post('/deleteUser', auth, userCtrl.deleteUser);
router.post('/updateUser/:id', auth, userCtrl.updateUser);

module.exports = router;