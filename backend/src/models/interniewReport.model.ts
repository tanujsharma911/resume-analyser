import mongoose from "mongoose";

interface TechnicalQuestion {
  question: string;
  answer: string;
  intention: string;
}

interface BehavioralQuestion {
  question: string;
  answer: string;
  intention: string;
}

interface SkillsGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

interface PreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

export interface InterviewReportType {
  jobDescription: string;
  resume?: string;
  selfDescription?: string;
  matchScore?: number; // A score between 0 and 100 indicating how well the candidate matches the job description.
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillsGaps: SkillsGap[];
  preparationPlan: PreparationPlan[];
  modelUsed?: string; // The name of the model used for generating the report (e.g., "GPT-4").
}

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

const interviewReportSchema = new mongoose.Schema<InterviewReportType>({
  jobDescription: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillsGaps: [skillsGapSchema],
  preparationPlan: [preparationPlanSchema],

  modelUsed: {
    // The name of the model used for generating the report (e.g., "GPT-4").
    type: String,
  },
});

export const InterviewReport = mongoose.model<InterviewReportType>(
  "InterviewReport",
  interviewReportSchema,
);
