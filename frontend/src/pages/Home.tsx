import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import GenerateResumeReport from "@/components/GenerateResumeReport";

const Home = () => {
  return (
    <main className="container mx-auto px-6 py-12">
      <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold leading-tight">
            Resume Analyzer — Improve your CV, Ace your Interview
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload your resume or paste its text and get actionable feedback on
            formatting, impact, keywords, and likely interview questions.
            Designed for clear recommendations and quick fixes.
          </p>
        </div>

        <div className="bg-rose-50/20 p-5 rounded-xl border-2 border-rose-300/30 shadow-lg shadow-rose-200/50">
          <GenerateResumeReport />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold">What you'll get</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <CardTitle>Actionable Improvements</CardTitle>
            <CardDescription>
              Bullet-point suggestions for phrasing, structure, and metrics.
            </CardDescription>
          </Card>
          <Card className="p-6">
            <CardTitle>Interview Questions</CardTitle>
            <CardDescription>
              Potential technical and behavioral questions tailored to your
              experience.
            </CardDescription>
          </Card>
          <Card className="p-6">
            <CardTitle>Role Alignment</CardTitle>
            <CardDescription>
              Guidance on tailoring your resume to specific job descriptions.
            </CardDescription>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Home;
