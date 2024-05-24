// models/applicant.js
const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
    profession: String,
    businessType: String,
    documents: [{
        fieldName: String,
        originalName: String,
        filePath: String
    }],
    phoneNumber: String,
    whatsappNumber: String,
    mothersName: String,
    email: String,
    permanentAddress: String,
    currentAddress: String,
    additionalProof: {
        fieldName: String,
        originalName: String,
        filePath: String
    }
});

const Applicant = mongoose.model('Applicant', ApplicantSchema);

module.exports = Applicant;
