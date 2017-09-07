var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Gradebook = require('../models/gradebook');
var User = require('../models/user');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: err
            });
        }
        next(); // travel to next route
    });
});

router.get('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    Gradebook.find({user: decoded.user._id})
        .exec(function (err, gradebooks) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Gradebooks successfully retrieved',
                obj: gradebooks
            });
        });
});

router.get('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    // security flaw here as any user can retrieve any other user's gradebook
    Gradebook.findById(req.params.id, function (err, gradebook) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!gradebook) {
            return res.status(500).json({
                title: 'Gradebook not found',
                error: {message: 'Gradebook not found'}
            });
        }
        res.status(200).json({
            message: 'Gradebook successfully retrieved',
            obj: gradebook
        })
    });
});


router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    Gradebook.findById(req.params.id, function (err, gradebook) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!gradebook) {
            return res.status(500).json({
                title: 'Gradebook not found',
                error: {message: 'Gradebook not found'}
            });
        }
        if (gradebook.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'users do not match'}
            });
        }

        gradebook.name = req.body.name;
        gradebook.categories = req.body.categories;
        gradebook.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated gradebook',
                obj: result
            });
        });
    });
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var gradebook = new Gradebook({
            name: req.body.name,
            categories: req.body.categories,
            user: user
        });
        gradebook.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved gradebook',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);

    Gradebook.findById(req.params.id, function (err, gradebook) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!gradebook) {
            return res.status(500).json({
                title: 'Gradebook not found',
                error: {message: 'Gradebook not found'}
            });
        }

        if (gradebook.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: {message: 'users do not match'}
            });
        }

        gradebook.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Gradebook successfully deleted',
                obj: result
            });
        });
    });
});

router.patch('/', function (req, res, next) {

});

module.exports = router;
