import { ResumeReport } from "../models/resumeReport.model.js";
import type mongoose from "mongoose";
import type { ResumeReportType } from "../utils/types.js";

export class ResumeReportRepository {
  public async create(reportGenerated: ResumeReportType) {
    const report = new ResumeReport({ ...reportGenerated });
    return await report.save();
  }
  public async findById(id: string) {
    return await ResumeReport.findById(id);
  }
  public async findByUserId(userId: mongoose.Schema.Types.ObjectId) {
    return await ResumeReport.find({ userId });
  }
}
