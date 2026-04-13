"use client";

import { cn } from "@/lib/utils";
import { QuestionCard } from "@/components/question-card";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Home,
  RefreshCw,
  Share2,
  Trophy,
  XCircle,
  HelpCircle,
  Target,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface TestResults {
  answers: (number | null)[];
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  timestamp: number;
}

// Mock data for when localStorage is not available
const mockResults: TestResults = {
  answers: [0, 1, 1, 0, 1, 0, 1, 0, 2, 1],
  questions: [
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
  ],
  timestamp: Date.now(),
};

export default function ResultsPage() {
  const [results, setResults] = useState<TestResults | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("testResults");
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      setResults(mockResults);
    }
  }, []);

  if (!results) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-pulse text-muted-foreground">
          Loading results...
        </div>
      </div>
    );
  }

  const totalQuestions = results.questions.length;
  const correctAnswers = results.answers.filter(
    (answer, index) => answer === results.questions[index].correctAnswer
  ).length;
  const incorrectAnswers = results.answers.filter(
    (answer, index) =>
      answer !== null && answer !== results.questions[index].correctAnswer
  ).length;
  const unansweredQuestions = results.answers.filter(
    (answer) => answer === null
  ).length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const score = correctAnswers;

  const pieData = [
    { name: "Correct", value: correctAnswers, color: "hsl(142, 76%, 36%)" },
    { name: "Incorrect", value: incorrectAnswers, color: "hsl(0, 84%, 60%)" },
    {
      name: "Unanswered",
      value: unansweredQuestions,
      color: "hsl(220, 14%, 46%)",
    },
  ];

  const barData = results.questions.map((q, index) => ({
    name: `Q${index + 1}`,
    correct: results.answers[index] === q.correctAnswer ? 1 : 0,
    incorrect:
      results.answers[index] !== null &&
      results.answers[index] !== q.correctAnswer
        ? 1
        : 0,
  }));

  const getScoreMessage = () => {
    if (accuracy >= 90) return "Outstanding performance!";
    if (accuracy >= 75) return "Great job! Keep it up!";
    if (accuracy >= 60) return "Good effort! Room for improvement.";
    if (accuracy >= 40) return "Keep practicing! You can do better.";
    return "Don't give up! Practice makes perfect.";
  };

  const getScoreColor = () => {
    if (accuracy >= 75) return "text-success";
    if (accuracy >= 50) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/tests"
            className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tests
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Test Results</h1>
          <p className="text-muted-foreground">SSC CGL Mock Test</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <Share2 className="h-4 w-4" />
            Share
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>
      </div>

      {/* Score Card */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Main Score */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Trophy className={cn("h-8 w-8", getScoreColor())} />
              </div>
              <div>
                <p className={cn("text-5xl font-bold", getScoreColor())}>
                  {score}/{totalQuestions}
                </p>
                <p className="text-muted-foreground">{getScoreMessage()}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-success/10 p-4 text-center">
              <CheckCircle2 className="mx-auto h-6 w-6 text-success" />
              <p className="mt-2 text-2xl font-bold text-success">
                {correctAnswers}
              </p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="rounded-xl bg-destructive/10 p-4 text-center">
              <XCircle className="mx-auto h-6 w-6 text-destructive" />
              <p className="mt-2 text-2xl font-bold text-destructive">
                {incorrectAnswers}
              </p>
              <p className="text-xs text-muted-foreground">Incorrect</p>
            </div>
            <div className="rounded-xl bg-secondary p-4 text-center">
              <HelpCircle className="mx-auto h-6 w-6 text-muted-foreground" />
              <p className="mt-2 text-2xl font-bold text-foreground">
                {unansweredQuestions}
              </p>
              <p className="text-xs text-muted-foreground">Unanswered</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-4 text-center">
              <Target className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-2 text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pie Chart */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Answer Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}:</span>
                <span className="font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Question-wise Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="correct" fill="hsl(142, 76%, 36%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="incorrect" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Question Review
          </h3>
          <button
            onClick={() => setShowAllQuestions(!showAllQuestions)}
            className="text-sm text-primary hover:underline"
          >
            {showAllQuestions ? "Show Less" : "Show All"}
          </button>
        </div>

        {/* Question Navigation */}
        <div className="mb-6 grid grid-cols-5 gap-2 sm:grid-cols-10">
          {results.questions.map((question, index) => {
            const isCorrect =
              results.answers[index] === question.correctAnswer;
            const isUnanswered = results.answers[index] === null;

            return (
              <button
                key={index}
                onClick={() =>
                  setSelectedQuestion(selectedQuestion === index ? null : index)
                }
                className={cn(
                  "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all",
                  selectedQuestion === index &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-card",
                  isUnanswered
                    ? "bg-secondary text-muted-foreground"
                    : isCorrect
                    ? "bg-success text-success-foreground"
                    : "bg-destructive text-destructive-foreground"
                )}
              >
                {index + 1}
              </button>
            );
          })}
        </div>

        {/* Selected Question Detail */}
        {selectedQuestion !== null && (
          <div className="mb-6">
            <QuestionCard
              questionNumber={selectedQuestion + 1}
              totalQuestions={totalQuestions}
              question={results.questions[selectedQuestion].question}
              options={results.questions[selectedQuestion].options}
              selectedOption={results.answers[selectedQuestion]}
              onSelectOption={() => {}}
              isReview
              correctAnswer={results.questions[selectedQuestion].correctAnswer}
            />
          </div>
        )}

        {/* All Questions List */}
        {showAllQuestions && (
          <div className="space-y-4">
            {results.questions.map((question, index) => (
              <QuestionCard
                key={index}
                questionNumber={index + 1}
                totalQuestions={totalQuestions}
                question={question.question}
                options={question.options}
                selectedOption={results.answers[index]}
                onSelectOption={() => {}}
                isReview
                correctAnswer={question.correctAnswer}
              />
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/tests"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RefreshCw className="h-4 w-4" />
          Retake Test
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          <Home className="h-4 w-4" />
          Go to Home
        </Link>
      </div>
    </div>
  );
}
