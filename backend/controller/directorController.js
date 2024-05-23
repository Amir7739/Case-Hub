const  { DirecotorDataModel } = require('../models/commonModel');

exports.getAllDirectorData = async (req, res) => {
    try {
        const directorFormData = await DirecotorDataModel.find();
        res.json(directorFormData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
