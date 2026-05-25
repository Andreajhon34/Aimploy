"use client";

import { EditorField } from "@/app/(main)/resume-builder/[id]/_components/EditorField";
import { InputField } from "@/app/(main)/resume-builder/[id]/_components/InputField";
import { usePersonalInformationCard } from "@/app/(main)/resume-builder/[id]/_hooks/usePersonalInformationCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhanceWithAiButton } from "@/components/ui/EnhanceWithAiButton";
import type { ResumeBuilderSchema } from "@/app/(main)/resume-builder/_schemas/resumeBuilderForm";
import { User } from "lucide-react";
import { InputProperties } from "../_types/inputProperties";

const PersonalInformationCard = ({ className }: { className?: string }) => {
  const { control, handleOnClick, tiptapRef, isPending, isSuccess } =
    usePersonalInformationCard();

  const inputProperties: InputProperties<
    ResumeBuilderSchema["personalInformation"]
  >[] = [
    {
      name: "fullName",
      label: "Nama Lengkap",
      placeholder: "Dill doe",
      className: "col-span-1",
    },
    {
      name: "job",
      label: "Posisi Pekerjaan",
      placeholder: "data analyst",
      className: "col-span-1",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "dill.doe@email.com",
      className: "col-span-1",
    },
    {
      name: "number",
      label: "Nomor Telepon",
      placeholder: "+62 123-4567-8910",
      className: "col-span-1",
    },
    {
      name: "linkedinProfile",
      label: "Profil Linkedin",
      placeholder: "dill doe",
      className: "col-span-1",
    },
    {
      name: "location",
      label: "Lokasi",
      placeholder: "Jakarta Pusat, Indonesia",
      className: "col-span-1",
    },
    {
      name: "describeProfile",
      label: "Ringkasan Profil",
      placeholder: "Enter your summary...",
      className: "col-span-2",
    },
  ] as const;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex flex-row gap-3 justify-center">
          <User />
          Informasi Pribadi
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {inputProperties.map(
          ({ name, label, placeholder, className }, index) => {
            return index != inputProperties.length - 1 ? (
              <InputField
                key={name}
                name={`personalInformation.${name}`}
                control={control}
                label={label}
                placeholder={placeholder}
                className={className}
              />
            ) : (
              <EditorField
                ref={tiptapRef}
                key={name}
                name="personalInformation.describeProfile"
                control={control}
                label="Ringkasan profil"
                className={className}
              />
            );
          },
        )}
        <EnhanceWithAiButton
          disabled={isPending}
          isSuccess={isSuccess}
          isLoading={isPending}
          onClick={handleOnClick}
        />
      </CardContent>
    </Card>
  );
};

export default PersonalInformationCard;
