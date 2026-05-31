export type AtsResult = {
  id: string;
  score: number;

  createdAt: Date;
  matchPercentage: number;
  foundKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  aiSuggestions: string[];
};
