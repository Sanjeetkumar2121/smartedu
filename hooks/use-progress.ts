"use client";

import { useState, useEffect, useCallback } from "react";

interface Progress {
  testsCompleted: number;
  totalScore: number;
  studyHours: number;
  streak: number;
  lastStudyDate: string | null;
  subjectProgress: Record<string, number>;
}

const STORAGE_KEY = "smartedu_progress";

const defaultProgress: Progress = {
  testsCompleted: 0,
  totalScore: 0,
  studyHours: 0,
  streak: 0,
  lastStudyDate: null,
  subjectProgress: {},
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (error) {
        console.error("Error parsing progress:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, isLoaded]);

  const updateTestCompleted = useCallback((score: number, total: number) => {
    setProgress((prev) => ({
      ...prev,
      testsCompleted: prev.testsCompleted + 1,
      totalScore: prev.totalScore + score,
    }));
  }, []);

  const updateStudyTime = useCallback((minutes: number) => {
    const today = new Date().toISOString().split("T")[0];

    setProgress((prev) => {
      const isNewDay = prev.lastStudyDate !== today;
      const wasYesterday =
        prev.lastStudyDate ===
        new Date(Date.now() - 86400000).toISOString().split("T")[0];

      return {
        ...prev,
        studyHours: prev.studyHours + minutes / 60,
        streak: isNewDay ? (wasYesterday ? prev.streak + 1 : 1) : prev.streak,
        lastStudyDate: today,
      };
    });
  }, []);

  const updateSubjectProgress = useCallback(
    (subjectId: string, progress: number) => {
      setProgress((prev) => ({
        ...prev,
        subjectProgress: {
          ...prev.subjectProgress,
          [subjectId]: Math.min(100, Math.max(0, progress)),
        },
      }));
    },
    []
  );

  const getAverageScore = useCallback(() => {
    if (progress.testsCompleted === 0) return 0;
    return Math.round(progress.totalScore / progress.testsCompleted);
  }, [progress.testsCompleted, progress.totalScore]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    isLoaded,
    updateTestCompleted,
    updateStudyTime,
    updateSubjectProgress,
    getAverageScore,
    resetProgress,
  };
}
