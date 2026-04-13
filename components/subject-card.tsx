"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SubjectCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  chapters: number;
  progress: number;
  color: string;
}

export function SubjectCard({
  id,
  title,
  description,
  icon: Icon,
  chapters,
  progress,
  color,
}: SubjectCardProps) {
  return (
    <Link
      href={`/subjects/${id}`}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
            color
          )}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground truncate">{title}</h3>
            <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="mt-3 flex items-center gap-4">
            <span className="text-xs text-muted-foreground">
              {chapters} Chapters
            </span>
            <div className="flex items-center gap-2 flex-1">
              <div className="h-1.5 flex-1 rounded-full bg-secondary">
                <div
                  className={cn("h-full rounded-full", color)}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
