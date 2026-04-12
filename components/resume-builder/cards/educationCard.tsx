"use client";

import {
  CardBase,
  CardField,
  DynamicFields,
  EnhanceWithAiButton,
  TextAreaField,
} from "../common";
import type { ResumeBuilderSchema } from "@/schemas/resume-builder";
import { Plus, Trash } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import type { EducationSchema } from "@/schemas/resume-builder";
import { GraduationCap } from "lucide-react";
import { EDUCATION_DEFAULT } from "@/utils/constants/resumeBuilder";
import { Sparkle } from "lucide-react";
import { AddButton } from "../common";
import { DynamicHoleKind } from "next/dist/server/app-render/dynamic-rendering";
import { generateApi } from "@/utils/services";

const EducationCard = () => {
  const { control, setValue, getValues } =
    useFormContext<ResumeBuilderSchema>();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "educations",
  });
  const [isSubmitting, setIsSubmitting] = useState<Record<number, boolean>>({});
  const [isSuccess, setIsSuccess] = useState<Record<number, boolean>>({});

  const handleEnhanceWithAI = async (idx: number) => {
    setIsSubmitting((prev) => ({ ...prev, [idx]: true }));

    const expData = getValues(`educations.${idx}`);

    try {
      setIsSuccess((prev) => ({ ...prev, [idx]: true }));

      const {
        data: { responseText },
      } = await generateApi<{ responseText: string }>({
        prompt: `
                Kamu adalah seorang ahli penulis Resume (CV) profesional.
                
                Berikut adalah latar belakang pendidikan kandidat:
                - Gelar & Jurusan: ${expData.degree} ${expData.degree} // (Misal: S1 Teknik Informatika)
                - Institusi: ${expData.institute} // (Misal: Universitas Indonesia)
                - Durasi pendidikan yakni: ${expData.startYear} hingga ${expData.endYear}
                
                Tolong ubah catatan/deskripsi pendidikan saya berikut ini menjadi 2-3 poin pencapaian akademik atau aktivitas kampus yang profesional, terstruktur, dan ATS-friendly.
                
                Catatan kasar saya: "${expData.description}"

                ATURAN PENTING: 
                1. Fokus merapikan info seperti topik tugas akhir, IPK, beasiswa, mata kuliah relevan, atau organisasi. Jika catatannya sangat singkat, kembangkan sedikit dengan bahasa yang akademis namun tetap relevan dengan jurusannya.
                2. Pisahkan setiap poin HANYA dengan karakter enter (\\n).
                3. JANGAN gunakan karakter bullet, strip (-), nomor, atau titik di awal kalimat.

                Kembalikan HANYA dalam format JSON persis seperti ini: {"description": "hasil poin-poinnya"} 
                tanpa tambahan teks apapun.
            `,
      });

      const description: string = JSON.parse(responseText)["description"];

      setValue(`educations.${idx}.description`, description);

      setTimeout(() => {
        setIsSuccess((prev) => ({ ...prev, [idx]: false }));
      }, 2000);
    } catch (err: unknown) {
      console.error("Unexpected error:", err);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [idx]: false }));
    }
  };

  type InputProperties = {
    readonly htmlFor: string;
    readonly label: string;
    readonly name: keyof EducationSchema;
    readonly placeholder?: string;
    readonly className: HTMLAttributes<HTMLDivElement>["className"];
  };

  const inputProperties: ReadonlyArray<InputProperties> = [
    {
      htmlFor: "instituteInput",
      label: "Instusi / Sekolah",
      name: "institute",
      className: "col-span-1",
      placeholder: "Institut Teknologi Bandung",
    },
    {
      htmlFor: "degreeInput",
      label: "Gelar / Sarjana",
      name: "degree",
      className: "col-span-1",
      placeholder: "Teknik Informatika",
    },
    {
      htmlFor: "startYearInput",
      label: "Tanggal Mulai",
      name: "startYear",
      className: "col-span-1",
      placeholder: "Sept 2019",
    },
    {
      htmlFor: "endYearInput",
      label: "Tanggal Selesai",
      name: "endYear",
      className: "col-span-1",
      placeholder: "May 2023",
    },
  ];

  return (
    <CardBase
      title={
        <>
          <GraduationCap />
          Pendidikan
        </>
      }
    >
      {fields.map((field, index) => (
        <CardField key={field.id} onRemove={() => remove(index)}>
          {inputProperties.map(
            ({ htmlFor, className, label, name, placeholder }) => (
              <DynamicFields
                key={htmlFor}
                control={control}
                htmlFor={htmlFor}
                label={label}
                name={`educations.${index}.${name}`}
                className={className}
                placeholder={placeholder}
              />
            ),
          )}
          <TextAreaField
            control={control}
            name={`educations.${index}.description`}
            label="Deskripsi / Catatan Tambahan"
            htmlFor="eduDescriptionInput"
            className="col-span-2"
            placeholder="Cum laude dengan IPK 3.85, penerima beasiswa unggulan selama 4 tahun."
          />
          <EnhanceWithAiButton
            disabled={isSubmitting[index]}
            onClick={() => handleEnhanceWithAI(index)}
            isSubmitting={isSubmitting[index]}
            isSuccess={isSuccess[index]}
          />
        </CardField>
      ))}
      <AddButton
        onClick={() =>
          append({ ...EDUCATION_DEFAULT, id: crypto.randomUUID() })
        }
      />
    </CardBase>
  );
};

export default EducationCard;
