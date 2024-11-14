import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

// Route for registering a company
router.post("/register", isAuthenticated, registerCompany);

// Route for getting all companies
router.get("/get", isAuthenticated, getCompany);

// Route for updating a company by ID
router.put("/update/:id", isAuthenticated, updateCompany);

// Route for getting a company by ID
router.get("/get/:id", isAuthenticated, getCompanyById);

export default router;
