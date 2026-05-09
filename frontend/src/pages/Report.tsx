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

const reportData: { report: ReportData } = {
  report: {
    candidate_name: "Tanuj Sharma",
    role: "Software Engineer",
    matchScore: 85,
    issues: [
      "Candidate is currently an undergraduate student (graduating 2028), which may limit immediate full-time availability compared to experienced engineers.",
      "Limited professional industry experience, primarily relying on internship and project work.",
      "Lack of explicit large-scale production system experience serving millions of users.",
    ],
    jobDescription: [
      "Design and scale large-scale distributed systems.",
      "Strong CS fundamentals, data structures, and algorithms.",
      "Backend or full-stack development experience.",
      "Experience with cloud platforms, microservices, and containerization.",
      "Collaborate on architecture, code reviews, and CI/CD.",
    ],
    technicalQuestions: [
      {
        question:
          "How would you design a rate limiter for a high-traffic API to prevent service abuse?",
        answer:
          "I would use a token bucket or leaky bucket algorithm implemented with Redis to store counts per user ID or IP, ensuring low-latency checks.",
        intention:
          "To assess the candidate's understanding of system design, scalability, and performance optimization for high-traffic environments.",
      },
      {
        question:
          "Explain how you would handle database consistency in a microservices architecture when a transaction spans multiple services.",
        answer:
          "I would use the Saga pattern or two-phase commit, or ideally design services to be idempotent to handle failures using message queues like RabbitMQ or Kafka.",
        intention:
          "To test knowledge of distributed systems, transaction management, and reliability patterns.",
      },
    ],
    behavioralQuestions: [
      {
        question:
          "Describe a time you had to optimize a piece of code or a system that was underperforming. What was your approach?",
        answer:
          "During my internship, I implemented unit tests with Jest which helped identify bottlenecks in our component rendering, reducing development time and fixing layout issues.",
        intention:
          "To evaluate the candidate's problem-solving methodology and commitment to high-quality engineering.",
      },
      {
        question:
          "Tell me about a technical disagreement you had with a team member. How did you resolve it?",
        answer:
          "I would focus on evidence-based decision making, such as benchmarking or referring to established design patterns like Atomic Design to reach a consensus.",
        intention:
          "To assess collaboration, communication skills, and the ability to operate within a team-oriented engineering culture.",
      },
    ],
    skillsGaps: [
      {
        skill: "Microservices Architecture Patterns",
        severity: "medium",
      },
      {
        skill: "Large-scale Distributed Systems Design",
        severity: "high",
      },
    ],
    preparationPlan: [
      {
        day: 1,
        focus: "Distributed Systems Theory",
        tasks: [
          "Study CAP theorem and consistency models.",
          "Learn about Load Balancers, Caching strategies, and Message Queues.",
        ],
      },
      {
        day: 2,
        focus: "System Design",
        tasks: [
          "Practice designing scalable platforms like YouTube or Twitter.",
          "Focus on database partitioning and sharding.",
        ],
      },
      {
        day: 3,
        focus: "Behavioral/Culture Fit",
        tasks: [
          "Prepare STAR method responses for past projects.",
          "Review FAANG engineering values and ownership expectations.",
        ],
      },
    ],
  },
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
        <Card className="overflow-hidden">
          <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_240px] md:items-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {report?.candidate_name}
              </h1>
              <p className="text-muted-foreground">
                Target Role: {report?.role}
              </p>
            </div>

            <div className="rounded-xl border bg-white/80 p-4 text-center">
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
          </CardContent>
        </Card>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="p-4">
            <CardHeader>
              <CardTitle>Key Issues To Improve</CardTitle>
              <CardDescription>
                These are the most important risk areas affecting role fit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {report?.issues.map((issue) => (
                  <li
                    key={issue}
                    className="rounded-lg border border-rose-100 bg-rose-50/60 p-3 text-sm"
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
                  <h3 className="font-semibold">{item.question}</h3>
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
                  <h3 className="font-semibold">{item.question}</h3>
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
