const express = require('express');
const router = express.Router();
const AdminDataModel = require('../models/AdminModel');
const adminRecordController = require('../controller/adminRecordController');


// Get all form data
router.get('/adminrecord', adminRecordController.getAllFormData);
// Route to update data
router.post('/update-admindata', async (req, res) => {
    try {
        console.log('Received request to update data:', req.body); // Log the received request body
        const { _id, ...updatedData } = req.body;
        const result = await AdminDataModel.findByIdAndUpdate(_id, updatedData, { new: true });
        if (!result) {
            return res.status(404).json({ error: 'Data not found' });
        }
        res.json(result);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Error updating data' });
    }
});

module.exports = router;


module.exports = router;
