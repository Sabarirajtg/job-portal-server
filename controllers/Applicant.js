const ApplicantModel = require("../models/Applicants");

exports.getAllApplicants = async (req, res) => {
  try {
    let data = await ApplicantModel.find()
      .populate("jobId")
      .populate("applicantId")
      .populate("companyId");
    res.status(200).send({ data: [...data], status: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addApplicant = async (req, res) => {
  const applicant = new ApplicantModel(req.body);
  try {
    await applicant.save();
    res.status(201).send({ data: applicant["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: err.message });
  }
};

exports.getApplicantsByCompany = async (req, res) => {
  try {
    let data = await ApplicantModel.find({ companyId: req.params.id })
      .populate("jobId")
      .populate("applicantId")
      .populate("companyId");
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getApplicantsByJob = async (req, res) => {
  try {
    let data = await ApplicantModel.find({ jobId: req.params.id })
      .populate("jobId")
      .populate("applicantId")
      .populate("companyId");
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getApplicant = async (req, res) => {
  try {
    let data = await ApplicantModel.findById(req.params.id)
      .populate("jobId")
      .populate("applicantId")
      .populate("companyId");
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.getApplicantByJobId = async (req, res) => {
  try {
    let data = await ApplicantModel.find({
      jobId: req.params.jobId,
      applicantId: req.params.applicantId,
    })
      .populate("jobId")
      .populate("applicantId")
      .populate("companyId");
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.updateApplicant = async (req, res) => {
  try {
    let data = await ApplicantModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).send({ data: data["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    let data = await ApplicantModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};
