"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { pubApi } from "@/lib/axios";
import type { ResumeBuilderSchema } from "@/schemas/resume-builder";
import { CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { EnhanceWithAiButton, TextAreaField } from "../common";
import { useState } from "react";
import { generateApi } from "@/utils/services";

const PersonalInformationCard = ({ className }: { className?: string }) => {
  const { control, getValues, setValue } =
    useFormContext<ResumeBuilderSchema>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEnhanceWithAI = async () => {
    setIsSubmitting(true);

    const expData = getValues("personalInformation");

    try {
      const {
        data: { responseText },
      } = await generateApi<{ responseText: string }>({
        prompt: `
                    Kamu adalah seorang ahli penulis Resume (CV) kelas dunia.
                    
                    Berikut adalah data kandidat:
                    - Nama: ${expData.fullName}
                    - Posisi / Profesional Identity: ${expData.job}
                    
                    Tolong ubah draf kasar profil berikut menjadi sebuah 'Professional Summary' (Ringkasan Profil) yang sangat profesional, berdampak (impactful), dan ATS-friendly.
                    
                    Draf profil: "${expData.describeProfile}"

                    ATURAN PENTING:
                    1. Jadikan HANYA 1 PARAGRAF UTUH (sekitar 3-4 kalimat padat yang menyoroti keahlian dan nilai jual kandidat sebagai seorang ${expData.job}).
                    2. JANGAN gunakan karakter enter (\\n), bullet, strip (-), atau nomor sama sekali di dalam teks.
                    3. Gunakan sudut pandang orang pertama tersirat (mulai kalimat langsung dengan action verbs atau kata benda, contoh: "Profesional ${expData.job} dengan rekam jejak...", jangan pakai kata "Saya").
                    4. DILARANG memasukkan email, nomor telepon, atau link LinkedIn ke dalam paragraf ini. Fokus pada karir dan keahlian saja.

                    Kembalikan HANYA dalam format JSON persis seperti ini: {"summary": "hasil ringkasan profilnya"} 
                    tanpa tambahan teks atau markdown backticks apapun.
                `,
      });

      const summary: string = JSON.parse(responseText)["summary"];

      setIsSuccess(true);

      setValue(`personalInformation.describeProfile`, summary);

      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (err: unknown) {
      console.error("Unexpected error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputProperties = [
    {
      name: "fullName",
      label: "Nama Lengkap",
      htmlFor: "fullnameInput",
      placeholder: "Dill doe",
    },
    {
      name: "job",
      label: "Posisi Pekerjaan",
      htmlFor: "jobInput",
      placeholder: "data analyst",
    },
    {
      name: "email",
      label: "Email",
      htmlFor: "emailInput",
      placeholder: "dill.doe@email.com",
    },
    {
      name: "number",
      label: "Nomor Telepon",
      htmlFor: "numberInput",
      placeholder: "+62 123-4567-8910",
    },
    {
      name: "linkedinProfile",
      label: "Profil Linkedin",
      htmlFor: "linkedinInput",
      placeholder: "dill doe",
    },
  ] as const;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex flex-row gap-x-3 justify-center">
          <User />
          Informasi Pribadi
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {inputProperties.map(({ name, label, htmlFor, placeholder }) => {
          return (
            <Controller
              key={name}
              name={`personalInformation.${name}`}
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
                  <Input
                    {...field}
                    id={htmlFor}
                    aria-invalid={fieldState.invalid}
                    placeholder={placeholder}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          );
        })}
        <TextAreaField
          control={control}
          className="w-full"
          label="Ringkasan Profil"
          name="personalInformation.describeProfile"
          htmlFor="personalInformationInput"
          placeholder="Pengalaman lebih dari 7 tahun dalam analitik lanjutan, business intelegence dan strategi data"
        />
        <EnhanceWithAiButton
          disabled={isSubmitting}
          isSuccess={isSuccess}
          isSubmitting={isSubmitting}
          onClick={() => handleEnhanceWithAI()}
        />
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
