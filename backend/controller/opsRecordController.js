const  { OpsDataModel } = require('../models/commonModel');

exports.getAllOpsData = async (req, res) => {
    try {
        const opsFormData = await OpsDataModel.find();
        res.json(opsFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
