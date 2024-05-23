const  { AccAndFinDataModel } = require('../models/commonModel');

exports.getAllCreditData = async (req, res) => {
    try {
        const accAndFinFormData = await AccAndFinDataModel.find();
        res.json(accAndFinFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
