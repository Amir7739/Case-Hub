import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DynamicForm from './DynamicForm';
import './FormWrapper.css';


function FormWrapper() {
    const [profession, setProfession] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        updateForm();
    }, [profession]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

      axios.post('http://localhost:5000/api/documents/submit-documents', formData)
            .then(response => {
                displayMessage('success', response.data.message);
            })
            .catch(error => {
                displayMessage('error', error.message);
            });
    };

    const displayMessage = (type, message) => {
        setMessage({ type, text: message });
        setTimeout(() => {
            setMessage('');
        }, 5000);
    };

    const updateForm = (e) => {
        if (e) {
            setProfession(e.target.value);
        }
    };

    return (
        
        <div className="formbold-main-wrapper">
            <div className="formbold-form-wrapper">
                <h3>Document Submission for Loan Application</h3>
                <p>Fill in the details below to proceed with your loan application.</p>
                <form id="documentForm" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                    <label htmlFor="profession">Select Your Profession:
                        <select id="profession" onChange={updateForm} required>
                            <option value="">--Select One--</option>
                            <option value="Salaried">Salaried</option>
                            <option value="Business">Business</option>
                            <option value="Doctor">Doctor</option>
                        </select>
                    </label>
                    <DynamicForm profession={profession} />
                    <button type="submit">Submit Documents</button>
                </form>
                {message && <div id="message">
                    <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>
                </div>}
            </div>
        </div>
    );
}

export default FormWrapper;
