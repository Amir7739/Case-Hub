const express = require('express');
const router = express.Router();

const fetchRecordController = require('../controller/fetchRecordController');
const updateRecord = require('../routes/updateRecord')

// Get all form data
router.get('/formData', fetchRecordController.getAllFormData);

router.use(updateRecord);

module.exports = router;
