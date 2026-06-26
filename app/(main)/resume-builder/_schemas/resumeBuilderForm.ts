import { z } from "zod";

export const personalInformationSchema = z.object({
  fullName: z.string().min(2, "Nama terlalu pendek"),
  job: z.string().min(2, "Pekerjaan harus diisi"),
  email: z.string().email("Format email salah"),
  number: z.string().min(10, "Nomor telepon tidak valid"),
  location: z.string().min(2, "Lokasi wajib diisi"),
  describeProfile: z.string().default("[EMPTY]"),
  linkedinProfile: z.string().default("[EMPTY]"),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(4, "Nama perusahaan wajib minimal 4 karakter"),
  position: z.string().min(5, "Posisi wajib minimal 5 karakter"),
  startDate: z.string().min(5, "Tahun mulai wajib minimal 6 karakter"),
  endDate: z.string().min(5, "Tahun selesai wajib minimal 6 karakter"),
  jobDescription: z.string().default("[EMPTY]"),
});

export const educationSchema = z.object({
  id: z.string(),
  institute: z
    .string()
    .min(5, "Nama institut wajib terdiri dari minimal 5 karakter"),
  degree: z
    .string()
    .min(
      5,
      "Gelar atau Jenjang pendidikan wajib terdiri dari minimal 5 karakter",
    ),
  startYear: z.coerce
    .number({
      message: "Tahun mulai wajib berupa angka",
    })
    .int({ message: "Tahun mulai wajib berupa bilangan bulat" }),
  endYear: z.coerce
    .number({
      message: "Tahun selesai wajib berupa angka",
    })
    .int("Tahun selesai wajib berupa bilangan bulat"),
  description: z.string().default("[EMPTY]"),
});

export const skillsSchema = z.string().min(2, "skills wajib diisi");

export const resumeBuilderSchema = z.object({
  personalInformation: personalInformationSchema,
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  skills: skillsSchema,
});

export type PersonalInformationSchema = z.infer<
  typeof personalInformationSchema
>;

export type ExperienceSchema = z.infer<typeof experienceSchema>;
export type EducationSchema = z.infer<typeof educationSchema>;
export type ResumeBuilderSchema = z.infer<typeof resumeBuilderSchema>;
