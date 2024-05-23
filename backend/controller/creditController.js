const  { CreditDataModel } = require('../models/commonModel');

exports.getAllCreditData = async (req, res) => {
    try {
        const creditFormData = await CreditDataModel.find();
        res.json(creditFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
