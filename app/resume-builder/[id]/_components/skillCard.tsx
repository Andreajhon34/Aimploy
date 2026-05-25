"use client";

import { EditorField } from "@/app/resume-builder/[id]/_components/EditorField";
import { useSkillCard } from "@/app/resume-builder/[id]/_hooks/useSkillCard";
import { EnhanceWithAiButton } from "@/components/ui/EnhanceWithAiButton";

const SkillCard = () => {
  const { control, handleOnClick, isPending, isSuccess, tiptapRef } =
    useSkillCard();

  return (
    <div className="flex flex-col px-2.5 mt-3">
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
    </div>
  );
};

export default SkillCard;
