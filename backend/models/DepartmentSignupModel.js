const mongoose = require('mongoose');

const departmentDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['HR', 'IT', 'ADMIN', 'OPS','MARKETING','CREDIT','ACCOUNTANDFINANCE','DIRECTORS','GROWTH','OTHER'],
  },
});

const DepartmentSignupData = mongoose.model('DepartmentSignupData', departmentDataSchema);


module.exports = DepartmentSignupData;
