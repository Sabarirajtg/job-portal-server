const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const ApplicantController = require("../controllers/Applicant");
const router = express.Router();

router.post("/", ApplicantController.addApplicant); //

router.get("/", ApplicantController.getAllApplicants); //

router.get("/:id", ApplicantController.getApplicant); //

router.get("/company/:id", ApplicantController.getApplicantsByCompany); //

router.get("/byjob/:id", ApplicantController.getApplicantsByJob); //

router.get("/:jobId/:applicantId", ApplicantController.getApplicantByJobId); //

router.put("/:id", ApplicantController.updateApplicant); //

router.delete("/:id", ApplicantController.deleteApplicant); //

module.exports = router;
