// API Service for SmartEdu
// This service handles all API calls to the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

// Types
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject?: string;
  chapter?: string;
  difficulty?: "easy" | "medium" | "hard";
}

export interface Test {
  id: string;
  name: string;
  subject: string;
  questions: Question[];
  duration: number; // in seconds
  totalMarks: number;
}

export interface TestResult {
  testId: string;
  userId: string;
  answers: (number | null)[];
  score: number;
  accuracy: number;
  timeTaken: number;
  timestamp: number;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  chapters: number;
  progress: number;
}

export interface UserProgress {
  userId: string;
  totalTests: number;
  avgScore: number;
  studyHours: number;
  streak: number;
}

// API Functions

/**
 * Fetch questions for a specific test
 */
export async function fetchQuestions(
  testId: string,
  limit?: number
): Promise<Question[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/questions?testId=${testId}${limit ? `&limit=${limit}` : ""}`
    );
    if (!response.ok) throw new Error("Failed to fetch questions");
    return response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}

/**
 * Fetch all subjects
 */
export async function fetchSubjects(): Promise<Subject[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects`);
    if (!response.ok) throw new Error("Failed to fetch subjects");
    return response.json();
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
}

/**
 * Fetch chapters for a specific subject
 */
export async function fetchChapters(subjectId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/subjects/${subjectId}/chapters`);
    if (!response.ok) throw new Error("Failed to fetch chapters");
    return response.json();
  } catch (error) {
    console.error("Error fetching chapters:", error);
    throw error;
  }
}

/**
 * Submit test answers
 */
export async function submitTestAnswers(
  testId: string,
  answers: (number | null)[]
): Promise<TestResult> {
  try {
    const response = await fetch(`${API_BASE_URL}/tests/${testId}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answers }),
    });
    if (!response.ok) throw new Error("Failed to submit test");
    return response.json();
  } catch (error) {
    console.error("Error submitting test:", error);
    throw error;
  }
}

/**
 * Fetch user analytics data
 */
export async function fetchAnalytics(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/analytics`);
    if (!response.ok) throw new Error("Failed to fetch analytics");
    return response.json();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
}

/**
 * Fetch user progress
 */
export async function fetchUserProgress(userId: string): Promise<UserProgress> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/progress`);
    if (!response.ok) throw new Error("Failed to fetch progress");
    return response.json();
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error;
  }
}

/**
 * Fetch test history
 */
export async function fetchTestHistory(
  userId: string,
  limit?: number
): Promise<TestResult[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/tests${limit ? `?limit=${limit}` : ""}`
    );
    if (!response.ok) throw new Error("Failed to fetch test history");
    return response.json();
  } catch (error) {
    console.error("Error fetching test history:", error);
    throw error;
  }
}

/**
 * Fetch weak topics analysis
 */
export async function fetchWeakTopics(userId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/weak-topics`);
    if (!response.ok) throw new Error("Failed to fetch weak topics");
    return response.json();
  } catch (error) {
    console.error("Error fetching weak topics:", error);
    throw error;
  }
}

// SWR fetcher function
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data.");
  }
  return response.json();
};
