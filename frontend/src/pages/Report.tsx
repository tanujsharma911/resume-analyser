import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ReportData = {
  candidate_name: string;
  role: string;
  matchScore: number;
  issues: string[];
  jobDescription: string[];
  technicalQuestions: Array<{
    question: string;
    answer: string;
    intention: string;
  }>;
  behavioralQuestions: Array<{
    question: string;
    answer: string;
    intention: string;
  }>;
  skillsGaps: Array<{
    skill: string;
    severity: "low" | "medium" | "high";
  }>;
  preparationPlan: Array<{
    day: number;
    focus: string;
    tasks: string[];
  }>;
};

const severityClass: Record<"low" | "medium" | "high", string> = {
  low: "bg-emerald-100 text-emerald-800",
  medium: "bg-amber-100 text-amber-800",
  high: "bg-rose-100 text-rose-800",
};

const Report = () => {
  //   const { report } = reportData;
  const [report, setReport] = useState<ReportData | null>(null);

  useEffect(() => {
    const getReport = () => {
      const reportData = localStorage.getItem("latestReport");
      if (reportData) {
        setReport(JSON.parse(reportData) as ReportData);
      } else {
        toast.error(
          "No report found. Please submit your resume for analysis first.",
        );
      }
    };

    getReport();
  }, []);

  return (
    <main className=" py-10">
      <div className="container mx-auto space-y-8 px-6">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          Resume Analysis Report
        </h1>
        <Card className="overflow-hidden">
          <CardContent className="flex items-center p-2 relative space-x-5 overflow-hidden">
            <div className="rounded-lg border bg-white/80 p-4 min-w-50 text-center">
              <p className="text-sm text-muted-foreground">Match Score</p>
              <p
                className={cn(
                  "text-4xl font-extrabold " +
                    ((report?.matchScore || 80) >= 90
                      ? "text-emerald-600"
                      : "text-amber-600"),
                )}
              >
                {report?.matchScore}%
              </p>
              <div className="mt-3 h-2 rounded-full bg-zinc-200">
                <div
                  className={cn(
                    "h-2 rounded-full",
                    (report?.matchScore || 80) >= 90
                      ? "bg-emerald-500"
                      : "bg-amber-500",
                  )}
                  style={{ width: `${report?.matchScore || 80}%` }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {report?.candidate_name}
              </h1>
              <p className="text-muted-foreground">
                Target Role: {report?.role}
              </p>
            </div>

            <img
              src="./resume.png"
              alt="resume"
              className="absolute w-50 -rotate-12 grayscale pointer-events-none -right-10 top-4 opacity-20"
            />
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="">
                Key Issues To Improve
                <Badge
                  variant="outline"
                  className="ml-3 text-rose-800 border-rose-200"
                >
                  {report?.issues.length}
                </Badge>
              </CardTitle>
              <CardDescription>
                These are the most important risk areas affecting role fit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report?.issues.map((issue) => (
                  <li
                    key={issue}
                    className="rounded-lg border bg-background p-3 text-sm"
                  >
                    {issue}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Job Description Targets</CardTitle>
              <CardDescription>
                Keep these points central while revising your resume.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report?.jobDescription.map((point) => (
                  <li
                    key={point}
                    className="rounded-lg border bg-background p-3 text-sm"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Technical Interview Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report?.technicalQuestions.map((item) => (
                <article
                  key={item.question}
                  className="space-y-2 rounded-lg border p-4"
                >
                  <h3 className="font-semibold">Q. {item.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Strong answer:{" "}
                    </span>
                    {item.answer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Why asked:{" "}
                    </span>
                    {item.intention}
                  </p>
                </article>
              ))}
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>Behavioral Interview Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report?.behavioralQuestions.map((item) => (
                <article
                  key={item.question}
                  className="space-y-2 rounded-lg border p-4"
                >
                  <h3 className="font-semibold">Q. {item.question}</h3>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Strong answer:{" "}
                    </span>
                    {item.answer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Why asked:{" "}
                    </span>
                    {item.intention}
                  </p>
                </article>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Skill Gaps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {report?.skillsGaps.map((gap) => (
                <div
                  key={gap.skill}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <p className="text-sm font-medium">{gap.skill}</p>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${severityClass[gap.severity]}`}
                  >
                    {gap.severity}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle>3-Day Preparation Plan</CardTitle>
              <CardDescription>
                Follow this sprint plan to raise confidence before interviews.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {report?.preparationPlan.map((dayPlan) => (
                <div key={dayPlan.day} className="rounded-lg border p-4">
                  <p className="text-sm font-semibold text-rose-600">
                    Day {dayPlan.day}
                  </p>
                  <h3 className="mt-1 font-semibold">{dayPlan.focus}</h3>
                  <ul className="mt-3 space-y-2">
                    {dayPlan.tasks.map((task) => (
                      <li key={task} className="text-sm text-muted-foreground">
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Report;
