// models/FormData.js
const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
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
});

const FormDataModel = mongoose.model('FormData', FormDataSchema);


module.exports = FormDataModel;
