import mongoose from "mongoose";
import type {
  BehavioralQuestion,
  PreparationPlan,
  ResumeReportType,
  SkillsGap,
  TechnicalQuestion,
} from "../utils/types.js";

/**
 * - question: The technical question may be asked.
 * - answer: The candidate's answer to the technical question.
 * - intention: The intention or purpose behind asking the technical question (e.g., to assess problem-solving skills, coding ability, etc.).
 */
const technicalQuestionSchema = new mongoose.Schema<TechnicalQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // Disable automatic _id generation for subdocuments
  },
);
const behavioralQuestionSchema = new mongoose.Schema<BehavioralQuestion>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    intention: {
      type: String,
      required: true,
    },
  },
  {
    _id: false, // Disable automatic _id generation for subdocuments
  },
);

const skillsGapSchema = new mongoose.Schema<SkillsGap>(
  {
    skill: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  {
    _id: false, // Disable automatic _id generation for subdocuments
  },
);

const preparationPlanSchema = new mongoose.Schema<PreparationPlan>(
  {
    day: {
      type: Number,
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    _id: false, // Disable automatic _id generation for subdocuments
  },
);

const resumeReportSchema = new mongoose.Schema<ResumeReportType>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  selfDescription: {
    type: String,
    required: true,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  technicalQuestions: [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillsGaps: [skillsGapSchema],
  preparationPlan: [preparationPlanSchema],

  modelUsed: {
    // The name of the model used for generating the report (e.g., "GPT-4").
    type: String,
    required: true,
  },
});

export const ResumeReport = mongoose.model<ResumeReportType>(
  "ResumeReport",
  resumeReportSchema,
);
