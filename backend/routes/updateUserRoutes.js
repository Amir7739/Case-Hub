const express = require('express');
const UserFormModels = require('../models/UserFormModels');
const HRModel = require('../models/HRModel');
const AdminModel = require('../models/AdminModel');

const router = express.Router();

// Route to update data based on assignedTo
router.post('/update-user', async (req, res) => {
    try {
        console.log('Received request to update data:', req.body); // Log the received request body
        const { assignedTo, ...updatedData } = req.body;
        let result;

        switch(assignedTo) {
            case 'HR':
                result = await HRModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
                break;
            case 'IT':
                result = await UserFormModels.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
                break;
                break;
            case 'Admin':
                result = await AdminModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
                break;
            default:
                return res.status(400).json({ error: 'Invalid assignedTo value' });
        }

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
