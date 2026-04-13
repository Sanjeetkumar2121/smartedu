"use client";

import { SubjectCard } from "@/components/subject-card";
import {
  Calculator,
  BookText,
  Brain,
  Globe,
  Microscope,
  History,
  Scale,
  Users,
  Search,
  Filter,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const subjects = [
  {
    id: "mathematics",
    title: "Mathematics",
    description:
      "Arithmetic, Algebra, Geometry, Trigonometry, and Data Interpretation",
    icon: Calculator,
    chapters: 12,
    progress: 65,
    color: "bg-primary",
  },
  {
    id: "english",
    title: "English Language",
    description:
      "Grammar, Vocabulary, Comprehension, and Error Spotting",
    icon: BookText,
    chapters: 10,
    progress: 80,
    color: "bg-accent",
  },
  {
    id: "reasoning",
    title: "Reasoning Ability",
    description:
      "Logical, Analytical, Verbal, and Non-verbal Reasoning",
    icon: Brain,
    chapters: 15,
    progress: 55,
    color: "bg-success",
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description:
      "Current Affairs, Static GK, History, Geography, and Economy",
    icon: Globe,
    chapters: 8,
    progress: 45,
    color: "bg-warning",
  },
  {
    id: "science",
    title: "General Science",
    description:
      "Physics, Chemistry, Biology, and Environmental Science",
    icon: Microscope,
    chapters: 9,
    progress: 70,
    color: "bg-destructive",
  },
  {
    id: "history",
    title: "Indian History",
    description:
      "Ancient, Medieval, Modern History, and Freedom Movement",
    icon: History,
    chapters: 6,
    progress: 35,
    color: "bg-primary",
  },
  {
    id: "polity",
    title: "Indian Polity",
    description:
      "Constitution, Governance, Political System, and Public Policy",
    icon: Scale,
    chapters: 7,
    progress: 50,
    color: "bg-accent",
  },
  {
    id: "economics",
    title: "Economics",
    description:
      "Indian Economy, Banking, Budget, and Economic Concepts",
    icon: Users,
    chapters: 8,
    progress: 40,
    color: "bg-success",
  },
];

function SubjectsContent() {
  const searchParams = useSearchParams();
  const exam = searchParams.get("exam") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSubjects = subjects.filter((subject) =>
    subject.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const examTitles: Record<string, string> = {
    ssc: "SSC Exams",
    upsc: "UPSC Civil Services",
    navy: "Indian Navy",
    railway: "Railway Recruitment",
    all: "All Exams",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
          <p className="text-muted-foreground">
            {examTitles[exam]} - Select a subject to start learning
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:w-48"
            />
          </div>
          {/* Filter */}
          <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Overall Progress</h2>
            <p className="text-sm text-muted-foreground">
              You have completed 55% of all subjects
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 sm:w-48">
              <div className="h-2 rounded-full bg-secondary">
                <div className="h-full w-[55%] rounded-full bg-primary" />
              </div>
            </div>
            <span className="text-lg font-bold text-primary">55%</span>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSubjects.map((subject) => (
          <SubjectCard key={subject.id} {...subject} />
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-12">
          <Search className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            No subjects found
          </h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search query
          </p>
        </div>
      )}
    </div>
  );
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading subjects...</div>}>
      <SubjectsContent />
    </Suspense>
  );
}
