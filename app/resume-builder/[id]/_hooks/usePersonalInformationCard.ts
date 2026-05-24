"use client";

import { ResumeBuilderSchema } from "@/app/resume-builder/_schemas/resumeBuilderForm";
import { useFormContext } from "react-hook-form";
import { useEnhanceMutation } from "./useEnhanceMutation";
import { generateText } from "../_lib";

export const usePersonalInformationCard = () => {
  const { control, getValues, trigger } = useFormContext<ResumeBuilderSchema>();

  const { mutate, ...props } = useEnhanceMutation({
    onMutation: generateText,
    onSuccess: (outputText) => {
      props.tiptapRef.current?.editor
        ?.chain()
        .focus()
        .setContent(outputText)
        .run();
    },
  });

  const handleOnClick = async () => {
    const isValid = await trigger([
      "personalInformation.fullName",
      "personalInformation.job",
      "personalInformation.email",
      "personalInformation.number",
    ]);

    if (!isValid) return;

    const { fullName, job, email, number, linkedinProfile, describeProfile } =
      getValues("personalInformation");

    const prompt = `
Buat ringkasan profil profesional 2-3 kalimat untuk bagian "Summary" di resume.

Data kandidat:
- Nama: ${fullName}
- Posisi: ${job}
- LinkedIn: ${linkedinProfile || "[KOSING]"}
- Ringkasan awal dari kandidat: "${describeProfile || "[KOSONG]"}"
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

    mutate(prompt);
  };

  return { control, handleOnClick, ...props };
};
