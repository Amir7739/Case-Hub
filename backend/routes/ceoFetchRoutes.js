const express = require('express');
const router = express.Router();

const ceoFetchController = require('../controller/ceoRecordController');

// Get all form data
router.get('/ceostatus', ceoFetchController.getAllFormData);


module.exports = router;
