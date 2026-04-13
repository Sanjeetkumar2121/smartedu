import { ExamCard } from "@/components/exam-card";
import { StatsCard } from "@/components/stats-card";
import {
  Building2,
  Landmark,
  Anchor,
  Train,
  Target,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";

const exams = [
  {
    id: "ssc",
    title: "SSC",
    description:
      "Staff Selection Commission exams including CGL, CHSL, MTS and more.",
    icon: Building2,
    href: "/subjects?exam=ssc",
    subjects: 8,
    tests: 500,
    gradient: "bg-primary",
  },
  {
    id: "upsc",
    title: "UPSC",
    description:
      "Civil Services, IAS, IPS preparation with comprehensive study materials.",
    icon: Landmark,
    href: "/subjects?exam=upsc",
    subjects: 12,
    tests: 800,
    gradient: "bg-accent",
  },
  {
    id: "navy",
    title: "Navy",
    description:
      "Indian Navy recruitment exams including AA, SSR, and MR preparation.",
    icon: Anchor,
    href: "/subjects?exam=navy",
    subjects: 6,
    tests: 300,
    gradient: "bg-success",
  },
  {
    id: "railway",
    title: "Railway",
    description:
      "RRB exams including NTPC, Group D, JE, and other railway recruitments.",
    icon: Train,
    href: "/subjects?exam=railway",
    subjects: 7,
    tests: 450,
    gradient: "bg-warning",
  },
];

const stats = [
  {
    title: "Tests Completed",
    value: 24,
    change: "+3 this week",
    changeType: "positive" as const,
    icon: Target,
    iconColor: "bg-primary",
  },
  {
    title: "Study Hours",
    value: "48h",
    change: "+5h from last week",
    changeType: "positive" as const,
    icon: Clock,
    iconColor: "bg-accent",
  },
  {
    title: "Accuracy Rate",
    value: "78%",
    change: "+2% improvement",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "bg-success",
  },
  {
    title: "Rank",
    value: "#156",
    change: "Top 5% nationally",
    changeType: "neutral" as const,
    icon: Award,
    iconColor: "bg-warning",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, Student
        </h1>
        <p className="mt-1 text-muted-foreground">
          Continue your preparation journey. Select an exam to get started.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Exam Selection */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Choose Your Exam
            </h2>
            <p className="text-sm text-muted-foreground">
              Select an exam category to start practicing
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((exam) => (
            <ExamCard key={exam.id} {...exam} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "SSC CGL Mock Test 12",
              score: "85/100",
              time: "2 hours ago",
            },
            {
              title: "Railway NTPC Practice Set",
              score: "72/100",
              time: "Yesterday",
            },
            {
              title: "General Knowledge Quiz",
              score: "90/100",
              time: "2 days ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
            >
              <div>
                <p className="font-medium text-foreground">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{activity.score}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
