var express = require('express');
var router = express.Router();

var Gradebook = require('../models/gradebook');

router.get('/', function (req, res, next) {
    Gradebook.find()
        .exec(function(err, gradebooks) {
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
        gradebook.name = req.body.name;
        gradebook.categories = req.body.categories;
        gradebook.save(function(err, result) {
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
   var gradebook = new Gradebook({
       name: req.body.name

   });
   gradebook.save(function(err, result) {
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

router.patch('/', function (req, res, next) {

});

module.exports = router;
