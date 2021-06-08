const logoutMiddleware = require('../middleware/logout'); 
var express = require('express');
var router = express.Router();

const authController = require('../controller/authController');

router.route('/register')
    .post( authController.handlePOSTregisterUser );

router.route('/login')
    .post( authController.handlePOSTloginUser );

router.route('/logout')
    .get( authController.handleGETlogoutUser , logoutMiddleware.logoutUser );

router.route('/isloggedin')
    .get( authController.handleGETloggedinUser );

module.exports = router;