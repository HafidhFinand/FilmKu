const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');

router.get('/logout', UserController.logout);
router.post('/login', UserController.login)
router.get('/login', UserController.showLoginForm);
router.post('/register', UserController.addUser);
router.get('/register', UserController.showRegistrationForm);
router.get('/', UserController.findAll);
module.exports = router;