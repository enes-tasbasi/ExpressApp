let express = require('express');
let router = express.Router();
const _ = require('lodash');

const {User} = require('./../models/users');
const {authenticate} = require('./../middleware/authenticate');

router.post('/user', (req, res) => {
    let user = new User ({
        email: req.body.email,
        password: req.body.password
    }).save().then((user) => {
        return user.generateAuthToken();
    }).then(({token, user}) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.send(e);
    });
});

router.get('/user/me', authenticate, (req, res) => {
   res.send(req.user);
});

router.post('/user/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then(({token}) => {
            console.log(token);
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

router.delete('/user/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

module.exports = router;