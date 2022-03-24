const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const CompanyController = require("../controllers/Company");
const router = express.Router();

router.post("/", CompanyController.addCompany);//

router.get("/", CompanyController.getAllCompanies);//

router.get("/:id", CompanyController.getCompany);//

router.put("/:id", CompanyController.updateCompany);//

router.delete("/:id", CompanyController.deleteCompany);//

module.exports = router;
