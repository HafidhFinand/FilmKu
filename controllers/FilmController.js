const allModel = require('../models/index.js');
const Film = allModel.Film;

class FilmController {
    static findAll(req, res) {
        Film.findAll()
            .then(film => {
                res.render('./films/showList', { film })
            })
            .catch(err => res.send(err))
    }

    static showAddForm(req, res) {
        res.render('./films/addForm');
    }

    static addFilm(req, res) {
        let { title, status, released_year, genre } = req.body;
        const values = {
            title,
            status,
            released_year, 
            genre
        }
        Film.create(values) 
            .then(film => {
                res.redirect('/shows');
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static showEditForm(req, res) {
        const id = Number(req.params.id);
        Film.findByPk(id)
            .then(film => {
                res.render('./films/editForm', { film });
            })
            .catch(err => res.send(err.message))
    }

    static editFilm(req, res) {
        const id = Number(req.params.id);
        let { title, status, released_year, genre } = req.body;
        const values = {
            title,
            status,
            released_year,
            genre
        };
        const options = {
            where : {
                id
            }
        }
        Film.update(values, options) 
            .then(film => res.redirect('/shows'))
            .catch(err => res.send(err.message))
    }

    static deleteFilm(req,res) {
        const id = Number(req.params.id);
        const options = {
            where : {
                id: id
            }
        }
        Film.destroy(options)
            .then(data => res.redirect('/shows'))
            .catch(err => res.send(err.message))
    }
}

module.exports = FilmController;
