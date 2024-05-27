// models/FormData.js
const mongoose = require('mongoose');

const HrDataSchema = new mongoose.Schema({
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

const HrDataModel = mongoose.model('HrData', HrDataSchema);


module.exports = HrDataModel;
