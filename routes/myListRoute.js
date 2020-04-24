const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');



// router.get('/:id/edit', ListController.showEditForm);
router.post('/:filmId/:filmTitle', ListController.addList);

router.get('/:filmId/:filmTitle', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    } else {
        req.session.error = `Silahkan login terlebih dahulu`
        res.redirect('/users/login');
    }
}, ListController.showAddForm);
// router.get('/:filmId/:filmTitle', ListController.showAddForm);
// router.get('/:username', ListController.findAll);

router.get('/:username', (req, res, next) => {
    if (req.session.isLogin) {
        next();
    } else {
        req.session.error = `Silahkan login terlebih dahulu`
        res.redirect('/users/login');
    }
}, ListController.findAll);

module.exports = router;