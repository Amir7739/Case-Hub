import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [empId, setEmpId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = () => {
        // For simplicity, I'll just hardcode a password check
        const validPasswords = {
            'F2-369-001': 'H@rpRe3t#Singh',
            'F2-369-002': 'AbhiN@v@waL',
            'F2-369-101': 'Neh@_Singh_101',
            'F2-369-173': 'Anshika@Kh0li',
            'F2-369-175': 'R0sh@nY@d@v',
            'F2-369-186': 'A@nuR@Gg681',
            'F2-369-188': 'Jolly_Kumari123',
            'F2-369-189': 'Musk@n_J@iSw@l',
            'F2-369-190': 'AditiS1ngh@l',
            'F2-369-191': 'R@niKum@ri_123',
            'F2-369-192': 'Ambar_R@@j',
            'F2-369-193': 'Ad@rshTh@kur!23',
            'F2-369-199': 'AnkushSh@rm@123',
            'F2-369-210': 'M@nishaC@h@n!23',
            'F2-369-224': 'M@mtaK@noji@!23',
            'F2-369-225': 'Sur@jKum@r!23',
            'F2-369-226': 'S@g@rC@hu@n123',
            'F2-369-003': 'Sh@sh@nk_Sh@rm@!23',
            'F2-369-004': 'J!y@@7890',
            'F2-369-005': 'R@jkum@ri123',
            'F2-369-006': 'ShiV@niK@shy@P!23',
            'F2-369-008': 'M@noj_Kum@r_123',
            'F2-369-009': 'M@nishaS@xen@123',
            'F2-369-010': 'Ak@nsh@Bh@rti123',
            'F2-369-018': 'B@rkhaSingh_123',
            'F2-369-019': 'Furk@nJung123',
            'F2-369-020': 'Pr@g@tiS@xen@123',
            'F2-369-021': 'Uj@laRishiwal!23',
            'F2-369-023': 'J@iSingh123',
            'F2-369-024': 'Sh@rd@Kushw@h123',
            'F2-369-025': 'Krishn@Th@kur!23',
            'F2-369-026': 'NehaL@kr@_123',
            'F2-369-045': 'Him@nsh!Singh123',
            'F2-369-056': 'T@runDheem@n!23',
            'F2-369-077': 'Shubh@m_P@ht@k123',
            'F2-369-079': 'Anur@ndh@n_Kum@r!23',
            'F2-369-083': 'Pr@sh@nt_Kum@r123',
            'F2-369-085': 'Adity@_R@w@l123',
            'F2-369-106': 'Riy@_Ch@ddh@123',
            'F2-369-107': 'Vin@@t_Tiw@ri!23',
            'F2-369-118': 'Pr@deep_Kum@r123',
            'F2-369-120': 'M@nsi_Porw@l123',
            'F2-369-122': 'Neh@_D@nish_123',
            'F2-369-130': 'Roz!_Pr@veen123',
            'F2-369-132': 'L@khvind@r_Singh123',
            'F2-369-133': 'K@j@l_K@shy@p123',
            'F2-369-135': 'R@shi_G@ngw@r123',
            'F2-369-136': 'Krishn@_P@ndey123',
            'F2-369-138': 'Anit_Sinh@123',
            'F2-369-145': 'Prern@_Th@kur123',
            'F2-369-148': 'Adity@_Ch@uh@n123',
            'F2-369-149': 'Nish@_Ch@uh@n123',
            'F2-369-150': 'S@ni@_Irsh@d123',
            'F2-369-152': 'Abhish@k_Trivedi123',
            'F2-369-155': 'Renu_M@thur123',
            'F2-369-157': 'T@nnu_Y@d@v123',
            'F2-369-159': 'Shwet@_R@jput123',
            'F2-369-166': 'Him@nsh!Singh_1123',
            'F2-369-167': 'Ritu_Anur@gi123',
            'F2-369-168': 'Amir_Al@m_123',
            'F2-369-172': 'P@l@k_Mitt@l123',
            'F2-369-183': 'Anur@g_Sh@rm@123',
            'F2-369-196': 'Shiv@ngi_K@shy@p123',
            'F2-369-197': 'H@rsh_Ty@g!123',
            'F2-369-200': 'Noor_Ul_Hud@123',
            'F2-369-201': 'Tub@_Kh@n_123',
            'F2-369-202': 'A@di_Soni123',
            'F2-369-205': 'Ankit_P@l_123',
            'F2-369-208': 'Priy@nshu_P@l123',
            'F2-369-209': 'Shiv@m_Kum@r123',
            'F2-369-215': 'Ch@nch@l_Pr@j@p@ti123',
            'F2-369-218': 'Vish@l_123',
            'F2-369-219': 'Ritik@_Singh@l123',
            'F2-369-220': 'Rohit_C@hu@n123',
            'F2-369-222': 'Ir@m_Kh@n_123',
            'F2-369-223': 'M@nsiK@shy@p123',
            'F2-369-228': 'AkSh!tV!j@y@822',
            'F2-369-229': 'D@kSHs!nGh@92',
            'F2-369-230': 'D!V@ynShSi!nGh@L',
            'F2-369-231': 'h@rshBh@rDwa@j@231',
            'F2-369-232': 'suRy@P@rTapp@232',
            'F2-369-233': 'D!isH@233',
            'F2-369-234': 'S@m!rudh!N',
            // for intern
            'INT-369-034': 'Ankit@_Kundu123',
            'INT-369-021': 'Ayeshk@nt@_Moh@p@tr@123',
            'INT-369-025': 'Anur@gP@ss',
            'INT-369-026': 'AwN!sh@2023',
            'INT-369-039': 'Nah@r1234',
            'INT-369-037': 'Abdul_P@ss',
            'INT-369-024': 'J@shanPr33t#',
            'INT-369-029': 'Khu$h!B@j0ria',
            'INT-369-036': 'M@n!kR@n@2023',
            'INT-369-028': 'N@vr00pK@ur',
            'INT-369-032': 'Ach@ry@9876',
            'INT-369-023': 'R@hulS@h@2023',
            'INT-369-022': 'S!dd@rthL#2023',
            'INT-369-030': 'S1ddhi$!ngH@2023',
            'INT-369-038': 'Sn3h@l_P@ss',
            'INT-369-027': 'San@dp@$$w0rd',
            'INT-369-035': 'V1kr@nt_Chou!@rY2023',
            // for sourcer
            'F3-369-003': 'Sourav_#Pass123',
            'F3-369-004': 'Manas_$Pass456',
            'F3-369-005': 'ShrishtiTomar@_789',
            'F3-369-006': 'Muskan&Pass012',
            'F3-369-007': 'Pradeep*Pass345',
            'F3-369-008': 'Jyoti!Pass678',
            'F3-369-009': 'SonuPass_901',
            'F3-369-010': 'Neha#Pass234',
            'F3-369-011': 'ShamreenPass567!',
            'F3-369-012': 'Shazil_Pass890',
            'F3-369-013': 'PriyaSharma123#Pass',
            'F3-369-014': 'AmanPass$456',
            'F3-369-015': 'Shikha@_789Pass',
            'F3-369-016': 'SaloniPass012_',
            'F3-369-017': 'Abhishek345!Pass',
            'F3-369-018': 'KapilPass_678',
            'F2369-019': 'PriyaSharma901@Pass'
            // Add more empIds and passwords here as needed
        };

        if (validPasswords[empId] === password) {
            onLogin(empId);
            setError(null);
        } else {
            setError('Invalid password. Please try again.');
        }
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
                    {allEmployeeIds.map(empId => (
                        <option key={empId} value={empId}>{empId}</option>
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
