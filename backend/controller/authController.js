const Department = require('../models/DepartmentSignupModel');
const bcrypt = require('bcryptjs');

// Valid email addresses
const validEmails = ['wecare@f2fintech.com', 'hr@f2fintech.com', 'it@f2fintech.com','other@f2fintech.com'];

exports.signup = async (req, res) => {
  const { email, password, type } = req.body;
  
  try {
    // Check if email is valid
    if (!validEmails.includes(email)) {
      return res.status(400).json({ msg: 'Invalid email address. Signup with a valid email.' });
    }
    
    // Check if user with email already exists
    let user = await Department.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new Department({ email, password, type });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Department.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    res.json({ msg: 'Login successful', type: user.type });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Route to check if email exists
exports.checkEmailExists = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await Department.findOne({ email });
    if (user) {
      return res.json({ exists: true, msg: 'Email already exists' });
    } else {
      return res.json({ exists: false });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
