const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');
const regexPassword = require('../middleware/regexPassword');

router.post('/signup', regexPassword, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getAllUsers', userCtrl.getUsers);
router.get('/getOneUser/:id', userCtrl.getOneUser)
router.delete('/deleteUser', auth, userCtrl.deleteUser);
router.post('/updateUser', auth, regexPassword, userCtrl.updateUser);

module.exports = router;