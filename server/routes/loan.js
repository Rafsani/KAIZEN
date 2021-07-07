var express = require('express');
var router = express.Router();


const loanController = require('../controller/loanController');

router.route('/')
    .get( loanController.handleGETallLoans )
    .post( loanController.handlePOSTCreateLoan );

router.route('/:id')
    .get(loanController.handleGETLoanById);
    
router.route('/user/:userId')
    .get( loanController.handleGETPendingLoanForUser );

router.route('/request/:loanId')
    .get( loanController.handleGETLoanOffers );

router.route('/lenders/:loanId')
    .get( loanController.handleGETCurrentLenders );

router.route('/pay/:contractId')
    .put( loanController.handlePUTRepayLoans );


module.exports = router;