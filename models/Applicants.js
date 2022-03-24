const mongoose = require("mongoose");

const ApplicantSchema = mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "job",
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "user",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "company",
  },
  status: {
    type: String,
    required: false,
    default: "pending",
    enum: ["pending", "approved", "rejected"],
  },
});

const Applicant = mongoose.model("applicant", ApplicantSchema);
module.exports = Applicant;
