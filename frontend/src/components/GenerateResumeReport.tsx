import React from "react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { generateResumeReport } from "@/services/resumeReport.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useUserStore } from "@/store/user.store";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "./ui/input-group";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const generateReportFormSchema = z.object({
  jobDescription: z
    .string()
    .min(50, "Job description must be at least 50 characters.")
    .max(1500, "Job description must be at most 1500 characters."),

  selfDescription: z
    .string()
    .min(50, "Self description must be at least 50 characters.")
    .max(1500, "Self description must be at most 1500 characters."),

  resumeFile: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      return allowedTypes.includes(file.type);
    }, "Invalid file type. Only PDF, DOC, and DOCX are allowed."),
});

const GenerateResumeReport = () => {
  const navigate = useNavigate();

  const { user } = useUserStore();

  const [analyzing, setAnalyzing] = React.useState(false);

  const generateReportForm = useForm<z.infer<typeof generateReportFormSchema>>({
    resolver: zodResolver(generateReportFormSchema),
    mode: "onChange",

    defaultValues: {
      jobDescription: "",
      selfDescription: "",
      resumeFile: undefined,
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof generateReportFormSchema>,
  ) => {
    try {
      setAnalyzing(true);

      if (!user.isLoggedIn) {
        toast.error("Please log in to generate a resume report.");
        navigate("/login");
        return;
      }

      if (!data.resumeFile) {
        toast.error("Please upload your resume to generate a report.");
        return;
      }

      const formData = new FormData();

      formData.append("jobDescription", data.jobDescription);

      formData.append("selfDescription", data.selfDescription);

      if (data.resumeFile) {
        formData.append("resume", data.resumeFile);
      }

      const reportResponse = await generateResumeReport(formData);

      if (reportResponse?.status === 200) {
        toast.success(
          "Resume analysis complete! Check your profile for the report.",
        );

        localStorage.setItem(
          "latestReport",
          JSON.stringify(reportResponse.data.report),
        );

        console.log("Report data saved to localStorage:", reportResponse.data);

        navigate("/report");
      }
    } catch (error) {
      toast.error("Failed to generate report.");
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-5">
      <form
        id="form-rhf-demo"
        onSubmit={generateReportForm.handleSubmit(handleSubmit)}
      >
        <FieldGroup>
          {/* Job Description */}
          <Controller
            name="jobDescription"
            control={generateReportForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="jobDescription">
                  Job Description
                </FieldLabel>

                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="jobDescription"
                    placeholder="I'm applying for a software engineering role at a tech company. The job requires experience with React, Node.js, and cloud platforms. I'm looking for a position that allows me to work on challenging projects and grow my skills."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />

                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/1500 characters (Min. 50)
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Self Description */}
          <Controller
            name="selfDescription"
            control={generateReportForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="selfDescription">
                  Self Description
                </FieldLabel>

                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="selfDescription"
                    placeholder="I'm a software engineer with experience in React, Node.js, and cloud platforms. I'm looking for a challenging role where I can contribute to innovative projects and continue growing my skills."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />

                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/1500 characters (Min. 50)
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Resume Upload */}
          <Controller
            name="resumeFile"
            control={generateReportForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="resumeFile">Resume File</FieldLabel>

                <InputGroup>
                  <Input
                    id="resumeFile"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => {
                      field.onChange(e.target.files?.[0]);
                    }}
                  />
                </InputGroup>

                <FieldDescription>
                  Upload PDF, DOC, or DOCX file.
                </FieldDescription>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      {/* Buttons */}
      <Field orientation="horizontal">
        <Button
          type="button"
          variant="outline"
          onClick={() => generateReportForm.reset()}
          disabled={analyzing}
        >
          Reset
        </Button>

        <Button type="submit" form="form-rhf-demo" disabled={analyzing}>
          {analyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </Field>
    </div>
  );
};

export default GenerateResumeReport;
