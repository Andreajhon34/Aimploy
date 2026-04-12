import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(2, "Nama terlalu pendek"),
  job: z.string().min(2, "Pekerjaan harus diisi"),
  email: z.string().email("Format email salah"),
  number: z.string().min(10, "Nomor telepon tidak valid"),
  describeProfile: z.string(),
  linkedinProfile: z.string().min(2, "Profil terlalu pendek").or(z.literal("")),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Nama perusahaan wajib diisi"),
  position: z.string().min(1, "Posisi wajib diisi"),
  startDate: z.string(),
  endDate: z.string(),
  jobDescription: z.string(),
});

export const eduationSchema = z.object({
  id: z.string(),
  institute: z.string().min(1, "Nama sekolah/kampus wajib diisi"),
  degree: z.string().min(1, "Gelar atau jenjang pendidikan wajib diisi"),
  startYear: z.string().min(4, "Tahun mulai tidak valid"),
  endYear: z.string(),
  description: z.string(),
});

const SkillCategorySchema = z.object({
  category: z.string(),
  items: z.array(z.string()),
});

export const skillsSchema = z.object({
  rawInput: z.string(),
  categorized: z.array(SkillCategorySchema),
});

export const resumeBuilderSchema = z.object({
  personalInformation: personalInformationSchema,
  experiences: z.array(experienceSchema).min(1, "Pengalaman kerja wajib diisi"),
  educations: z.array(eduationSchema).min(1, "Pendidikan wajib diisi"),
  skills: skillsSchema,
});

export type PersonalInformationSchema = z.infer<
  typeof personalInformationSchema
>;
export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type EducationSchema = z.infer<typeof eduationSchema>;
export type ResumeBuilderSchema = z.infer<typeof resumeBuilderSchema>;
export type SkillsSchema = z.infer<typeof skillsSchema>;
