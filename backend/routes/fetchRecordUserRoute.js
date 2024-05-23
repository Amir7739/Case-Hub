const express = require('express');
const router = express.Router();
const UserFormModels = require('../models/UserFormModels');
const HRModel = require('../models/HRModel');
const AdminModel = require('../models/AdminModel');
const { OpsDataModel, MarketingDataModel, CreditDataModel } = require('../models/commonModel');
const userFetchController = require('../controller/userFetchController');

// Get all form data
router.get('/userstatus', userFetchController.getAllFormData);
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
            case 'ADMIN':
                result = await AdminModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
                break;
                 case 'OPS':
                result = await OpsDataModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
                break;
             case 'MARKETING':
                result = await MarketingDataModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
                break;
            case 'CREDIT':
                result = await CreditDataModel.findByIdAndUpdate(updatedData._id, updatedData, { new: true });
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

