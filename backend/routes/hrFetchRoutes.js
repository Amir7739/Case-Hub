const express = require('express');
const router = express.Router();

const hrRecordController = require('../controller/hrFetchController');
const updateHrRecord = require('../routes/updateHrRecords');

// Get all form data
router.get('/hrrecord', hrRecordController.getAllFormData);

router.use(updateHrRecord);

module.exports = router;
