const allModel = require('../models/index.js');
const User = allModel.User;
const { compare } = require('../helpers/bcrypt.js');
const sendMail = require('../helpers/nodemailer.js');

class UserController {
    static findAll(req, res) {
        User.findAll()
            .then(user => {
                res.render('./users/showUsers', { user: user });
            })
            .catch(err => res.send(err))
    }

    static showRegistrationForm(req, res) {
        const { error } = req.session;
        delete req.session.error
        res.render('./users/registration', { error });
    }
    static addUser(req, res){
        let { first_name, last_name, username, password, email, birth_date } = req.body;
        const values = {
            first_name,
            last_name,
            username,
            password,
            email,
            birth_date
        }
        User.create(values)
            .then(data => {
                sendMail(email);
                res.send('sukses')
            })
            .catch(err => {
                req.session.error = err.message
                res.redirect('/users/register')
            });
    }

    static showLoginForm(req, res) {
        const { error } = req.session
        delete req.session.error
        res.render('./users/loginForm', { error });
    }

    static login(req, res) {
        const { username, password } = req.body;
        User.findOne({
            where: { username }
        })
            .then(result => {
                if (result) {
                    if (compare(password, result.password)) {
                        req.session.isLogin = true;
                        res.redirect('/users')
                    } else {
                        req.session.error = 'wrong username/password';
                        res.redirect('/users/login');
                    }
                } else {
                    req.session.error = `wrong username/password`
                    res.redirect('/users/login');
                }
            })
    }

    static logout(req, res) {
        delete req.session.isLogin
        res.redirect('/users/login');
    }
}

module.exports = UserController;