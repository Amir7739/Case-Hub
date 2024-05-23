const  { GrowthDataModel } = require('../models/commonModel');

exports.getAllGrowthData = async (req, res) => {
    try {
        const growthFormData = await GrowthDataModel.find();
        res.json(growthFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
