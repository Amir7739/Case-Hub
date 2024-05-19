const HrFormData = require('../models/HRModel');

exports.getAllFormData = async (req, res) => {
    try {
        const hrFormData = await HrFormData.find();
        res.json(hrFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
