var express = require('express');
var router = express.Router();


const userController = require('../controller/userController');

router.route('/loanverify')
    .get( userController.handleGETCheckIfLoanRequestCanBeMade );

router.route('/:userId')
    .get(userController.handleGETUserById);

router.route('/transaction/:userId')
    .get( userController.handleGETUserTransactionHistoryById );

router.route('/view/:lenderId')
    .get(userController.handleGETLenderInfo );

router.route('/:userId/history')
    .get( userController.handleGETUserHistory );

router.route('/:userId/report')
    .get( userController.handleGETUserReportsById );

router.route('/search/:userId' )
    .get( userController.handleGETUserSearchBase );

router.route('/report/:userId')
    .post(userController.handlePOSTReport );
    

module.exports = router;