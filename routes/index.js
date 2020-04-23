const express = require('express');
const router = express.Router();
const usersRoute = require('./usersRoute.js');

router.use('/users', usersRoute);
router.get('/', (req, res) => {res.send('halaman utama')});
module.exports = router;