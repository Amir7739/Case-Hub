// models/FormData.js
const mongoose = require('mongoose');

const commonDataSchema = new mongoose.Schema({
    ticketId: String,
    empId: String,
    empName: String,
    email: String,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    resolveDate: {
        type:Date
    },
    description: String,
    priority: String,
    status: String,
    category: String,
    assignedTo: String,
    comments: String,
    attachment: [String],
    closureDetails: String,
    feedback: String,
    userStatus: String
});

const OpsDataModel = mongoose.model('OpsData', commonDataSchema);
const MarketingDataModel = mongoose.model('MarketingData', commonDataSchema);
const ProductDataModel = mongoose.model('ProductData', commonDataSchema);
const CreditDataModel = mongoose.model('CreditData', commonDataSchema);
const AccAndFinDataModel = mongoose.model('AccAndFinData', commonDataSchema);
const DirecotorDataModel = mongoose.model('DirecotorData', commonDataSchema);
const GrowthDataModel = mongoose.model('GrowthData', commonDataSchema);




module.exports = {
    OpsDataModel,
    MarketingDataModel,
    ProductDataModel,
    CreditDataModel,
    AccAndFinDataModel,
    DirecotorDataModel,
    GrowthDataModel,

   
};
