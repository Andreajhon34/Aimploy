import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(2, "Nama terlalu pendek"),
  job: z.string().min(2, "Pekerjaan harus diisi"),
  email: z.string().email("Format email salah"),
  number: z.string().min(10, "Nomor telepon tidak valid"),
  location: z.string().min(2, "Lokasi wajib diisi"),
  describeProfile: z.string(),
  linkedinProfile: z.string(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, "Nama perusahaan wajib diisi"),
  position: z.string().min(1, "Posisi wajib diisi"),
  startDate: z.string().min(1, "Tahun mulai wajib diisi"),
  endDate: z.string(),
  jobDescription: z.string(),
});

export const eduationSchema = z.object({
  id: z.string(),
  institute: z.string().min(1, "Nama sekolah/kampus wajib diisi"),
  degree: z.string().min(1, "Gelar atau jenjang pendidikan wajib diisi"),
  startYear: z.string().min(4, "Tahun mulai wajib diisi"),
  endYear: z.string(),
  description: z.string(),
});

export const skillsSchema = z.string().min(2, "skills wajib diisi");

export const resumeBuilderSchema = z.object({
  personalInformation: personalInformationSchema,
  experiences: z.array(experienceSchema),
  educations: z.array(eduationSchema),
  skills: skillsSchema,
});

export type PersonalInformationSchema = z.infer<
  typeof personalInformationSchema
>;

export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type EducationSchema = z.infer<typeof eduationSchema>;
export type ResumeBuilderSchema = z.infer<typeof resumeBuilderSchema>;
