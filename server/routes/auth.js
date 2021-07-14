const logoutMiddleware = require('../middleware/logout'); 
const imageMiddleware = require('../middleware/uploadImage'); 
var express = require('express');
var router = express.Router();

const authController = require('../controller/authController');

router.route('/register')
    .post( authController.handlePOSTregisterUser );

router.route('/registerdata')
    .post( imageMiddleware.imageUpload , authController.handlePOSTregisterUserFormData );

router.route('/login')
    .post( authController.handlePOSTloginUser );

router.route('/logout')
    .get( authController.handleGETlogoutUser , logoutMiddleware.logoutUser );

router.route('/isloggedin')
    .get( authController.handleGETloggedinUser );

router.route('/:userId')
    .get( authController.handleGETFormFilled );

module.exports = router;