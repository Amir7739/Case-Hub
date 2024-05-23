const express = require('express');
const router = express.Router();
const { GrowthDataModel } = require('../models/commonModel');
const growthRecordController = require('../controller/growthController');


// Get all form data
router.get('/growthrecord', growthRecordController.getAllGrowthData);

// Route to update data
router.post('/update-growthdata', async (req, res) => {
    try {
        console.log('Received request to update data:', req.body); // Log the received request body
        const { _id, ...updatedData } = req.body;
        const result = await GrowthDataModel.findByIdAndUpdate(_id, updatedData, { new: true });
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

