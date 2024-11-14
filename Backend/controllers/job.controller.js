import { Job } from "../models/job.model.js";

// Function to post a new jobimport { Job } from "../models/job.model.js";

// Function to post a new job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      company,
      location,
      salary,
      jobType,
      experienceLevel,
      position,
    } = req.body;
    const userId = req.id;

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !company ||
      !location ||
      !salary ||
      !jobType ||
      !experienceLevel ||
      !position
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all fields", success: false });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements, // Use the array directly
      companyId: company,
      location,
      salary: Number(salary),
      jobType,
      experienceLevel,
      position,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Function to get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        { requirements: { $regex: keywords, $options: "i" } },
        { location: { $regex: keywords, $options: "i" } },
        { jobType: { $regex: keywords, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "companyId",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Function to get a job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching job:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// Function to get jobs created by admin
export const getJobsCreatedByAdmin = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
