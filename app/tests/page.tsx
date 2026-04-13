"use client";

import { cn } from "@/lib/utils";
import { QuestionCard } from "@/components/question-card";
import { Timer } from "@/components/timer";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Flag,
  Pause,
  Play,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

const mockQuestions = [
  {
    id: 1,
    question:
      "If the selling price of 10 articles is equal to the cost price of 12 articles, then the profit or loss percent is:",
    options: ["20% profit", "20% loss", "25% profit", "25% loss"],
    correctAnswer: 0,
  },
  {
    id: 2,
    question:
      "A train 150 meters long passes a pole in 15 seconds. How long will it take to cross a platform 300 meters long?",
    options: ["30 seconds", "45 seconds", "40 seconds", "35 seconds"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question:
      "The average of 5 consecutive odd numbers is 27. What is the largest number?",
    options: ["29", "31", "33", "35"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question:
      "If 40% of a number is added to 120, the result is the same number. Find the number.",
    options: ["200", "180", "240", "150"],
    correctAnswer: 0,
  },
  {
    id: 5,
    question:
      "The ratio of present ages of A and B is 4:5. After 5 years, the ratio will be 5:6. What is the present age of A?",
    options: ["15 years", "20 years", "25 years", "30 years"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question:
      "A man rows downstream 30 km and upstream 18 km, taking 3 hours each time. The speed of the current is:",
    options: ["2 km/hr", "3 km/hr", "4 km/hr", "5 km/hr"],
    correctAnswer: 0,
  },
  {
    id: 7,
    question:
      "If the compound interest on a sum for 2 years at 10% per annum is Rs. 420, find the simple interest.",
    options: ["Rs. 380", "Rs. 400", "Rs. 420", "Rs. 440"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question:
      "A can do a piece of work in 10 days, B in 15 days. They work together for 5 days. The fraction of work left is:",
    options: ["1/6", "1/4", "1/3", "1/2"],
    correctAnswer: 0,
  },
  {
    id: 9,
    question:
      "In a mixture of 60 liters, the ratio of milk to water is 2:1. How much water must be added to make the ratio 1:2?",
    options: ["40 liters", "50 liters", "60 liters", "70 liters"],
    correctAnswer: 2,
  },
  {
    id: 10,
    question:
      "The sum of the digits of a two-digit number is 9. If 27 is added to the number, the digits are reversed. The number is:",
    options: ["27", "36", "45", "54"],
    correctAnswer: 1,
  },
];

export default function TestsPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(mockQuestions.length).fill(null)
  );
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [isRunning, setIsRunning] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleTimeUp = useCallback(() => {
    setIsRunning(false);
    handleSubmit();
  }, []);

  const handleSubmit = () => {
    // Store results in localStorage for the results page
    const results = {
      answers,
      questions: mockQuestions,
      timestamp: Date.now(),
    };
    localStorage.setItem("testResults", JSON.stringify(results));
    router.push("/results");
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlagged(newFlagged);
  };

  const answeredCount = answers.filter((a) => a !== null).length;
  const unansweredCount = answers.filter((a) => a === null).length;

  if (!testStarted) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Play className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Ready to Start?
          </h1>
          <p className="mb-6 text-muted-foreground">
            This test contains {mockQuestions.length} questions. You have 30
            minutes to complete it. Once started, the timer cannot be paused.
          </p>
          <div className="mb-6 rounded-lg bg-secondary p-4 text-left">
            <h3 className="mb-2 font-semibold text-foreground">Test Rules:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>- Each question carries 1 mark</li>
              <li>- No negative marking</li>
              <li>- You can flag questions for review</li>
              <li>- Navigate between questions freely</li>
            </ul>
          </div>
          <button
            onClick={() => setTestStarted(true)}
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-20">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/subjects"
            className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Test
          </Link>
          <h1 className="text-xl font-bold text-foreground">
            SSC CGL Mock Test
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Resume
              </>
            )}
          </button>
          <Timer
            initialTime={1800}
            onTimeUp={handleTimeUp}
            isRunning={isRunning}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Question Area */}
        <div>
          <QuestionCard
            questionNumber={currentQuestion + 1}
            totalQuestions={mockQuestions.length}
            question={mockQuestions[currentQuestion].question}
            options={mockQuestions[currentQuestion].options}
            selectedOption={answers[currentQuestion]}
            onSelectOption={handleSelectOption}
          />

          {/* Navigation Buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              onClick={toggleFlag}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                flagged.has(currentQuestion)
                  ? "bg-warning/10 text-warning"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <Flag className="h-4 w-4" />
              {flagged.has(currentQuestion) ? "Flagged" : "Flag for Review"}
            </button>

            {currentQuestion === mockQuestions.length - 1 ? (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Submit Test
                <Send className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestion(
                    Math.min(mockQuestions.length - 1, currentQuestion + 1)
                  )
                }
                className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Question Navigation Panel */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <h3 className="mb-4 font-semibold text-foreground">
            Question Navigator
          </h3>

          {/* Legend */}
          <div className="mb-4 flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-secondary" />
              <span className="text-muted-foreground">Not Answered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Flagged</span>
            </div>
          </div>

          {/* Question Grid */}
          <div className="mb-4 grid grid-cols-5 gap-2">
            {mockQuestions.map((_, index) => {
              const isAnswered = answers[index] !== null;
              const isFlagged = flagged.has(index);
              const isCurrent = index === currentQuestion;

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all",
                    isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                    isFlagged
                      ? "bg-warning text-warning-foreground"
                      : isAnswered
                      ? "bg-success text-success-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  )}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>

          {/* Stats */}
          <div className="space-y-2 rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Answered</span>
              <span className="font-medium text-success">{answeredCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Unanswered</span>
              <span className="font-medium text-foreground">
                {unansweredCount}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Flagged</span>
              <span className="font-medium text-warning">{flagged.size}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Submit Test?</h2>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {unansweredCount > 0 && (
              <div className="mb-4 flex items-center gap-3 rounded-lg bg-warning/10 p-3">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">
                  You have {unansweredCount} unanswered question(s).
                </p>
              </div>
            )}

            <div className="mb-6 space-y-2 rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Questions</span>
                <span className="font-semibold text-foreground">
                  {mockQuestions.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Answered</span>
                <span className="font-semibold text-success">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Unanswered</span>
                <span className="font-semibold text-foreground">
                  {unansweredCount}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-lg bg-secondary py-2.5 font-medium text-foreground transition-colors hover:bg-secondary/80"
              >
                Review Answers
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 rounded-lg bg-primary py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
