var express = require('express');
var router = express.Router();


const userController = require('../controller/userController');


router.route('/:userId')
    .get(userController.handleGETUserById);

router.route('/:userId/history')
    .get( userController.handleGETUserHistory );

module.exports = router;