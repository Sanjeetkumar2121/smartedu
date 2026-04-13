"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface ExamCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  subjects: number;
  tests: number;
  gradient: string;
}

export function ExamCard({
  title,
  description,
  icon: Icon,
  href,
  subjects,
  tests,
  gradient,
}: ExamCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Gradient Background */}
      <div
        className={cn(
          "absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-30",
          gradient
        )}
      />

      {/* Icon */}
      <div
        className={cn(
          "mb-4 flex h-14 w-14 items-center justify-center rounded-xl",
          gradient
        )}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{description}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground">{subjects}</span>
          <span className="text-muted-foreground">Subjects</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground">{tests}+</span>
          <span className="text-muted-foreground">Tests</span>
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
        <svg
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );
}
