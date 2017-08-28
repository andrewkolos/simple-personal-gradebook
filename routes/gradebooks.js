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
