"use client";

import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  isReview?: boolean;
  correctAnswer?: number;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onSelectOption,
  isReview = false,
  correctAnswer,
}: QuestionCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      {/* Question Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Question {questionNumber} of {totalQuestions}
        </span>
        {isReview && correctAnswer !== undefined && (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium",
              selectedOption === correctAnswer
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {selectedOption === correctAnswer ? "Correct" : "Incorrect"}
          </span>
        )}
      </div>

      {/* Question Text */}
      <h2 className="mb-6 text-lg font-medium text-foreground leading-relaxed">
        {question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = isReview && correctAnswer === index;
          const isWrong = isReview && isSelected && correctAnswer !== index;

          return (
            <button
              key={index}
              onClick={() => !isReview && onSelectOption(index)}
              disabled={isReview}
              className={cn(
                "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
                isReview
                  ? isCorrect
                    ? "border-success bg-success/10"
                    : isWrong
                    ? "border-destructive bg-destructive/10"
                    : "border-border bg-card"
                  : isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary/50"
              )}
            >
              {/* Option Letter */}
              <span
                className={cn(
                  "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                  isReview
                    ? isCorrect
                      ? "bg-success text-success-foreground"
                      : isWrong
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-secondary text-muted-foreground"
                    : isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>

              {/* Option Text */}
              <span
                className={cn(
                  "flex-1 text-sm",
                  isSelected || isCorrect
                    ? "font-medium text-foreground"
                    : "text-foreground"
                )}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
