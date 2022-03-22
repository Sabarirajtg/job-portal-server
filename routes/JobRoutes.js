const express = require("express");
const UserAuth = require("../middleware_auth/UserAuth");
const JobService = require("../controllers/Job");
const router = express.Router();

router.post("/", UserAuth, JobService.addJob);

router.get("/", UserAuth, JobService.getAllJobs);

router.get("/:id", UserAuth, JobService.getJob);

router.put("/:id", UserAuth, JobService.updateJob);

router.delete("/:id", UserAuth, JobService.deleteJob);

router.post("/addapplicant/:id", UserAuth, JobService.addApplicant);

router.put("/updateapplicant/:id", UserAuth, JobService.updateApplicant);

router.get(
  "/:id/userjobstatus/:applicantId",
  UserAuth,
  JobService.userJobStatus
);

module.exports = router;
