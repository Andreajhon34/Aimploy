"use client";

import { useEnhanceMutation } from "./useEnhanceMutation";
import { generateText } from "../_lib";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeBuilderSchema } from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";

export const useExperienceCard = () => {
  const { control, getValues, trigger } = useFormContext<ResumeBuilderSchema>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "experiences",
  });

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

  const handleOnClick = async (index: number) => {
    const isValid = await trigger([
      `experiences.${index}.company`,
      `experiences.${index}.endDate`,
      `experiences.${index}.position`,
      `experiences.${index}.startDate`,
      `experiences.${index}.jobDescription`,
    ]);

    if (!isValid) return;

    const { company, endDate, position, startDate, jobDescription } = getValues(
      `experiences.${index}`,
    );

    const prompt = `
Buat deskripsi pekerjaan untuk resume dalam format HTML bullet point.

Data:
- Perusahaan: ${company}
- Posisi: ${position}
- Periode: ${startDate} - ${endDate || "Sekarang"}
- Deskripsi awal dari kandidat: "${jobDescription || "[KOSONG]"}"

Instruksi:
1. Periksa "Deskripsi awal dari kandidat".
   - Jika isinya "[KOSONG]" atau kosong, BUAT 3-4 bullet point baru dari nol berdasarkan Perusahaan dan Posisi.
   - Jika ada isi, PERBAGUS dan PERBAIKI kalimatnya. JANGAN mengarang tugas/metrik baru yang tidak ada di teks asli. Cukup perbaiki struktur, tata bahasa, dan pakai action verb yang lebih kuat.

2. Aturan output:
   - Tulis dari sudut pandang orang pertama. Pakai "Saya".
   - Gunakan format <ul><li> saja. Jangan pakai <p>.
   - Mulai tiap bullet dengan action verb kuat: Mengembangkan, Meningkatkan, Mengelola, Menyelesaikan, Membangun.
   - Fokus ke hasil dan dampak. Tambahkan angka/metrik HANYA jika ada di teks asli.
   - 1 bullet = 1 kalimat. Maksimal 120 karakter per bullet.
   - Maksimal 4 bullet point.
   - Output HANYA HTML. Jangan pakai <html>, <body>, <div>, class, style, markdown.
   - Jangan mengarang data baru. Kalau info kurang, buat bullet general yang relevan dengan posisi.

Contoh input kosong:
Output: <ul><li>Mengembangkan aplikasi web menggunakan React dan TypeScript</li><li>Berkolaborasi dengan tim desain untuk implementasi UI/UX</li></ul>

Contoh input ada isi "bikin website, meeting klien":
Output: <ul><li>Mengembangkan dan memelihara website perusahaan untuk meningkatkan pengalaman pengguna</li><li>Berkomunikasi dengan klien untuk memahami kebutuhan dan memastikan deliverable sesuai target</li></ul>
`;

    mutate(prompt);
  };

  return { control, fields, handleOnClick, remove, append, ...props };
};
