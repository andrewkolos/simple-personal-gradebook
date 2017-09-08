var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt =  require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function (req, res, next) {
    if (!req.body.username || !req.body.password) { // make sure necessary fields are provided
        return res.status(500).json({
            title: 'An error occurred',
            error: {message: 'Username and/or password missing'}
        });
    }

    var user = new User({
       username: req.body.username,
       password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save(function(err, result) {
       if (err) {
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }
       res.status(201).json({
           message: 'User created successfully',
           obj: result
       });
    });
});

router.post('/signin', function(req, res, next) {
    if (!req.body.username || !req.body.password) { // make sure necessary fields are provided
        return res.status(500).json({
            title: 'An error occurred',
            error: {message: 'Username and/or password missing'}
        });
    }

    User.findOne({username: req.body.username}, function(err, user) {
        console.log(user);
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn:  7200});
        res.status(200).json({
            message: 'Login successful',
            token: token,
            userId: user._id,
            username: user.username
        });
    });

});

module.exports = router;
