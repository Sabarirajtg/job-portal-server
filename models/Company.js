const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  noOfEmployees: {
    type: Number,
    required: false,
  },
});

const company = mongoose.model("company", CompanySchema);
module.exports = company;
