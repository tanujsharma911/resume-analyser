import React from "react";
import { Textarea } from "./ui/textarea";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { generateResumeReport } from "@/services/resumeReport.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const GenerateResumeReport = () => {
  const navigate = useNavigate();

  const [jobDescription, setJobDescription] = React.useState("");
  const [selfDescription, setSelfDescription] = React.useState("");
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [analyzing, setAnalyzing] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    if (resumeFile) {
      formData.append("resume", resumeFile);
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
      navigate("/report");
    }
    setAnalyzing(false);
  };

  return (
    <div className="space-y-5">
      <Field>
        <FieldLabel htmlFor="job-description">Job Description</FieldLabel>
        <Textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter the job description here..."
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="self-description">Self Description</FieldLabel>
        <Textarea
          id="self-description"
          value={selfDescription}
          onChange={(e) => setSelfDescription(e.target.value)}
          placeholder="Enter your self description here..."
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="resume">Resume</FieldLabel>
        <Input
          id="resume"
          type="file"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
        />
      </Field>
      <div>
        <Button
          type="submit"
          className="w-full"
          onClick={handleSubmit}
          disabled={analyzing}
        >
          {analyzing ? "Analyzing..." : "Analyze"}
        </Button>
      </div>
    </div>
  );
};

export default GenerateResumeReport;
