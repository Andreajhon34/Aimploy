import { ResumeBuilderDbSchema } from "../../resume-builder/_schemas/resumeBuilderDbForm";

export type Resume = {
  resumeId: string;
  title: string;
  content: ResumeBuilderDbSchema;
  updatedAt: Date;
};
