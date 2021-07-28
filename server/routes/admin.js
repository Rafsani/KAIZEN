var express = require('express');
var router = express.Router();


const adminController = require('../controller/adminController');

router.route('/report')
    .get(adminController.handleGETAllUnresolvedReports)
    .put(adminController.handlePUTChangeReportStatus );

router.route('/contract')
    .put(adminController.handlePUTEndContract);

router.route('/:userId')
    .put(adminController.handlePUTUpdateUserStatus);

router.route('/verify')
    .get(adminController.handleGETAllUnverifiedUsers);

module.exports = router;