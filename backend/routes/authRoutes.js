const express = require('express');
const router = express.Router();
const departmentController = require('../controller/authController');

router.post('/signup', departmentController.signup);
router.post('/login', departmentController.login);
router.get('/email/:email', departmentController.checkEmailExists);

module.exports = router;
