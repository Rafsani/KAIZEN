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

router.route('/search/:userId' )
    .get( userController.handleGETUserSearchBase );
    

module.exports = router;