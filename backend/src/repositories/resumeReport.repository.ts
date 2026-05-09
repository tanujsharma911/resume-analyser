import { ResumeReport } from "../models/resumeReport.model.js";
import type mongoose from "mongoose";
import type { ResumeReportType } from "../utils/types.js";

export class ResumeReportRepository {
  public async create({
    userId,
    jobDescription,
    resume,
    selfDescription,
    matchScore,
    technicalQuestions,
    behavioralQuestions,
    skillsGaps,
    preparationPlan,
    modelUsed,
  }: ResumeReportType) {
    const report = new ResumeReport({
      userId,
      jobDescription,
      resume,
      selfDescription,
      matchScore,
      technicalQuestions,
      behavioralQuestions,
      skillsGaps,
      preparationPlan,
      modelUsed,
    });
    return await report.save();
  }
  public async findById(id: string) {
    return await ResumeReport.findById(id);
  }
  public async findByUserId(userId: mongoose.Schema.Types.ObjectId) {
    return await ResumeReport.find({ userId });
  }
}
