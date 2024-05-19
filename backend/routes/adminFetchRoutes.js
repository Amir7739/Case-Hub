const express = require('express');
const router = express.Router();

const adminRecordController = require('../controller/adminRecordController');
const updateAdminRecord = require('../routes/updateAdminRoutes');

// Get all form data
router.get('/adminrecord', adminRecordController.getAllFormData);

router.use(updateAdminRecord);

module.exports = router;
