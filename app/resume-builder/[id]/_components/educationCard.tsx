"use client";

import { EditorField } from "@/app/resume-builder/[id]/_components/EditorField";
import { InputField } from "@/app/resume-builder/[id]/_components/InputField";
import { useEducationCard } from "@/app/resume-builder/[id]/_hooks/useEducationCard";
import { InputProperties } from "@/app/resume-builder/[id]/_types/inputProperties";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnhanceWithAiButton } from "@/components/ui/EnhanceWithAiButton";
import type {
  EducationSchema,
  ResumeBuilderSchema,
} from "@/app/resume-builder/_schemas/resumeBuilderForm";
import { GraduationCap, Plus, Trash } from "lucide-react";

export const EDUCATION_DEFAULT: EducationSchema = {
  id: crypto.randomUUID(),
  degree: "",
  endYear: "Sekarang",
  institute: "",
  startYear: "",
  description: "",
};

const EducationCard = () => {
  const {
    control,
    handleOnClick,
    isPending,
    isSuccess,
    fields,
    remove,
    append,
    tiptapRef,
  } = useEducationCard();

  const inputProperties: InputProperties<
    ResumeBuilderSchema["educations"][number]
  >[] = [
    {
      label: "Instusi / Sekolah",
      name: "institute",
      className: "col-span-1",
      placeholder: "Institut Teknologi Bandung",
    },
    {
      label: "Gelar / Sarjana",
      name: "degree",
      className: "col-span-1",
      placeholder: "Teknik Informatika",
    },
    {
      label: "Tanggal Mulai",
      name: "startYear",
      className: "col-span-1",
      placeholder: "Sept 2019",
    },
    {
      label: "Tanggal Selesai",
      name: "endYear",
      className: "col-span-1",
      placeholder: "May 2023",
    },
    {
      label: "Deskripsi / Catatan Tambahan",
      name: "description",
      className: "col-span-2",
      placeholder:
        "Cum laude dengan IPK 3.85, penerima beasiswa unggulan selama 4 tahun.",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-3 justify-center">
          <GraduationCap />
          Pendidikan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {fields.map((_, index) => (
          <Card>
            <CardHeader>
              <CardAction>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {inputProperties.map(
                ({ className, label, name, placeholder }, fieldIndex) =>
                  fieldIndex !== inputProperties.length - 1 ? (
                    <InputField
                      label={label}
                      className={className}
                      name={`educations.${index}.${name}`}
                      control={control}
                      placeholder={placeholder}
                    />
                  ) : (
                    <EditorField
                      ref={tiptapRef}
                      label={label}
                      className={className}
                      control={control}
                      name={`educations.${index}.${name}`}
                      placeholder={placeholder}
                    />
                  ),
              )}
              <EnhanceWithAiButton
                isLoading={isPending}
                isSuccess={isSuccess}
                disabled={isPending}
                onClick={() => handleOnClick(index)}
              />
            </CardContent>
          </Card>
        ))}
        <Button
          onClick={() =>
            append({ ...EDUCATION_DEFAULT, id: crypto.randomUUID() })
          }
          type="button"
          className="w-full"
        >
          <Plus />
          Tambah
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
