"use client";

import { CardBase, EnhanceWithAiButton, TextAreaField } from "../common";
import type { ResumeBuilderSchema } from "@/schemas/resume-builder";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Wrench } from "lucide-react";
import { useState } from "react";
import { generateApi } from "@/utils/services";

const SkillCard = () => {
  const { control, getValues, setValue } =
    useFormContext<ResumeBuilderSchema>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEnhanceWithAI = async () => {
    setIsSubmitting(true);

    const rawSkills = getValues("skills.rawInput");

    try {
      const {
        data: { responseText },
      } = await generateApi<{ responseText: string }>({
        prompt: `
                    Kelompokkan daftar keahlian berikut menjadi maksimal 3 kategori profesional 
                    (misal: 'Keahlian Teknis', 'Soft Skills', 'Bahasa', atau 'Tools').
                    
                    Daftar keahlian: "${rawSkills}"

                    Kembalikan HANYA format JSON persis seperti ini: 
                    {"skills": [ {"category": "Keahlian Teknis", "items": ["React", "Node.js"]} ] } 
                    tanpa tambahan markdown.
                `,
      });

      const result = JSON.parse(responseText);

      setValue("skills.categorized", result.skills);

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("Error AI Skills:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardBase
      title={
        <>
          <Wrench />
          Keahlian
        </>
      }
    >
      <TextAreaField
        control={control}
        label="Tuliskan keahlian kamu di sini"
        name="skills.rawInput"
        htmlFor="skillsInput"
        placeholder="JavaScript, TypeScript, Python, SQL"
      />
      <EnhanceWithAiButton
        disabled={isSubmitting}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
        onClick={() => handleEnhanceWithAI()}
      />
    </CardBase>
  );
};

export default SkillCard;
