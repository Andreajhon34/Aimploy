"use client";

import type { ResumeBuilderSchema } from "@/app/resume-builder/_schemas/resumeBuilderForm";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Wrench } from "lucide-react";
import { useState } from "react";
import { generateApi } from "@/utils/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditorField } from "@/app/resume-builder/[id]/_components/EditorField";
import { useSkillCard } from "@/app/resume-builder/[id]/_hooks/useSkillCard";
import { EnhanceWithAiButton } from "@/components/ui/EnhanceWithAiButton";

const SkillCard = () => {
  const { control, handleOnClick, isPending, isSuccess, tiptapRef } =
    useSkillCard();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-row gap-3 justify-center">
          <Wrench />
          Keahlian
        </CardTitle>
      </CardHeader>
      <CardContent>
        <EditorField
          ref={tiptapRef}
          name="skills"
          label="Tuliskan keahlian kamu di sini"
          control={control}
          placeholder="JavaScript, TypeScript, Python, SQL"
        />
        <EnhanceWithAiButton
          className="mt-3 w-full"
          isLoading={isPending}
          isSuccess={isSuccess}
          disabled={isPending}
          onClick={handleOnClick}
        />
      </CardContent>
    </Card>
  );
};

export default SkillCard;
