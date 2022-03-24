const CompanyModel = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  try {
    let data = await CompanyModel.find();
    res.status(200).send({ data: [...data], status: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.addCompany = async (req, res) => {
  const company = new CompanyModel(req.body);
  try {
    await company.save();
    res.status(201).send({ data: company["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, msg: err.message });
  }
};

exports.getCompany = async (req, res) => {
  try {
    let data = await CompanyModel.findById(req.params.id);
    if (data === null || data === {}) {
      throw new Error("No record found");
    }
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    let data = await CompanyModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).exec();
    res.status(200).send({ data: data["_doc"], success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    let data = await CompanyModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ data: data, success: true });
  } catch (err) {
    console.log(err);
    res.status(404).send({ success: false, msg: err.message });
  }
};