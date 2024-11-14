import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAllJobs,
  getJobById,
  getJobsCreatedByAdmin,
  postJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// Route to post a new job
router.post("/post", isAuthenticated, postJob);

// Route to get all jobs
router.get("/get", isAuthenticated, getAllJobs);

// Route to get jobs created by the admin
router.get("/getadminjobs", isAuthenticated, getJobsCreatedByAdmin);

// Route to get a job by ID
router.get("/get/:id", isAuthenticated, getJobById);

export default router;
