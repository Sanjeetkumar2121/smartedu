"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  FileText,
  Lock,
  Play,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const subjectData: Record<
  string,
  {
    title: string;
    description: string;
    chapters: {
      id: string;
      title: string;
      topics: number;
      duration: string;
      completed: boolean;
      locked: boolean;
      tests: number;
    }[];
  }
> = {
  mathematics: {
    title: "Mathematics",
    description: "Master arithmetic, algebra, geometry, and data interpretation",
    chapters: [
      { id: "1", title: "Number System", topics: 8, duration: "2h 30m", completed: true, locked: false, tests: 5 },
      { id: "2", title: "HCF & LCM", topics: 5, duration: "1h 45m", completed: true, locked: false, tests: 3 },
      { id: "3", title: "Percentage", topics: 6, duration: "2h", completed: true, locked: false, tests: 4 },
      { id: "4", title: "Ratio & Proportion", topics: 7, duration: "2h 15m", completed: false, locked: false, tests: 4 },
      { id: "5", title: "Profit & Loss", topics: 8, duration: "2h 30m", completed: false, locked: false, tests: 5 },
      { id: "6", title: "Simple Interest", topics: 4, duration: "1h 30m", completed: false, locked: false, tests: 3 },
      { id: "7", title: "Compound Interest", topics: 5, duration: "1h 45m", completed: false, locked: true, tests: 3 },
      { id: "8", title: "Time & Work", topics: 6, duration: "2h", completed: false, locked: true, tests: 4 },
      { id: "9", title: "Time & Distance", topics: 7, duration: "2h 15m", completed: false, locked: true, tests: 4 },
      { id: "10", title: "Algebra", topics: 10, duration: "3h", completed: false, locked: true, tests: 6 },
      { id: "11", title: "Geometry", topics: 12, duration: "3h 30m", completed: false, locked: true, tests: 7 },
      { id: "12", title: "Data Interpretation", topics: 8, duration: "2h 30m", completed: false, locked: true, tests: 5 },
    ],
  },
  reasoning: {
    title: "Reasoning Ability",
    description: "Develop logical and analytical thinking skills",
    chapters: [
      { id: "1", title: "Coding-Decoding", topics: 6, duration: "1h 45m", completed: true, locked: false, tests: 4 },
      { id: "2", title: "Blood Relations", topics: 5, duration: "1h 30m", completed: true, locked: false, tests: 3 },
      { id: "3", title: "Direction Sense", topics: 4, duration: "1h 15m", completed: false, locked: false, tests: 3 },
      { id: "4", title: "Syllogism", topics: 6, duration: "2h", completed: false, locked: false, tests: 4 },
      { id: "5", title: "Puzzles", topics: 8, duration: "2h 30m", completed: false, locked: true, tests: 5 },
    ],
  },
};

export default function ChapterPage() {
  const params = useParams();
  const subjectId = params.id as string;
  const subject = subjectData[subjectId] || subjectData.mathematics;

  const completedChapters = subject.chapters.filter((c) => c.completed).length;
  const progress = Math.round((completedChapters / subject.chapters.length) * 100);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/subjects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Subjects
      </Link>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {subject.title}
            </h1>
            <p className="mt-1 text-muted-foreground">{subject.description}</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{completedChapters}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {subject.chapters.length}
              </p>
              <p className="text-xs text-muted-foreground">Total Chapters</p>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{progress}%</p>
              <p className="text-xs text-muted-foreground">Progress</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapters List */}
      <div className="space-y-3">
        {subject.chapters.map((chapter, index) => (
          <div
            key={chapter.id}
            className={cn(
              "group relative overflow-hidden rounded-xl border bg-card p-4 transition-all",
              chapter.locked
                ? "border-border opacity-60"
                : "border-border hover:border-primary/50 hover:shadow-md"
            )}
          >
            <div className="flex items-center gap-4">
              {/* Status Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                  chapter.completed
                    ? "bg-success text-success-foreground"
                    : chapter.locked
                    ? "bg-secondary text-muted-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                {chapter.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : chapter.locked ? (
                  <Lock className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">
                    {chapter.title}
                  </h3>
                  {chapter.completed && (
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                      Completed
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {chapter.topics} Topics
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {chapter.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    {chapter.tests} Tests
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {!chapter.locked && (
                <Link
                  href={`/tests?chapter=${chapter.id}&subject=${subjectId}`}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    chapter.completed
                      ? "bg-secondary text-foreground hover:bg-secondary/80"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {chapter.completed ? (
                    <>
                      <Trophy className="h-4 w-4" />
                      Review
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start
                    </>
                  )}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
