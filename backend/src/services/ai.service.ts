import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

const resumeReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating the candidate's suitability for the job.",
    ),
  jobDescription: z
    .string()
    .describe(
      "The job description for which the interview is being conducted.",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question that may be asked."),
        answer: z
          .string()
          .describe("The candidate's answer to the technical question."),
        intention: z
          .string()
          .describe(
            "The intention or purpose behind asking the technical question.",
          ),
      }),
    )
    .describe(
      "The list of technical questions that may be asked during the interview.",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question that may be asked."),
        answer: z
          .string()
          .describe("The candidate's answer to the behavioral question."),
        intention: z
          .string()
          .describe(
            "The intention or purpose behind asking the behavioral question.",
          ),
      }),
    )
    .describe(
      "The list of behavioral questions that may be asked during the interview.",
    ),
  skillsGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate lacks."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("The severity of the skills gap."),
      }),
    )
    .describe("The list of skills gaps identified for the candidate."),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The day number in the preparation plan."),
        focus: z
          .string()
          .describe("The area of focus for the preparation task."),
        tasks: z.array(z.string().describe("A specific task to be completed.")),
      }),
    )
    .describe("The preparation plan for the candidate."),
});

export async function generateResumeReport({
  resume,
  selfDescription,
  jobDescription,
}: {
  resume: string;
  selfDescription: string;
  jobDescription: string;
}) {
  const prompt = `Generate a resume report for a candidate with the following details:
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(resumeReportSchema as any),
    },
  });

  return JSON.parse(response.text || "{}");
}
