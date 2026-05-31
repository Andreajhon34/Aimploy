"use client";

import {
  ResumeBuilderSchema,
  skillsSchema,
} from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { useFormContext } from "react-hook-form";
import { generateText } from "../_lib/generateText";
import { useEnhanceMutation } from "./useEnhanceMutation";

export const useSkillCard = () => {
  const { control, getValues, setError } =
    useFormContext<ResumeBuilderSchema>();
  const enhanceMutation = useEnhanceMutation({
    onMutation: generateText,
    onSuccess: (outputText) => {
      enhanceMutation.tiptapRef.current?.editor
        ?.chain()
        .focus()
        .setContent(outputText)
        .run();
    },
  });

  const handleOnClick = async () => {
    const rawSkills = getValues("skills");

    const zodResult = skillsSchema.safeParse(rawSkills);

    if (!zodResult.success) {
      zodResult.error.issues.forEach((issue) => {
        const subFieldName = issue.path.join(".");
        setError(`skills`, {
          type: "aiValidation",
          message: issue.message,
        });
      });

      return;
    }

    const prompt = `
Rapikan dan kelompokkan daftar keahlian berikut untuk bagian Skills di resume.

Input user: "${rawSkills}"

Aturan:
1. Hanya rapikan dan kelompokkan skill yang ada di input. JANGAN menambahkan, menghapus, atau mengarang skill baru.
2. Kelompokkan skill yang mirip jadi 2-4 kategori. Contoh: "Frontend", "Backend", "Tools", "Soft Skill", "Bahasa".
3. Hapus duplikat dan perbaiki typo. 
   Contoh: "js, javascript" jadi "JavaScript". "reactjs" jadi "React".
4. Hapus skill yang terlalu umum seperti "Microsoft Office", "Email", "Internet" kecuali user menulisnya secara eksplisit.
5. Urutkan skill dari yang paling relevan/umum dipakai ke yang niche dalam tiap kategori.

Format output:
- Output HANYA HTML: <p><strong>Kategori:</strong> Skill 1, Skill 2, Skill 3</p>
- Jangan pakai <ul><li>, <div>, <html>, <body>, class, style, markdown.
- Maksimal 4 baris. Tiap baris maksimal 120 karakter.

Contoh input:
"react, js, tailwind, git, komunikasi, react"

Contoh output:
<p><strong>Frontend:</strong> React, JavaScript, Tailwind CSS</p>
<p><strong>Tools:</strong> Git</p>
<p><strong>Soft Skill:</strong> Komunikasi</p>
`;

    enhanceMutation.mutate(prompt);
  };

  return { control, handleOnClick, ...enhanceMutation };
};
