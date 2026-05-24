import { z } from "zod";

export const personalInformationDbSchema = z.object({
  fullName: z.string(),
  job: z.string(),
  email: z.string(),
  number: z.string(),
  describeProfile: z.string(),
  linkedinProfile: z.string(),
});

export const experienceDbSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  jobDescription: z.string(),
});

export const eduationDbSchema = z.object({
  id: z.string(),
  institute: z.string(),
  degree: z.string(),
  startYear: z.string(),
  endYear: z.string(),
  description: z.string(),
});

export const resumeBuilderDbSchema = z.object({
  personalInformation: personalInformationDbSchema,
  experiences: z.array(experienceDbSchema),
  educations: z.array(eduationDbSchema),
  skills: z.string(),
});

export type PersonalInformationDbSchema = z.infer<
  typeof personalInformationDbSchema
>;
export type ExperienceDbSchema = z.infer<typeof experienceDbSchema>;
export type EducationDbSchema = z.infer<typeof eduationDbSchema>;
export type ResumeBuilderDbSchema = z.infer<typeof resumeBuilderDbSchema>;
