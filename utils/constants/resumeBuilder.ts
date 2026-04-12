import type {
  ExperienceSchema,
  PersonalInformationSchema,
  EducationSchema,
  SkillsSchema,
} from "@/schemas/resume-builder";

export const PERSONAL_INFORMATION_DEFAULTS: PersonalInformationSchema = {
  fullName: "",
  email: "",
  job: "",
  number: "",
  describeProfile: "",
  linkedinProfile: "",
};

export const EXPERIENCE_DEFAULTS: ExperienceSchema = {
  id: crypto.randomUUID(),
  company: "",
  endDate: "Sekarang",
  position: "",
  startDate: "",
  jobDescription: "",
};

export const EDUCATION_DEFAULT: EducationSchema = {
  id: crypto.randomUUID(),
  degree: "",
  endYear: "Sekarang",
  institute: "",
  startYear: "",
  description: "",
};

export const SKILLS_DEFAULT: SkillsSchema = {
  categorized: [],
  rawInput: "",
};
