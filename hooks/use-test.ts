"use client";

import { useState, useCallback, useEffect } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface UseTestOptions {
  questions: Question[];
  timeLimit: number; // in seconds
  onTimeUp?: () => void;
  onSubmit?: (answers: (number | null)[], score: number) => void;
}

interface UseTestReturn {
  currentQuestion: number;
  answers: (number | null)[];
  flagged: Set<number>;
  timeLeft: number;
  isRunning: boolean;
  score: number | null;
  isComplete: boolean;
  selectAnswer: (questionIndex: number, optionIndex: number) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  toggleFlag: (index: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  submitTest: () => void;
  resetTest: () => void;
}

export function useTest({
  questions,
  timeLimit,
  onTimeUp,
  onSubmit,
}: UseTestOptions): UseTestReturn {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isRunning || isComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isComplete]);

  const handleTimeUp = useCallback(() => {
    setIsRunning(false);
    calculateScore();
    onTimeUp?.();
  }, [onTimeUp]);

  const calculateScore = useCallback(() => {
    const correct = answers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length;
    setScore(correct);
    setIsComplete(true);
    return correct;
  }, [answers, questions]);

  const selectAnswer = useCallback(
    (questionIndex: number, optionIndex: number) => {
      if (isComplete) return;
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[questionIndex] = optionIndex;
        return newAnswers;
      });
    },
    [isComplete]
  );

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < questions.length) {
        setCurrentQuestion(index);
      }
    },
    [questions.length]
  );

  const nextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }, [currentQuestion, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }, [currentQuestion]);

  const toggleFlag = useCallback((index: number) => {
    setFlagged((prev) => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(index)) {
        newFlagged.delete(index);
      } else {
        newFlagged.add(index);
      }
      return newFlagged;
    });
  }, []);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resumeTimer = useCallback(() => {
    if (!isComplete) {
      setIsRunning(true);
    }
  }, [isComplete]);

  const submitTest = useCallback(() => {
    const finalScore = calculateScore();
    onSubmit?.(answers, finalScore);
  }, [answers, calculateScore, onSubmit]);

  const resetTest = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setFlagged(new Set());
    setTimeLeft(timeLimit);
    setIsRunning(false);
    setScore(null);
    setIsComplete(false);
  }, [questions.length, timeLimit]);

  return {
    currentQuestion,
    answers,
    flagged,
    timeLeft,
    isRunning,
    score,
    isComplete,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    previousQuestion,
    toggleFlag,
    pauseTimer,
    resumeTimer,
    submitTest,
    resetTest,
  };
}
