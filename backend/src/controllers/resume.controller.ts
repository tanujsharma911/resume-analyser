import type { Request, Response } from "express";
import { PDFParse } from "pdf-parse";
import { generateResumeReport } from "../services/ai.service.js";
import type { ResumeReportRepository } from "../repositories/resumeReport.repository.js";
import fs from "fs";

class ResumeReportController {
  private resumeReportRepository: ResumeReportRepository;

  constructor(ResumeReportRepository: ResumeReportRepository) {
    this.resumeReportRepository = ResumeReportRepository;
  }

  public async generateResumeReport(req: Request, res: Response) {
    try {
      const { file, body } = req; // Type assertion to access the file property added by multer

      if (!file) {
        return res.status(400).json({ error: "No resume file uploaded." });
      }

      const fileBuffer = fs.readFileSync(file.path);
      const pdfParse = new PDFParse({ data: fileBuffer });
      const pdfText = await pdfParse.getText();

      const { jobDescription, selfDescription } = body;

      console.log("PDF Text:", pdfText.text); // Log the extracted text for debugging

      fs.unlinkSync(file.path);

      const report = await generateResumeReport({
        resume: pdfText.text,
        selfDescription,
        jobDescription,
      });

      this.resumeReportRepository.create({
        userId: (req as any).userId, // Assuming req.user is populated by the authentication middleware
        jobDescription,
        resume: pdfText.text,
        selfDescription,
        matchScore: report.matchScore,
        technicalQuestions: report.technicalQuestions,
        behavioralQuestions: report.behavioralQuestions,
        skillsGaps: report.skillsGaps,
        preparationPlan: report.preparationPlan,
        modelUsed: report.modelUsed,
      });

      res.status(200).json({
        message: "Resume report generated successfully.",
        report: report,
      });
    } catch (error) {
      console.error("resume.controller.ts :: generateResumeReport :: ", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export { ResumeReportController };
