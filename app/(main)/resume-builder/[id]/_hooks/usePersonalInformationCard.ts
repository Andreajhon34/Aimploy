"use client";

import {
  PersonalInformationSchema,
  ResumeBuilderSchema,
  personalInformationSchema,
} from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { useFormContext } from "react-hook-form";
import generateContent from "../_lib/generateContent";
import { useResumeMutationBase } from "./useResumeMutationBase";
import { ResumeBuilderDbSchema } from "../../_schemas/resumeBuilderDbForm";

const getPersonalInformationPrompt = ({
  describeProfile,
  email,
  fullName,
  job,
  linkedinProfile,
  location,
  number,
}: PersonalInformationSchema) => {
  return `
Buat ringkasan profil profesional 2-3 kalimat untuk bagian "Summary" di resume.

Data kandidat:
- Nama: ${fullName}
- Posisi: ${job}
- Lokasi: ${location}
- LinkedIn: ${linkedinProfile}
- Ringkasan awal dari kandidat: "${describeProfile}"
- Email: ${email}
- Number: ${number}

Instruksi:
1. Cek "Ringkasan awal dari kandidat":
   - Jika "[KOSONG]", BUAT 2-3 kalimat baru dari nol berdasarkan data di atas.
   - Jika ada isi, PERBAGUS dan PERAPIH kalimatnya. JANGAN mengarang pengalaman, skill, atau tahun pengalaman baru. Cukup perbaiki struktur, tata bahasa, dan pakai kata yang lebih profesional.

2. Aturan output:
   - Tulis dari sudut pandang orang pertama, pakai "Saya". Jangan orang ketiga.
   - Fokus ke value proposition: pengalaman inti, skill utama, hasil yang relevan dengan posisi ${job}.
   - JANGAN mengulang email dan nomor telepon di output. Data itu hanya untuk konteks.
   - Output HANYA HTML: <p>Saya <strong>Posisi</strong> dengan X tahun pengalaman...</p>
   - Maksimal 3 kalimat, total <250 karakter.

Contoh input kosong:
Output: <p>Saya <strong>Frontend Developer</strong> dengan 3 tahun pengalaman membangun aplikasi web responsif. Terbiasa bekerja dengan React, TypeScript, dan metodologi Agile.</p>

Contoh input ada isi "saya dev, suka coding, 3 tahun":
Output: <p>Saya <strong>Frontend Developer</strong> dengan 3 tahun pengalaman mengembangkan aplikasi web. Mahir menggunakan React dan TypeScript untuk membangun UI yang responsif dan maintainable.</p>
`;
};

export const usePersonalInformationCard = () => {
  const { control, getValues, setError } =
    useFormContext<ResumeBuilderDbSchema>();

  const { mutate, ...props } = useResumeMutationBase({
    mutationFn: generateContent,
    onSuccess: (outputText) => {
      props.tiptapRef.current?.editor
        ?.chain()
        .focus()
        .setContent(outputText)
        .run();
    },
  });

  const handleOnClick = async () => {
    const {
      fullName,
      job,
      email,
      number,
      location,
      linkedinProfile,
      describeProfile,
    } = getValues("personalInformation");

    const zodResult = personalInformationSchema.safeParse({
      fullName,
      job,
      email,
      number,
      linkedinProfile,
      describeProfile,
      location,
    });

    if (!zodResult.success) {
      zodResult.error.issues.forEach((issue) => {
        const subFieldName = issue.path.join(".");

        setError(
          `personalInformation.${subFieldName as keyof PersonalInformationSchema}`,
          {
            type: "aiValidation",
            message: issue.message,
          },
        );
      });

      return;
    }

    mutate({ text: getPersonalInformationPrompt(zodResult.data) });
  };

  return { control, handleOnClick, ...props };
};
