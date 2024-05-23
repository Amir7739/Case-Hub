// backend/controllers/formController.js

const FormDataModel = require('../models/UserFormModels');
const HrDataModel  = require('../models/HRModel');
const AdminDataModel = require('../models/AdminModel');
const  { OpsDataModel, MarketingDataModel, CreditDataModel, AccAndFinDataModel, GrowthDataModel, DirecotorDataModel } = require('../models/commonModel');
const { sendEmailToAdmin } = require('../services/nodemailerService');

exports.submitFormData = async (req, res) => {
    try {
        const ticketId = generateTicketId();
        
        let formDataModel;
        switch (req.body.assignedTo) {
            case 'HR':
                formDataModel = new HrDataModel({
                    ...req.body,
                    ticketId: ticketId
                });
                break;
            case 'IT':
                formDataModel = new FormDataModel({
                    ...req.body,
                    ticketId: ticketId
                });
                break;
            case 'ADMIN':
                formDataModel = new AdminDataModel({
                    ...req.body,
                    ticketId: ticketId
                });
                break;
            case 'OPS':
                formDataModel = new OpsDataModel({
                    ...req.body,
                    ticketId: ticketId
                });
                break;
            case 'MARKETING':
                formDataModel = new MarketingDataModel({
                    ...req.body,
                    ticketId: ticketId
                });
                break;
             case 'CREDIT':
                formDataModel = new CreditDataModel({
                    ...req.body,
                    ticketId: ticketId
                });
                break;
            // Add cases for other departments as needed
            default:
                throw new Error('Invalid department');
        }

        const savedFormData = await formDataModel.save();
        
        await sendEmailToAdmin(req.body, ticketId);
        res.json(savedFormData);
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

function generateTicketId() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
