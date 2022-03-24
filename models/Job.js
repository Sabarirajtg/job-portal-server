const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: Date.now,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "company",
  },
  // applicants: [
  //   {
  //     _id: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       required: false,
  //       ref: "user",
  //     },
  //     firstName: {
  //       type: String,
  //       required: false,
  //     },
  //     lastName: {
  //       type: String,
  //       required: false,
  //     },
  //     email: {
  //       type: String,
  //       required: false,
  //     },
  //     status: {
  //       type: String,
  //       required: false,
  //       default: "pending",
  //       enum: ["pending", "approved", "rejected"],
  //     },
  //   },
  // ],
});

const Job = mongoose.model("job", JobSchema);
module.exports = Job;
