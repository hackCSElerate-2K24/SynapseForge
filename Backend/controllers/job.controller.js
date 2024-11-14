import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../services/emailService.js";;
import axios from "axios";


export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      companyId,
      location,
      salary,
      jobType,
      experience,
      position,
    } = req.body;
    const userId = req.id;

    console.log("Job Data:", {
      title,
      description,
      requirements,
      companyId,
      location,
      salary,
      jobType,
      experience,
      position,
    });

    // Convert requirements to an array if it's not already
    const requirementsArray = typeof requirements === 'string' ? requirements.split(',').map(skill => skill.trim()) : requirements;

    // Fetch all job seekers' skills via the API
    const response = await axios.get("http://localhost:11000/api/v1/user/job-seeker-skills");
    const jobSeekers = response.data.data;

    console.log("Job Seekers:", jobSeekers);

    // Filter matched users based on skills
    const matchedUsers = jobSeekers.filter(user =>
      user.profile.skills.some(skill => requirementsArray.includes(skill))
    );

    console.log("Matched Users:", matchedUsers);

    // Send email notifications to matched users
    for (const user of matchedUsers) {
      const emailText = `
        Hi ${user.fullName},

        A new job that matches your skills has been posted:
        Title: ${title}
        Description: ${description}
        Location: ${location}
        Salary: ${salary}
        Company ID: ${companyId}

        Check it out and apply soon!
      `;

      await sendEmail(user.email, `New Job Matching Your Skills: ${title}`, emailText);
    }

    // Create the job entry in the database
    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      company: companyId,
      location,
      salary: Number(salary),
      jobType,
      experienceLevel: experience,
      position,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job created successfully and notifications sent",
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error creating job or sending emails:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};









// student k liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
