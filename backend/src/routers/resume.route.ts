import express from "express";
import { verifyAuth } from "../middleware/auth.middleware.js";
import { ResumeReportController } from "../controllers/resume.controller.js";
import { uploadResume } from "../middleware/file.middleware.js";
import { ResumeReportRepository } from "../repositories/resumeReport.repository.js";

const resumeReportRouter: express.Router = express.Router();

const resumeReportRepository = new ResumeReportRepository();
const resumeReportController = new ResumeReportController(
  resumeReportRepository,
);

/**
 * @route POST /api/resume/generate-report
 * @desc Generate interview questions, skills gap analysis, and preparation plan based on the candidate's resume and job description.
 * @access Private
 */
resumeReportRouter.post(
  "/generate-report",
  verifyAuth,
  uploadResume,
  resumeReportController.generateResumeReport,
);

export { resumeReportRouter };
