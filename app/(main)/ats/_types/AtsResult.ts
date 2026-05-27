export type AtsResult = {
  score: number;
  matchPercentage: number;
  foundKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  aiSuggestions: string[];
};
