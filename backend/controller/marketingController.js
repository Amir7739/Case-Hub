const  { MarketingDataModel } = require('../models/commonModel');

exports.getAllMarketingData = async (req, res) => {
    try {
        const marketingFormData = await MarketingDataModel.find();
        res.json(marketingFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
