"use client";

import { EditorField } from "@/app/(main)/resume-builder/[id]/_components/EditorField";
import { useSkillCard } from "@/app/(main)/resume-builder/[id]/_hooks/useSkillCard";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { Button } from "@/components/ui/button";
import { EnhanceWithAiButton } from "@/components/ui/EnhanceWithAiButton";
import { Sparkle, Square } from "lucide-react";

const SkillCard = () => {
  const {
    control,
    handleOnClick,
    isPending,
    isSuccess,
    tiptapRef,
    handleOnCancle,
  } = useSkillCard();

  return (
    <div className="flex flex-col px-2.5 mt-3 gap-2">
      <EditorField
        ref={tiptapRef}
        name="skills"
        label="Tuliskan keahlian kamu di sini"
        control={control}
        placeholder="JavaScript, TypeScript, Python, SQL"
      />
      {!isPending ? (
        <SlideTextButton
          type="button"
          className="w-full text-center"
          onClick={() => handleOnClick()}
          text={<Sparkle />}
          hoverText={
            <>
              Generate with <span className="font-bold">Aimploy</span>
            </>
          }
          disabled={isPending}
        />
      ) : (
        <Button className="w-full" onClick={handleOnCancle} type="button">
          <Square />
          <span className="sr-only">pause</span>
        </Button>
      )}
    </div>
  );
};

export default SkillCard;
