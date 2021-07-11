var express = require('express');
var router = express.Router();

const reviewController = require('../controller/reviewController');


router.route('/')
    .post( reviewController.handlePOSTReview );

router.route('/:receiverId')
    .get( reviewController.handleGETReview );

module.exports = router;
