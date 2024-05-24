import React, { useState, useEffect } from 'react';

function DynamicForm({ profession }) {
    const [showOwnershipProof, setShowOwnershipProof] = useState(false);
    const [businessType, setBusinessType] = useState('');
    const [showCommonFields, setShowCommonFields] = useState(false);
    const [doctorType, setDoctorType] = useState('');

    useEffect(() => {
        if (profession === 'Doctor') {
            setShowCommonFields(!!doctorType);
        }
    }, [profession, doctorType]);

    const handleCheckboxChange = (e) => {
        setShowOwnershipProof(e.target.checked);
    };

    const handleBusinessTypeChange = (e) => {
        setBusinessType(e.target.value);
        setShowCommonFields(true); // Show common fields when business type is selected
    };

    const handleDoctorTypeChange = (e) => {
        setDoctorType(e.target.value);
        setShowCommonFields(true); // Show common fields when doctor type is selected
    };

    const renderDoctorFields = () => {
        switch (doctorType) {
            case 'Salaried':
                return (
                    <>
                        <label>Highest Degree Certificate: <input type="file" name="degree_certificate" /></label>
                        <label>Registration Certificate: <input type="file" name="registration_certificate" /></label>
                        <label>Current Address Proof: <input type="file" name="address_proof" /></label>
                        <label>I-card (Company): <input type="file" name="company_id" /></label>
                        <label>Last 6 months Bank Statement: <input type="file" name="bank_statement_6mo" /></label>
                        <label>Last 3 months Salary Slip: <input type="file" name="salary_slip_3mo" /></label>
                    </>
                );
            case 'SelfEmployed':
                return (
                    <>
                        <label>Highest Degree Certificate: <input type="file" name="degree_certificate" /></label>
                        <label>Registration Certificate: <input type="file" name="registration_certificate" /></label>
                        <label>Current Address Proof: <input type="file" name="address_proof" /></label>
                        <label>Last 1 year Bank Statement (Current & Saving): <input type="file" name="bank_statement_1yr" /></label>
                        <label>Photo (Selfie): <input type="file" name="live_photo" /></label>
                        <label>Last 2 years Financials(ITR,Balance Sheet,COI,Profit & Loss): <input type="file" name="itr_2yrs" /></label>
                        <label>Last 2 years Form 26: <input type="file" name="form_26as_2yrs" /></label>
                        <label>Last 3 months Salary Slip: <input type="file" name="salary_slip_3mo" /></label>
                    </>
                );
            case 'Both':
                return (
                    <>
                        <label>Highest Degree Certificate: <input type="file" name="degree_certificate" /></label>
                        <label>Registration Certificate: <input type="file" name="registration_certificate" /></label>
                        <label>Current Address Proof: <input type="file" name="address_proof" /></label>
                        <label>I-card (Company): <input type="file" name="company_id" /></label>
                        <label>Last 1 year Bank Statement (Current & Saving): <input type="file" name="bank_statement_1yr" /></label>
                        <label>Photo (Selfie): <input type="file" name="live_photo" /></label>
                        <label>Last 2 years Financials(ITR,Balance Sheet,COI,Profit & Loss): <input type="file" name="itr_2yrs" /></label>
                        <label>Last 2 years Form 26/Form 16 AS: <input type="file" name="form_26as_2yrs" /></label>
                        <label>Last 3 months Salary Slip: <input type="file" name="salary_slip_3mo" /></label>
                    </>
                );
            default:
                return <p>Please select a doctor type to show the form fields.</p>;
        }
    };

    const renderFormFields = () => {
        return (
            <>
                {profession === 'Salaried' && (
                    <>
                        {additionalFields(profession)}
                        <label>Phone Number: <input type="text" name="phone_number" id="phone_number" /></label>
                        <label>WhatsApp Number: <input type="text" name="whatsapp_number" id="whatsapp_number" /></label>
                        <div>
                            <label><input type="checkbox" id="same_as_phone" onChange={copyPhoneNumber} /> Same as phone number</label>
                        </div>
                        <div>
                            <label>Permanent Address:</label>
                            <textarea name="permanent_address" id="permanent_address"></textarea>
                            <div>
                                <label><input type="checkbox" id="same_as_aadhaar" onChange={copyPermanentAddressFromAadhaar} /> My permanent address is mentioned on Aadhaar Card</label>
                            </div>
                            <div>
                                <label><input type="checkbox" id="living_in_rented" onChange={togglePermanentAddress} /> I am living in a rented space</label>
                            </div>
                            <div>
                                <label>Photo (Selfie): <input type="file" name="photo" /></label>
                            </div>
                        </div>
                        <div>
                            <label>Current Address:</label>
                            <textarea name="current_address" id="current_address"></textarea>
                            <div>
                                <label><input type="checkbox" id="current_on_aadhaar" onChange={copyCurrentAddressFromAadhaar} /> My current address is mentioned on Aadhaar Card</label>
                            </div>
                            <div>
                                <label><input type="checkbox" id="current_not_on_proof" onChange={handleCheckboxChange} /> My current address is not captured on any identity proof</label>
                            </div>
                        </div>
                        {showOwnershipProof && (
                            <div>
                                <label>Ownership Proof/Current Address Proof: <input type="file" name="ownership_proof" /></label>
                            </div>
                        )}
                    </>
                )}
                {profession === 'Business' && (
                    <>
                        <label>Business Type:</label>
                        <select id="businessType" name="business_type" onChange={handleBusinessTypeChange}>
                            <option value="">Select Business Type</option>
                            <option value="Proprietor">Proprietor</option>
                            <option value="Partnership">Partnership</option>
                            <option value="PrivateLimited">Private Limited</option>
                        </select>
                        <div id="businessForm">{renderBusinessFields(businessType)}</div>
                    </>
                )}
                {profession === 'Doctor' && (
                    <>
                        <label>Doctor Type:</label>
                        <select id="doctorType" name="doctor_type" onChange={handleDoctorTypeChange}>
                            <option value="">Select Type</option>
                            <option value="Salaried">Salaried</option>
                            <option value="SelfEmployed">Self-employed</option>
                            <option value="Both">Both</option>
                        </select>
                        <div id="doctorForm">{renderDoctorFields()}</div>
                    </>
                )}
                {showCommonFields && (
                    <div>
                        <label>PAN Card Number: <input type="text" name="pan_card_number" /></label>
                        <label>PAN Card: <input type="file" name="pan_card" /></label>
                        <label>Aadhaar Card: <input type="file" name="aadhaar_card" /></label>
                    </div>
                )}
            </>
        );
    };

    const additionalFields = (profession) => {
        if (profession === 'Salaried') {
            return (
                <>
                    <label>3 Months Salary Slip: <input type="file" name="3months_salary" /></label>
                    <label>6 Months Bank Statement: <input type="file" name="bank_statement_6mo" /></label>
                    <label>Form 16 Last 2 Year: <input type="file" name="form16_1yr" /></label>
                    <label>I Card of Company: <input type="file" name="company_id" /></label>
                    <label>Photo (Selfie): <input type="file" name="photo" /></label>
                    <div>
                        <label>Upload Any Proof (Rent agreement, Gas Bill, Mobile/Wifi Bill):</label>
                        <input type="file" name="additional_proof" />
                    </div>
                    <label>Mother's Name: <input type="text" name="mothers_name" /></label>
                    <label>Email: <input type="email" name="email" /></label>
                    <label>Working Address: <input type="text" name="working_address" /></label>
                </>
            );
        } else if (profession === 'Doctor') {
            return (
                <>
                    <label>Highest Degree Certificate: <input type="file" name="degree_certificate" /></label>
                    <label>Current Address Proof: <input type="file" name="address_proof" /></label>
                    <label>Last 6 Months Bank Statement: <input type="file" name="bank_statement_6mo" /></label>
                    <label>Photo (Selfie): <input type="file" name="live_photo" /></label>
                    <label>Last 3 Months Salary Slip: <input type="file" name="salary_slip_3mo" /></label>
                </>
            );
        }
        return null;
    };

    const renderBusinessFields = (businessType) => {
        switch (businessType) {
            case 'Proprietor':
                return (
                    <>  <label>Ownership Proof: <input type="file" name="company_address_proof" /></label>
                        <label>Last 1 Year Bank Statement (Current & Saving): <input type="file" name="bank_statement_1yr" /></label>
                        <label>GST Registration Certificate/Business Proof (3 years vintage): <input type="file" name="gst_certificate" /></label>
                        <label>Last 2 Years Financials (ITR,Balance Sheet,COI,Profit & Loss): <input type="file" name="itr_2yrs" /></label>
                        <label>Last 2 Years Form 26 AS: <input type="file" name="form_26as_2yrs" /></label>
                    </>
                );
            case 'Partnership':
                return (
                    <>
                        <label>Ownership Proof: <input type="file" name="company_address_proof" /></label>
                        <label>Partnership Deed/Letter of Authority: <input type="file" name="partnership_deed" /></label>
                        <label>Last 2 Years Financials (ITR,Balance Sheet,COI,Profit & Loss): <input type="file" name="itr_2yrs" /></label>
                        <label>GST Registration Certificate/Business Proof (3 years vintage): <input type="file" name="gst_certificate_3yrs" /></label>
                        <label>Last 1 Year Bank Statement (Current & Saving): <input type="file" name="bank_statement_1yr" /></label>
                    </>
                );
            case 'PrivateLimited':
                return (
                    <>
                        <label>Ownership Proof: <input type="file" name="company_address_proof" /></label>
                        <label>GST Registration Certificate/Business Proof: <input type="file" name="gst_certificate" /></label>
                        <label>Last 2 Years Financials(ITR,Balance Sheet,COI,Profit & Loss): <input type="file" name="itr_2yrs" /></label>
                        <label>MOA/AOA/COI: <input type="file" name="moa_aoa_coi" /></label>
                        <label>Board Resolution: <input type="file" name="board_resolution" /></label>
                        <label>Last 2 Years Form 26 AS: <input type="file" name="form_26as_2yrs" /></label>
                        <label>Last 1 Year Bank Statement (Current & Saving): <input type="file" name="bank_statement_1yr" /></label>
                    </>
                );
            default:
                return null;
        }
    };

    const copyPhoneNumber = () => {
        const phoneInput = document.getElementById('phone_number');
        const whatsappInput = document.getElementById('whatsapp_number');
        const checkbox = document.getElementById('same_as_phone');

        if (checkbox.checked) {
            whatsappInput.value = phoneInput.value;
        }
    };

    const copyPermanentAddressFromAadhaar = () => {
        const aadhaarAddress = "Aadhaar address"; // Replace with actual address if available
        const permanentAddress = document.getElementById('permanent_address');
        const checkbox = document.getElementById('same_as_aadhaar');

        if (checkbox.checked) {
            permanentAddress.value = aadhaarAddress;
        }
    };

    const togglePermanentAddress = () => {
        const permanentAddress = document.getElementById('permanent_address');
        const checkbox = document.getElementById('living_in_rented');

        if (checkbox.checked) {
            permanentAddress.disabled = false;
        } else {
            permanentAddress.disabled = true;
            permanentAddress.value = '';
        }
    };

    const copyCurrentAddressFromAadhaar = () => {
        const aadhaarAddress = "Aadhaar address"; // Replace with actual address if available
        const currentAddress = document.getElementById('current_address');
        const checkbox = document.getElementById('current_on_aadhaar');

        if (checkbox.checked) {
            currentAddress.value = aadhaarAddress;
        }
    };

    const toggleCurrentAddress = () => {
        const currentAddress = document.getElementById('current_address');
        const checkbox = document.getElementById('current_not_on_proof');

        if (checkbox.checked) {
            currentAddress.disabled = false;
        } else {
            currentAddress.disabled = true;
            currentAddress.value = '';
        }
    };

    return (
        <div id="dynamicForm">
            {renderFormFields()}
        </div>
    );
}

export default DynamicForm;