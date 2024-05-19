const AdminFormData = require('../models/AdminModel');

exports.getAllFormData = async (req, res) => {
    try {
        const adminFormData = await AdminFormData.find();
        res.json(adminFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
