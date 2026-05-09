import type { Request, Response } from "express";
import { PDFParse } from "pdf-parse";
import { generateResumeReport } from "../services/ai.service.js";
import type { ResumeReportRepository } from "../repositories/resumeReport.repository.js";
import fs from "fs";
import { sanitizeExtractedText } from "../utils/utils.js";
import dotenv from "dotenv";

dotenv.config();

class ResumeReportController {
  private resumeReportRepository;

  constructor(resumeReportRepository: ResumeReportRepository) {
    this.resumeReportRepository = resumeReportRepository;
  }

  public generateResumeReport = async (req: Request, res: Response) => {
    try {
      const { file, body } = req; // Type assertion to access the file property added by multer

      if (!file) {
        return res.status(400).json({ error: "No resume file uploaded." });
      }

      const fileBuffer = fs.readFileSync(file.path);
      const pdfParse = new PDFParse({ data: fileBuffer });
      const pdfText = await pdfParse.getText();
      const cleanedText = sanitizeExtractedText(pdfText.text);

      const { jobDescription, selfDescription } = body;

      // console.log("PDF Text:", pdfText.text); // Log the extracted text for debugging
      fs.writeFile("extracted_resume.txt", cleanedText, (err) => {
        if (err) {
          console.error("Error writing extracted resume to file:", err);
        } else {
          console.log("Extracted resume text saved to extracted_resume.txt");
        }
      });

      fs.unlinkSync(file.path);

      const report = await generateResumeReport({
        resume: cleanedText,
        selfDescription,
        jobDescription,
      });

      this.resumeReportRepository.create({
        userId: (req as any).userId, // Assuming req.user is populated by the authentication middleware
        jobDescription,
        resume: cleanedText,
        selfDescription,
        matchScore: report.matchScore,
        technicalQuestions: report.technicalQuestions,
        behavioralQuestions: report.behavioralQuestions,
        skillsGaps: report.skillsGaps,
        preparationPlan: report.preparationPlan,
        modelUsed: process.env.AI_MODEL || "gemini-3.1-flash-lite-preview",
        issues: report.issues, // Save the identified issues in the resume
      });

      res.status(200).json({
        message: "Resume report generated successfully.",
        report: report,
      });
    } catch (error) {
      console.error("resume.controller.ts :: generateResumeReport :: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

export { ResumeReportController };
