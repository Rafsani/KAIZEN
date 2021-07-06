var express = require('express');
var router = express.Router();

const contractController = require('../controller/contractController');

router.route('/')
    .post(contractController.handlePOSTCreateContract )
    .put( contractController.handlePUTEndContract );

router.route('/:id')
    .get( contractController.handleGETActiveContract )
    .put( contractController.handlePUTAcceptContract )
    .delete( contractController.handleDELETEDenyContract );


module.exports = router;