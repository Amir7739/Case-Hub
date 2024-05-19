// backend/routes/formRoutes.js

const express = require('express');
const router = express.Router();
const formController = require('../controller/formController');

router.post('/submitdata', formController.submitFormData);

module.exports = router;
