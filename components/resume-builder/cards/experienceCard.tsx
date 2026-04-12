"use client";

import { Briefcase, Plus, Trash, Sparkle, Check } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { pubApi } from "@/lib/axios";
import { HTMLAttributes } from "react";
import {
  AddButton,
  CardBase,
  CardField,
  DynamicFields,
  EnhanceWithAiButton,
  TextAreaField,
} from "../common";
import { cn } from "@/lib/utils";
import type {
  ExperienceSchema,
  ResumeBuilderSchema,
} from "@/schemas/resume-builder";
import { EXPERIENCE_DEFAULTS } from "@/utils/constants/resumeBuilder";
import { generateApi } from "@/utils/services";

const ExperienceCard = () => {
  const { control, getValues, setValue } =
    useFormContext<ResumeBuilderSchema>();
  const { append, remove, fields } = useFieldArray({
    control,
    name: "experiences",
  });
  const [isSubmitting, setIsSubmitting] = useState<Record<number, boolean>>({});
  const [isSuccess, setIsSuccess] = useState<Record<number, boolean>>({});

  const handleEnhanceWithAI = async (idx: number) => {
    setIsSubmitting((prev) => ({ ...prev, [idx]: true }));

    const expData = getValues(`experiences.${idx}`);

    try {
      const {
        data: { responseText },
      } = await generateApi<{ responseText: string }>({
        prompt: `
                    Saya bekerja sebagai ${expData.position} di perusahaan ${expData.company}.
                    Tolong ubah catatan pekerjaan saya berikut ini menjadi 2-3 poin pencapaian profesional 
                    yang menggunakan action verbs dan sangat ATS-friendly.
                    
                    Catatan pekerjaan saya: "${expData.jobDescription}"

                    ATURAN PENTING: 
                    1. Pisahkan setiap poin hanya dengan karakter enter (\\n).
                    2. JANGAN gunakan karakter bullet, strip (-), nomor, atau titik di awal kalimat.

                    Kembalikan HANYA dalam format JSON persis seperti ini: {"jobDescription": "hasil poin-poinnya"} 
                    tanpa tambahan teks apapun.
                `,
      });

      const jobDescription = JSON.parse(responseText)["jobDescription"];

      setIsSuccess((prev) => ({ ...prev, [idx]: true }));

      setValue(`experiences.${idx}.jobDescription`, jobDescription);

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
    htmlFor: string;
    label: string;
    name: keyof ExperienceSchema;
    placeholder?: string;
    className?: HTMLAttributes<HTMLDivElement>["className"];
  };

  const inputProperties: ReadonlyArray<Readonly<InputProperties>> = [
    {
      htmlFor: "companyInput",
      label: "Perusahaan",
      name: "company",
      className: "col-span-1",
      placeholder: "PT Teknologi Inovasi Nusantara",
    },
    {
      htmlFor: "positionInput",
      label: "Posisi",
      name: "position",
      className: "col-span-1",
      placeholder: "Senior data analyst",
    },
    {
      htmlFor: "startDateInput",
      label: "Tanggal Mulai",
      name: "startDate",
      className: "col-span-1",
      placeholder: "Jan 2021",
    },
    {
      htmlFor: "endDateInput",
      label: "Tanggal Selesai",
      name: "endDate",
      className: "col-span-1",
      placeholder: "hari ini",
    },
  ];

  return (
    <CardBase
      title={
        <>
          <Briefcase />
          Pengalaman kerja
        </>
      }
    >
      {fields.map((field, index) => {
        return (
          <CardField key={field.id} onRemove={() => remove(index)}>
            {inputProperties.map(
              ({ htmlFor, label, name, placeholder, className }) => (
                <DynamicFields
                  key={`${htmlFor}-${field.id}`}
                  placeholder={placeholder}
                  control={control}
                  htmlFor={htmlFor}
                  className={className}
                  label={label}
                  name={`experiences.${index}.${name}`}
                />
              ),
            )}
            <TextAreaField
              control={control}
              name={`experiences.${index}.jobDescription`}
              label="Deskripsi pekerjaan"
              htmlFor="jobDescInput"
              className="col-span-2"
              placeholder="Bertanggung jawab dalam pengumpulan, analisis, dan visualisasi data untuk mendukung keputusan bisnis serta memberikan insight strategis."
            />
            <EnhanceWithAiButton
              isSubmitting={isSubmitting[index]}
              disabled={isSubmitting[index]}
              isSuccess={isSuccess[index]}
              onClick={() => handleEnhanceWithAI(index)}
            />
          </CardField>
        );
      })}
      <AddButton
        onClick={() =>
          append({ ...EXPERIENCE_DEFAULTS, id: crypto.randomUUID() })
        }
      />
    </CardBase>
  );
};

export default ExperienceCard;
