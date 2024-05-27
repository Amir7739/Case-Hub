import React, { useState } from 'react';
import axios from 'axios';
import './userForm.css'; // Import CSS file

const UserForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        empId: '',
        empName: '',
        dateCreated: '',
        description: '',
        priority: '',
        status: '',
        category: '',
        assignedTo: '',
        comments: '',
        attachment: '',
        closureDetails: '',
        feedback: '',
        resolveDate: null,
        userStatus: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    // Example mapping of employee IDs to names
    const empIdToNameMap = {
        'F2-369-001': 'HARPREET SINGH',
        'F2-369-002': 'ABHINAV AWAL',
        'F2-369-101': 'NEHA SINGH',
        'F2-369-173': 'ANSHIKA KHOLI',
        'F2-369-175': 'ROSHAN YADAV',
        'F2-369-186': 'ANURAG',
        'F2-369-188': 'JOLLY KUMARI',
        'F2-369-189': 'MUSKAN JAISWAL',
        'F2-369-190': 'ADITI SINGHAL',
        'F2-369-191': 'RANI KUMARI',
        'F2-369-192': 'AMBAR RAJ JAISWAL',
        'F2-369-193': 'ADARSH THAKUR',
        'F2-369-199': 'ANKUSH SHARMA',
        'F2-369-210': 'MANISHA CHAUHAN',
        'F2-369-224': 'MAMTA KANOJIA',
        'F2-369-225': 'SURAJ KUMAR',
        'F2-369-226': 'SAGAR CHAUHAN',
        'F2-369-003': 'SHASHANK SHARMA',
        'F2-369-004': 'JIYA SINGH RAJPUT',
        'F2-369-005': 'RAJKUMARI',
        'F2-369-006': 'SHIVANI KASHYAP',
        'F2-369-008': 'MANOJ KUMAR',
        'F2-369-009': 'MANISHA SAXENA',
        'F2-369-010': 'AKANSHA BHARTI',
        'F2-369-018': 'BARKHA SINGH',
        'F2-369-019': 'FURKAN JUNG',
        'F2-369-020': 'PRAGATI SAXENA',
        'F2-369-021': 'UJALA RISHIWAL',
        'F2-369-023': 'JAI SINGH',
        'F2-369-024': 'SHARDA KUSHWAH',
        'F2-369-025': 'KRISHNA THAKUR',
        'F2-369-026': 'NEHA LAKRA',
        'F2-369-045': 'HIMANSHI SINGH',
        'F2-369-046': 'DEEPANSHU',
        'F2-369-056': 'TARUN DHEEMAN',
        'F2-369-077': 'SHUBHAM PAHTAK',
        'F2-369-079': 'ANURANDHAN KUMAR',
        'F2-369-083': 'PRASHANT KUMAR',
        'F2-369-085': 'ADITYA RAWAL',
        'F2-369-106': 'RIYA CHADDHA',
        'F2-369-107': 'VINEET TIWARI',
        'F2-369-118': 'PRADEEP KUMAR',
        'F2-369-120': 'MANSI PORWAL',
        'F2-369-122': 'NEHA DANISH',
        'F2-369-130': 'ROZI PRAVEEN',
        'F2-369-132': 'LAKHVINDER SINGH',
        'F2-369-133': 'KAJAL KASHYAP',
        'F2-369-135': 'RASHI GANGWAR',
        'F2-369-136': 'KRISHNA PANDEY',
        'F2-369-138': 'ANIT SINHA',
        'F2-369-145': 'PRERNA THAKUR',
        'F2-369-148': 'ADITYACHAUHAN',
        'F2-369-149': 'NISHA CHAUHAN',
        'F2-369-150': 'SANIA IRSHAD',
        'F2-369-152': 'ABHISHEK TRIVEDI',
        'F2-369-155': 'RENU MATHUR',
        'F2-369-157': 'TANNU YADAV',
        'F2-369-159': 'SHWETA RAJPUT',
        'F2-369-166': 'HIMANSHI SINGH',
        'F2-369-167': 'RITU ANURAGI',
        'F2-369-168': 'AMIR ALAM',
        'F2-369-172': 'PALAK MITTAL',
        'F2-369-183': 'ANURAG SHARMA',
        'F2-369-196': 'SHIVANGI KASHYAP',
        'F2-369-197': 'HARSH TYAGI',
        'F2-369-200': 'NOOR UL HUDA',
        'F2-369-201': 'TUBA KHAN',
        'F2-369-202': 'AADI SONI',
        'F2-369-205': 'ANKIT PAL',
        'F2-369-208': 'PRIYANSHU PAL',
        'F2-369-209': 'SHIVAM KUMAR',
        'F2-369-215': 'CHANCHAL PRAJAPATI',
        'F2-369-218': 'VISHAL',
        'F2-369-219': 'RITIKA SINGHAL',
        'F2-369-220': 'ROHIT CHAUHAN',
        'F2-369-222': 'IRAM KHAN',
        'F2-369-223': 'MANSIKASHYAP',
        'F2-369-228': 'AKSHIT VIJAY WARGIYA',
        'F2-369-233': 'DISHA',
        'F2-369-229': 'DAKSH SINGH',
        'F2-369-230': 'DIVYANSH SINGHAL',
        'F2-369-231': 'HARSH BHARDWAJ',
        'F2-369-232': 'SURYA PRATAP',
        'F2-369-234': 'SAMIRUDDIN KHAN',
        'F2-369-235': 'ANKIT KUMAR',
        'F2-369-238': 'HARSH',
        'F2-369-243': 'VISHAL',
        'F2-369-244': 'AKASH SINGHAL',
        'F2-369-245': 'GULFAM',
        // sourcer id
        'F3-369-003': 'SOURAV',
        'F3-369-004': 'MANAS',
        'F3-369-005': 'SHRISHTI TOMAR',
        'F3-369-006': 'MUSKAN',
        'F3-369-007': 'PRADEEP',
        'F3-369-008': 'JYOTI',
        'F3-369-009': 'SONU',
        'F3-369-010': 'NEHA',
        'F3-369-011': 'SHAMREEN',
        'F3-369-012': 'SHAZIL',
        'F3-369-013': 'PRIYA SHARMA',
        'F3-369-014': 'AMAN',
        'F3-369-015': 'SHIKHA',
        'F3-369-016': 'SALONI',
        'F3-369-017': 'ABHISHEK',
        'F3-369-018': 'KAPIL',
        'F3-369-019': 'PRIYA SHARMA',
        'F3-369-020': 'JITENDRA KUMAR',
        'F3-369-021': 'RAJIV GUPTA',
        
        'INT-369-034': 'ANKITA KUNDU',
        'INT-369-021': 'AYESHKANTA MOHAPATRA',
        'INT-369-025': 'ANURAG NAYAK',
        'INT-369-026': 'AWNISH',
        'INT-369-039': 'ARYMAN NAHAR',
        'INT-369-037': 'ABDUL AZHAR',
        'INT-369-024': 'JASHANPREET',
        'INT-369-029': 'KHUSHI BAJORIA',
        'INT-369-036': 'MANIK RANA',
        'INT-369-028': 'NAVROOP KAUR',
        'INT-369-032': 'PRANAV ACHARYA',
        'INT-369-023': 'RAHUL SAHA',
        'INT-369-022': 'SIDDARTH L',
        'INT-369-030': 'SIDDHI SINGH',
        'INT-369-038': 'SNEHAL',
        'INT-369-027': 'SANAD',
        'INT-369-035': 'VIKRANT CHOUDHARY',
        // Add all other mappings here
    };

    const generateEmployeeIds = (prefix, start, end) => {
        const ids = [];
        for (let i = start; i <= end; i++) {
            ids.push(`${prefix}-${String(i).padStart(3, '0')}`);
        }
        return ids;
    };

    const f2EmployeeIds = generateEmployeeIds('F2-369', 1, 300);
    const f3EmployeeIds = generateEmployeeIds('F3-369', 1, 50);
    const intEmployeeIds = generateEmployeeIds('INT-369', 1, 50);

    const allEmployeeIds = [...f2EmployeeIds, ...f3EmployeeIds, ...intEmployeeIds];

    const departmentToCategoriesMap = {
    'HR': ['Leave adjustment', 'Half day', 'Salary helpdesk', 'Shift day time adjustment', 'Workplace harassment and discrimination', 'Performance appraisal dispute','Other'],
    'IT': ['System availability', 'System change request', 'System malfunctioning', 'Data quality on dialer', 'Internet issue', 'Movement of system', 'Headset issue', 'Dialer related query','OMS Not Working', 'Printer Issue','Other'],
    'ADMIN': ['Empty water cooler', 'Watering of plants', 'Cleanliness', 'Printer issue', 'Need blank pages','Other'],
    'OPS': ['Delayed response on case', 'Banker number confirmation','Customer mail initiation', 'Customer visit initiation','Other'],
    'PRODUCT': ['Need product PPT', 'Product training assistance', 'Update the product details', 'Product knowledge assistance', 'Company profile PPT','Other'],
    'MARKETING': ['Stationery issue', 'Maintenance issue', 'Other'],
    'SALES': ['Product training assistance', 'Need a superior to talk to a client in my leader\'s absence', 'Assistance in handling customer complaint', 'Tele-calling training', 'Wrong or error in case entry', 'Other'],
    'CREDIT': ['Delay in eligibility check of case', 'CIBIL check', 'Arrange PD call', 'Other'],
    'ACCOUNTANDFINANCE': ['Purchase of new item', 'Stationery issue', 'Maintenance issue', 'Channel Partner Payment', 'Gift Card', 'Regular expenses raise request','Travel reimbursement', 'Food reimbursement','Regular Expenses','Contest reimbursement','Other'],
    'DIRECTORS': ['Personal issue discussion', 'Meeting with directors', 'Performance appraisal dispute', 'Stationery issue', 'Maintenance issue', 'Other'],
    'GROWTH': ['Assistance in campaign design', 'Assistance in employee development', 'Assistance in mapping KPIs and KRAs', 'Support in managing team', 'Raise the issue with directors', 'Other'],
    // Add more departments and their categories here
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            empName: name === 'empId' ? empIdToNameMap[value] || '' : prevState.empName
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDate = new Date().toISOString();
            const updatedFormData = {
                ...formData,
                dateCreated: currentDate,
                resolveDate: formData.resolveDate || null // Ensure resolveDate is sent as null if empty
            };
            const response = await axios.post('http://13.235.164.94:5000/submitdata', updatedFormData); 

            console.log(response.data);
            setSuccessMessage('Issue raised successfully!');
            setFormData({
                email: '',
                empId: '',
                empName: '',
                dateCreated: '',
                description: '',
                priority: '',
                status: '',
                category: '',
                assignedTo: '',
                comments: '',
                attachment: '',
                closureDetails: '',
                feedback: '',
                resolveDate: null,
                timeTaken: ''
            });
            setTimeout(() => {
                setSuccessMessage('');
            }, 4000);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
            <h1>Query Hub Form</h1>
            <div className="form-group">
                <label htmlFor="empId">EmpId:</label>
                <select name="empId" id="empId" value={formData.empId} onChange={handleChange}>
                    <option value="">Select Employee ID</option>
                    {allEmployeeIds.map(empId => (
                        <option key={empId} value={empId}>{empId}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="empName">Emp Name:</label>
                <input type="text" name="empName" id="empName" value={formData.empName} onChange={handleChange} placeholder="Employee Name" readOnly />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Please Enter Your Email" />
            </div>
            <div className="form-group">
                <label htmlFor="assignedTo">Assigned To:</label>
                <select name="assignedTo" id="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {Object.keys(departmentToCategoriesMap).map(department => (
                        <option key={department} value={department}>{department}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="category">Issue Category:</label>
                <select name="category" id="category" value={formData.category} onChange={handleChange} disabled={!formData.assignedTo}>
                    <option value="">Select Category</option>
                    {formData.assignedTo && departmentToCategoriesMap[formData.assignedTo]?.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {/* <div className="form-group">
                <label htmlFor="closureDetails">Closure Details:</label>
                <input type="text" name="closureDetails" id="closureDetails" value={formData.closureDetails} onChange={handleChange} placeholder="Closure Details" />
            </div> */}
            <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select name="priority" id="priority" value={formData.priority} onChange={handleChange}>
                        <option value="">Select Priority</option>
                        <option value="Urgent">Urgent</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Description" rows="4" cols="50" />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
);
};

export default UserForm;
