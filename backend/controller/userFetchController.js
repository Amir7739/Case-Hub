const UserFormModels = require('../models/UserFormModels');
const HrModel = require('../models/HRModel');
const AdminModel = require('../models/AdminModel');

exports.getAllFormData = async (req, res) => {
    try {
        const userFormData = await UserFormModels.find();
        const hrData = await HrModel.find();
        const adminData = await AdminModel.find();

        // Combine all data into a single array
        const allData = [...userFormData, ...hrData, ...adminData];

        res.json(allData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
