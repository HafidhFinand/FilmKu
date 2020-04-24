const allModel = require('../models/index.js');
const User = allModel.User;
const Film = allModel.Film;
const UserFilm = allModel.UserFilm;

class ListController {
    static findAll(req, res) {
        let id;
        User.findOne({where : {username: req.session.username}})
            .then(user => {
                id = user.id;
                const options = {
                    where: {
                        UserId: id
                    }, 
                    include: Film,
                    order: [['status', 'asc']]
                }
                return UserFilm.findAll(options)
            })
            .then(data => {
                console.log(data)
                res.render('./list/myList', { data })
            })
            .catch(err => res.send(err.message))
    }

    static showAddForm(req, res) {
        const id = Number(req.params.filmId);
        const title = req.params.filmTitle;
        res.render('./list/addForm', { title, id })
    }

    static addList(req, res) {
        const FilmId = Number(req.params.filmId);
        const { status } = req.body;
        const username = req.session.username;
        let UserId;
        User.findOne({where : {username: username}})
            .then(user => {
                UserId = user.id;
                const values = {
                    status,
                    FilmId,
                    UserId
                }
                return UserFilm.create(values)
            })
            .then(list => res.redirect('/'))
            .catch(err => res.send(err.message))
    }
}

module.exports = ListController;