const nodemailer = require('nodemailer');

const departmentEmails = {
    'HR': 'hr@f2fintech.com',
    'IT': 'it@f2fintech.com',
    'ADMIN': 'hr@f2fintech.com',
    'OPS': 'ops@f2fintech.com',
    'MARKETING': 'marketing@f2fintech.com',
    'CREDIT': 'credit@f2fintech.com',
    'ACCOUNTANDFINANCE': 'accounts@f2fintech.com',
    'DIRECTORS': 'wecare@f2fintech.com',
    'GROWTH': 'growth@f2fintech.com',
    'OTHER': 'amir773913@gmail.com',
    // Add more departments and their emails as needed
};

async function sendEmailToAdmin(formData, ticketId) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'fintechamir@gmail.com',
            pass: 'yabkhxxvbrehceyf'
        }
    });

    const currentDateTimeIST = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'short', // Include date
        timeStyle: 'short'  // Include time
    });

    const recipientEmail = departmentEmails[formData.assignedTo] || 'defaultEmail@gmail.com';

    const mailOptions = {
        from: formData.email,
        to: recipientEmail, // Use recipient email determined by assignedTo
        subject: 'NEW QUERY FROM QUERY HUB',
        html: `
            <h1>THERE IS A NEW QUERY FROM QUERY HUB </h1>
            <p>Ticket ID: ${ticketId}</p>
            <p>Email: ${formData.email}</p>
            <p>Date Created: ${currentDateTimeIST}</p>
            <p>Priority: ${formData.priority}</p>
            <p>Category: ${formData.category}</p>
            <p>Assigned To: ${formData.assignedTo}</p>
            <p>Closure Details: ${formData.closureDetails}</p>
            <p>Description: ${formData.description}</p>
        `
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendEmailToAdmin };
