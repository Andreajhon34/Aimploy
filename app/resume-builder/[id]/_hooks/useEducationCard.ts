"use client";

import { useEnhanceMutation } from "./useEnhanceMutation";
import { generateText } from "../_lib";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeBuilderSchema } from "@/app/resume-builder/_schemas/resumeBuilderForm";

export const useEducationCard = () => {
  const { control, getValues, trigger } = useFormContext<ResumeBuilderSchema>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "educations",
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
      `educations.${index}.startYear`,
      `educations.${index}.degree`,
      `educations.${index}.endYear`,
      `educations.${index}.institute`,
    ]);
    if (!isValid) return;

    const { degree, endYear, institute, startYear, description } = getValues(
      `educations.${index}`,
    );

    const prompt = `
Buat 1-2 kalimat deskripsi pendidikan untuk resume.

Data:
- Institusi: ${institute}
- Gelar/Jurusan: ${degree}
- Tahun: ${startYear} - ${endYear || "Sekarang"}
- Deskripsi awal dari kandidat: "${description || "[KOSONG]"}"

Instruksi:
1. Cek "Deskripsi awal dari kandidat":
   - Jika "[KOSONG]", BUAT 1-2 kalimat baru dari nol berdasarkan data di atas.
   - Jika ada isi, PERBAGUS dan PERAPIH kalimatnya. JANGAN mengarang prestasi, IPK, atau proyek baru. Cukup perbaiki struktur, tata bahasa, dan pakai kata yang lebih profesional.

2. Aturan output:
   - Tulis dari sudut pandang orang pertama, pakai "Saya". Jangan orang ketiga.
   - Fokus ke hal relevan: prestasi, IPK >=3.5, mata kuliah utama, proyek akhir, organisasi, skill.
   - Gaya profesional, langsung ke poin. Tanpa pembuka "Saya adalah".
   - Output HANYA HTML: pakai tag <p> dan <strong> saja. Jangan pakai <html>, <body>, <div>, markdown, class.
   - Maksimal 2 kalimat, total <200 karakter.
   - Jangan mengarang data yang tidak ada di input. Kalau data kosong, lewati.

Contoh input kosong:
Output: <p>Lulus <strong>S1 Teknik Informatika</strong>. Fokus pada pengembangan web dan basis data.</p>

Contoh input ada isi "kuliah di ui, ipk 3.8, skripsi ai":
Output: <p>Lulus <strong>S1 Ilmu Komputer</strong> dengan IPK 3.8. Skripsi tentang implementasi AI untuk klasifikasi gambar.</p>
`;
    mutate(prompt);
  };

  return { control, fields, handleOnClick, remove, append, ...props };
};
