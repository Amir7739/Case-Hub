// routes/documents.js
const express = require('express');
const multer = require('multer');
const Applicant = require('../models/applicant');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes('application/pdf') || file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only .pdf, .jpg, .jpeg, and .png files are allowed!'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
    { name: 'pan_card', maxCount: 1 },
    { name: 'aadhaar_card', maxCount: 1 },
    { name: '3months_salary', maxCount: 1 },
    { name: '6months_salary', maxCount: 1 },
    { name: 'bank_statement_6mo', maxCount: 1 },
    { name: 'salary_slip_3mo', maxCount: 1 },
    { name: 'form16_1yr', maxCount: 1 },
    { name: 'company_id', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
    { name: 'bank_statement_1yr', maxCount: 1 },
    { name: 'gst_certificate', maxCount: 1 },
    { name: 'itr_2yrs', maxCount: 1 },
    { name: 'company_address_proof', maxCount: 1 },
    { name: 'degree_certificate', maxCount: 1 },
    { name: 'address_proof', maxCount: 1 },
    { name: 'additional_proof', maxCount: 1 },
    { name: 'partnership_deed', maxCount: 1 },
    { name: 'gst_certificate_3yrs', maxCount: 1 },
    { name: 'moa_aoa_coi', maxCount: 1 },
    { name: 'board_resolution', maxCount: 1 },
    { name: 'form_26as_2yrs', maxCount: 1 },
    { name: 'registration_certificate', maxCount: 1 },
    { name: 'live_photo', maxCount: 1 },
    { name: 'form16_2yrs', maxCount: 1 }
]);

router.post('/submit-documents', upload, async (req, res) => {
    try {
        console.log('Files:', req.files);
        console.log('Body:', req.body);

        const documents = Object.keys(req.files).map(key => {
            const file = req.files[key][0];
            return {
                fieldName: key,
                originalName: file.originalname,
                filePath: file.path
            };
        });

        const additionalProof = req.files.additional_proof ? {
            fieldName: 'additional_proof',
            originalName: req.files.additional_proof[0].originalname,
            filePath: req.files.additional_proof[0].path
        } : null;

        const newApplicant = new Applicant({
            profession: req.body.profession,
            businessType: req.body.business_type,
            documents: documents,
            phoneNumber: req.body.phone_number,
            whatsappNumber: req.body.whatsapp_number,
            mothersName: req.body.mothers_name,
            email: req.body.email,
            permanentAddress: req.body.permanent_address,
            currentAddress: req.body.current_address,
            additionalProof: additionalProof
        });

        console.log('New Applicant:', newApplicant);

        await newApplicant.save();
        res.json({ message: 'Documents successfully submitted!' });
    } catch (err) {
        console.error('Error when processing documents:', err);
        res.status(500).json({ message: 'Error processing your request', error: err.toString() });
    }
});

module.exports = router;
