const express = require('express');
const router = express.Router();
const usersRoute = require('./usersRoute.js');
const filmRoute = require('./filmRoute.js');
const myListRoute = require('./myListRoute.js');

router.use('/filmlist', myListRoute);
router.use('/shows', filmRoute);
router.use('/users', usersRoute);
router.get('/')
router.get('/', (req, res) => {
    const username = req.session.username;
        res.render('./homepage', { username })
});

module.exports = router;