import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
      const { companyName } = req.body;
      if (!companyName) {
        return res
          .status(400)
          .json({ message: "Please fill Company Name", success: false });
      }
      let company = await Company.findOne({ name: companyName });
      if (company) {
        return res.status(400).json({
          message: "Company already exists",
          success: false,
        });
      }
  
      company = await Company.create({ name: companyName, userId: req.id });
      console.log("Registered Company:", company); // Log the created company
      return res.status(201).json({
        message: "Company created successfully",
        success: true,
        data: company,
      });
    } catch (error) {
      console.error("Error registering company:", error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  
  export const getCompany = async (req, res) => {
    try {
      const userId = req.id;
      console.log("User ID:", userId); // Log the user ID
      const companies = await Company.find({ userId });
      if (!companies || companies.length === 0) {
        return res.status(404).json({
          message: "Companies not found",
          success: false,
        });
      }
      return res.status(200).json({
        message: "Companies found",
        success: true,
        data: companies,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company found",
      data: company,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const updateCompany = async (req, res) => {
    try {
      const { name, description, Website, location } = req.body;
      const updateData = { name, description, Website, location };
  
      // Find and update the company
      const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true, // Validate the data before updating
      });
  
      if (!company) {
        return res.status(404).json({
          message: "Company not found",
          success: false,
        });
      }
  
      return res.status(200).json({
        message: "Company updated successfully",
        success: true,
        data: company, // Return the updated company data
      });
    } catch (error) {
      console.error("Error updating company:", error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  
