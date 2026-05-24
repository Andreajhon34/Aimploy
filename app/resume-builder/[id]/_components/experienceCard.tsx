"use client";

import { EditorField } from "@/app/resume-builder/[id]/_components/EditorField";
import { InputField } from "@/app/resume-builder/[id]/_components/InputField";
import { useExperienceCard } from "@/app/resume-builder/[id]/_hooks/useExperienceCard";
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
import type { ResumeBuilderSchema } from "@/app/resume-builder/_schemas/resumeBuilderForm";
import { Briefcase, Plus, Trash } from "lucide-react";
import { ExperienceSchema } from "@/app/resume-builder/_schemas/resumeBuilderForm";

const EXPERIENCE_DEFAULTS: ExperienceSchema = {
  id: crypto.randomUUID(),
  company: "",
  endDate: "Sekarang",
  position: "",
  startDate: "",
  jobDescription: "",
};

const ExperienceCard = () => {
  const {
    control,
    handleOnClick,
    isPending,
    isSuccess,
    fields,
    remove,
    append,
    tiptapRef,
  } = useExperienceCard();

  const inputProperties: InputProperties<
    ResumeBuilderSchema["experiences"][number]
  >[] = [
    {
      label: "Perusahaan",
      name: "company",
      className: "col-span-1",
      placeholder: "PT Teknologi Inovasi Nusantara",
    },
    {
      label: "Posisi",
      name: "position",
      className: "col-span-1",
      placeholder: "Senior data analyst",
    },
    {
      label: "Tanggal Mulai",
      name: "startDate",
      className: "col-span-1",
      placeholder: "Jan 2021",
    },
    {
      label: "Tanggal Selesai",
      name: "endDate",
      className: "col-span-1",
      placeholder: "hari ini",
    },
    {
      label: "Deskripsi pekerjaan",
      name: "jobDescription",
      className: "col-span-2",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-3 justify-center">
          <Briefcase />
          Pengalaman kerja
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
                      name={`experiences.${index}.${name}`}
                      control={control}
                      placeholder={placeholder}
                    />
                  ) : (
                    <EditorField
                      ref={tiptapRef}
                      label={label}
                      className={className}
                      control={control}
                      name={`experiences.${index}.${name}`}
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
            append({ ...EXPERIENCE_DEFAULTS, id: crypto.randomUUID() })
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

export default ExperienceCard;
