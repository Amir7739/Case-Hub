import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        // You can implement more robust authentication logic here, such as checking against a database
        // For simplicity, I'll just hardcode a password check
        const validPasswords = {
            'F2-369-001': 'password1',
            'F2-369-002': 'password2',
            'F2-369-168': 'password3',
            // Add more empIds and passwords here as needed
        };

        if (validPasswords[empId] === password) {
            onLogin(empId);
            setError(null);
        } else {
            setError('Invalid password. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <div className="inputGroup">
                <label htmlFor="empId">Emp ID:</label>
                <select
                    id="empId"
                    className="selectInput"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                >
                    <option value="">Choose EmployeeID</option>
                    <option value="HR">HR</option>
                    <option value="ADMIN">ADMIN</option>
                    {Array.from({ length: 300 }, (_, i) => (
                        <option
                            key={`F2-369-${i + 1}`}
                            value={`F2-369-${String(i + 1).padStart(3, '0')}`}
                        >
                            F2-369-{String(i + 1).padStart(3, '0')}
                        </option>
                    ))}
                </select>
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    className="textInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="loginButton" onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
