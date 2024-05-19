const express = require('express');
const router = express.Router();

const userFetchController = require('../controller/userFetchController');
const updateUserRecord = require('../routes/updateUserRoutes');

// Get all form data
router.get('/userstatus', userFetchController.getAllFormData);

router.use(updateUserRecord);

module.exports = router;
