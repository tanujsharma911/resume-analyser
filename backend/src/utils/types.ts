import type mongoose from "mongoose";

export interface TechnicalQuestion {
  question: string;
  answer: string;
  intention: string;
}

export interface BehavioralQuestion {
  question: string;
  answer: string;
  intention: string;
}

export interface SkillsGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

export interface ResumeReportType {
  userId: mongoose.Schema.Types.ObjectId;
  jobDescription: string;
  resume: string;
  selfDescription: string;
  matchScore: number; // A score between 0 and 100 indicating how well the candidate matches the job description.
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillsGaps: SkillsGap[];
  preparationPlan: PreparationPlan[];
  modelUsed: string; // The name of the model used for generating the report (e.g., "GPT-4").
}
