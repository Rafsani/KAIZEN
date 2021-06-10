var express = require('express');
var router = express.Router();


const loanController = require('../controller/loanController');

router.route('/')
    .get( loanController.handleGETallLoans )
    .post( loanController.handlePOSTCreateLoan );

router.route('/:id')
    .get(loanController.handleGETLoanById);

module.exports = router;