let express = require('express');
let router = express.Router();
const _ = require('lodash');

const {User} = require('./../models/users');
const {authenticate} = require('./../middleware/authenticate');

router.post('/user', (req, res) => {
    let user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).save().then((user) => {
        return user.generateAuthToken();
    }).then(({token, user}) => {
        res.cookie('auth', token).send(user);
    }).catch((e) => {
        res.send(e);
    });
});

router.get('/user/me', authenticate, (req, res) => {
   res.send(req.user);
});

router.post('/user/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then(({token}) => {
            res.cookie('auth', token).send(req.header);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/user/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.clearCookie('auth');
        res.status(200).send('JWT removed');
    }, () => {
        res.status(400).send();
    });
});

module.exports = router;