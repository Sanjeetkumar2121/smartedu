"use client";

import { StatsCard } from "@/components/stats-card";
import { PerformanceChart } from "@/components/charts/performance-chart";
import { AccuracyChart } from "@/components/charts/accuracy-chart";
import { WeakTopicsChart } from "@/components/charts/weak-topics-chart";
import {
  Target,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  Calendar,
} from "lucide-react";

const stats = [
  {
    title: "Total Tests",
    value: 48,
    change: "+8 this month",
    changeType: "positive" as const,
    icon: Target,
    iconColor: "bg-primary",
  },
  {
    title: "Study Hours",
    value: "126h",
    change: "+18h this month",
    changeType: "positive" as const,
    icon: Clock,
    iconColor: "bg-accent",
  },
  {
    title: "Avg. Score",
    value: "78%",
    change: "+5% improvement",
    changeType: "positive" as const,
    icon: TrendingUp,
    iconColor: "bg-success",
  },
  {
    title: "Best Score",
    value: "96%",
    change: "SSC CGL Mock 8",
    changeType: "neutral" as const,
    icon: Award,
    iconColor: "bg-warning",
  },
];

const recentTests = [
  {
    name: "SSC CGL Mock Test 15",
    date: "Today",
    score: 85,
    questions: 100,
    correct: 85,
    wrong: 12,
    unanswered: 3,
  },
  {
    name: "Railway NTPC Set 8",
    date: "Yesterday",
    score: 72,
    questions: 100,
    correct: 72,
    wrong: 20,
    unanswered: 8,
  },
  {
    name: "UPSC Prelims Mock 3",
    date: "2 days ago",
    score: 68,
    questions: 100,
    correct: 68,
    wrong: 25,
    unanswered: 7,
  },
];

const upcomingTests = [
  { name: "SSC CGL Mock Test 16", date: "Tomorrow", time: "10:00 AM" },
  { name: "Navy SSR Practice Set", date: "Apr 15", time: "2:00 PM" },
  { name: "Railway Group D Test", date: "Apr 17", time: "11:00 AM" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your progress and performance analytics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <PerformanceChart />
        <AccuracyChart />
      </div>

      {/* Weak Topics */}
      <WeakTopicsChart />

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Tests */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Recent Tests
            </h3>
            <a
              href="/results"
              className="text-sm text-primary hover:underline"
            >
              View All
            </a>
          </div>
          <div className="space-y-4">
            {recentTests.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-foreground">{test.name}</p>
                  <p className="text-sm text-muted-foreground">{test.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-success">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">{test.correct}</span>
                  </div>
                  <div className="flex items-center gap-1 text-destructive">
                    <XCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{test.wrong}</span>
                  </div>
                  <div className="min-w-[60px] text-right">
                    <span className="text-lg font-bold text-primary">
                      {test.score}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tests */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Upcoming Tests
            </h3>
            <a href="/tests" className="text-sm text-primary hover:underline">
              Schedule More
            </a>
          </div>
          <div className="space-y-4">
            {upcomingTests.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{test.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {test.date} at {test.time}
                    </p>
                  </div>
                </div>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Streak */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Study Streak
            </h3>
            <p className="text-sm text-muted-foreground">
              Keep your momentum going!
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">12</p>
            <p className="text-sm text-muted-foreground">Days</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`h-8 flex-1 rounded ${
                i < 12
                  ? "bg-primary"
                  : i < 18
                  ? "bg-primary/30"
                  : "bg-secondary"
              }`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
