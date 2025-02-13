/* eslint-disable @typescript-eslint/no-explicit-any */

export interface UserContext {
  age: number;
  location?: string;
  studyingFor?: string;
  topicProgress?: {
    totalAttempts: number;
    successRate: number;
    averageTime: number;
    lastLevel: number;
    masteryScore: number;
  };
}

export interface ExploreResponse {
  parts: string[];
  relatedQueries: RelatedTopic[];
  context?: string;
}

export interface RelatedTopic {
  query: string;
  type: "prerequisite" | "extension" | "application" | "parallel" | "deeper";
  context: string;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: number;
  ageGroup: string;
  topic: string;
  subtopic: string;
  index?: number;
}

export interface SearchBarProps {
  key?: string;
  onSearch: (query: string) => Promise<void> | void;
  placeholder: string;
  centered?: boolean;
  title?: string;
  className?: string;
  suggestions?: Array<{
    text: string;
    icon: string;
  }>;
  buttonText?: string;
  initialValue?: string;
  onSubmit?: (query: string) => void;
}

export interface QuestionHistory {
  usedQuestions: Set<string>;
  lastLevel: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  topicStrength: number;
  usedContexts: Set<string>;
  usedConcepts: Set<string>;
  usedApplications: Set<string>;
  usedExamples: Set<string>;
}

export interface MarkdownComponentProps {
  node?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

// Add other shared types here
