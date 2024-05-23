const UserFormModels = require('../models/UserFormModels');
const HrModel = require('../models/HRModel');
const AdminModel = require('../models/AdminModel');
const { OpsDataModel, MarketingDataModel, CreditDataModel , DirecotorDataModel, GrowthDataModel ,AccAndFinDataModel} = require('../models/commonModel');

exports.getAllFormData = async (req, res) => {
    try {
        const userFormData = await UserFormModels.find();
        const hrData = await HrModel.find();
        const adminData = await AdminModel.find();
        const opsData = await OpsDataModel.find();
        const markData = await MarketingDataModel.find();
        const creditData = await CreditDataModel.find();
        const directorData = await DirecotorDataModel.find();
        const growthData = await GrowthDataModel.find();
         const accData = await AccAndFinDataModel.find();

        // Combine all data into a single array
        const allData = [...userFormData, ...hrData, ...adminData, ...opsData, ...markData, ...creditData, ...directorData, ...growthData, ...accData];

        res.json(allData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
