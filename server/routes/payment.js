var express = require('express');
var router = express.Router();


const paymentController = require('../controller/paymentController');

router.route('/ssl-request' )
    .get( paymentController.handleGETInitSSLCommerzPage );

router.route('/ssl-payment-success')
    .post( paymentController.handlePOSTSuccessSSLCommerzPage)

router.route('/ssl-payment-failure')
    .post( paymentController.handlePOSTFailedSSLCommerzPage)

router.route('/ssl-payment-cancel')
    .post( paymentController.handlePOSTCanceledSSLCommerzPage)

router.route('/ssl-payment-ipn')
    .post( paymentController.handlePOSTIPNSSLCommerzPage)




module.exports = router;