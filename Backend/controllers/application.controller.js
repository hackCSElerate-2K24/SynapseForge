import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(404).json({
        message: "Job ID not found",
        success: false,
      });
    }
    //check if user has already applied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      status: "pending",
    });
    job.applications.push(application._id);
    await job.save();
    return res.status(201).json({
      message: "Application created successfully",
      success: true,
      data: application,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: "companyId",
          options: {
            sort: { createdAt: -1 },
          },
        },
      });
    if (!applications || applications.length == 0) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Applications found",
      success: true,
      data: applications,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin ke liye for to check how many people allied to this job
export const getApplicants = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "applications",
      options: {
        sort: { createdAt: -1 },
      },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "JOB NOT FOUND",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "STATUS IS REQUIRED",
        success: false,
      });
    }

    //find the appliaction by applicant id
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "APPLICATION NOT FOUND",
        success: false,
      });
    }
    //update the status of the application
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "STATUS UPDATED SUCCESSFULLY",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
