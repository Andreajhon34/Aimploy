"use client";

import { EditorField } from "@/app/(main)/resume-builder/[id]/_components/EditorField";
import { InputField } from "@/app/(main)/resume-builder/[id]/_components/InputField";
import { useEducationCard } from "@/app/(main)/resume-builder/[id]/_hooks/useEducationCard";
import { InputProperties } from "@/app/(main)/resume-builder/[id]/_types/inputProperties";
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
} from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { GraduationCap, Plus, Sparkle, Square, Trash } from "lucide-react";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { EducationDbSchema } from "../../_schemas/resumeBuilderDbForm";

export const EDUCATION_DEFAULT: EducationDbSchema = {
  id: crypto.randomUUID(),
  degree: "",
  endYear: new Date().getFullYear().toString(),
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
    handleOnCancle,
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
      label: "Tahun Mulai",
      name: "startYear",
      className: "col-span-1",
      placeholder: "2019",
    },
    {
      label: "Tahun Selesai",
      name: "endYear",
      className: "col-span-1",
      placeholder: "2023",
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
      <CardContent className="flex flex-col gap-3">
        {fields.map((_, index) => (
          <Card key={index}>
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
                      key={name}
                      label={label}
                      className={className}
                      name={`educations.${index}.${name}`}
                      control={control}
                      placeholder={placeholder}
                    />
                  ) : (
                    <EditorField
                      key={name}
                      ref={tiptapRef}
                      label={label}
                      className={className}
                      control={control}
                      name={`educations.${index}.${name}`}
                      placeholder={placeholder}
                    />
                  ),
              )}
              <div className="col-span-2">
                {!isPending ? (
                  <SlideTextButton
                    type="button"
                    className="w-full text-center"
                    onClick={() => handleOnClick(index)}
                    text={<Sparkle />}
                    hoverText={
                      <>
                        Generate with <span className="font-bold">Aimploy</span>
                      </>
                    }
                    disabled={isPending}
                  />
                ) : (
                  <Button
                    className="w-full"
                    onClick={handleOnCancle}
                    type="button"
                  >
                    <Square />
                    <span className="sr-only">pause</span>
                  </Button>
                )}
              </div>
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
