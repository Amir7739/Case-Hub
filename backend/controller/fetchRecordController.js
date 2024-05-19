const UserFormModels = require('../models/UserFormModels');

exports.getAllFormData = async (req, res) => {
    try {
        const userFormData = await UserFormModels.find();
        res.json(userFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
