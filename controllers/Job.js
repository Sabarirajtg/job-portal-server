const JobModel = require("../models/Job");
const UserModel = require("../models/User");

exports.getAllJobs = async (req, res) => {
  try {
    let data = await JobModel.find().populate("companyId");
    res.status(200).send({ data: [...data], status: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addJob = async (req, res) => {
  const job = new JobModel(req.body);
  try {
    await job.save();
    res.status(201).send({ data: job["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: err.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    let data = await JobModel.findById(req.params.id).populate("companyId");
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getJobsByCompany = async (req, res) => {
  try {
    let data = await JobModel.find({ companyId: req.params.id }).populate(
      "companyId"
    );
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    let data = await JobModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).send({ data: data["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    let data = await JobModel.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addApplicant = async (req, res) => {
  try {
    let job = await JobModel.findById(req.params.id);
    const index = job.applicants.findIndex(
      (applicant) => applicant._id == req.body._id
      // (applicant) => console.log(applicant)
    );
    if (index === -1) {
      job.applicants.push(req.body);
      let updatedJob = await job.save();
      res.status(200).send({ data: updatedJob, success: true });
    } else {
      res.status(404).send({ success: false, reason: "User already exists" });
    }
  } catch (err) {
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.updateApplicant = async (req, res) => {
  try {
    let job = await JobModel.findById(req.params.id);
    const index = job.applicants.findIndex(
      (applicant) => applicant._id == req.body._id
      // (applicant) => console.log(applicant)
    );
    // console.log(index);
    if (index !== -1) job.applicants[index]["status"] = req.body.status;
    let updated = await job.save();
    let newJob = await JobModel.find().populate("applicants");
    res.status(200).send({ data: updated, success: true });
  } catch (err) {
    console.log(err.message);
  }
};

exports.userJobStatus = async (req, res) => {
  try {
    let job = await JobModel.findById(req.params.id);
    const index = job.applicants.findIndex(
      (applicant) => applicant._id == req.params.applicantId
      // (applicant) => console.log(applicant)
    );
    let status = "";
    if (index !== -1) {
      status = job.applicants[index]["status"];
      res.status(200).send({ status: status, success: true });
    } else {
      res
        .status(200)
        .send({ status: "Not applied for this job yet", success: true });
    }
  } catch (err) {
    res.status(404).send({ success: false, msg: err.message });
  }
};
