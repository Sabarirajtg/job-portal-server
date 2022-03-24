const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const JobController = require("../controllers/Job");
const router = express.Router();

router.post("/", JobController.addJob);

router.get("/", JobController.getAllJobs);

router.get("/:id", JobController.getJob);

router.get("/jobsbycompany/:id", JobController.getJobsByCompany);

router.put("/:id", JobController.updateJob);

router.delete("/:id", JobController.deleteJob);

router.post("/addapplicant/:id", JobController.addApplicant);

router.put("/updateapplicant/:id", JobController.updateApplicant);

router.get("/:id/userjobstatus/:applicantId", JobController.userJobStatus);

module.exports = router;
