const express = require('express');
const router = express.Router();
const FilmController = require('../controllers/FilmController.js');


router.get('/:id/delete', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    } else {
        req.session.error = `Silahkan login terlebih dahulu`
        res.redirect('/users/login');
    }
}, FilmController.deleteFilm);

router.get('/:id/edit', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    } else {
        req.session.error = `Silahkan login terlebih dahulu`
        res.redirect('/users/login');
    }
}, FilmController.showEditForm);

router.get('/add', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    } else {
        req.session.error = `Silahkan login terlebih dahulu`
        res.redirect('/users/login');
    }
}, FilmController.showAddForm);

router.post('/:id/edit', FilmController.editFilm);
router.post('/add', FilmController.addFilm);
router.get('/', FilmController.findAll);

module.exports = router;