"use client";

import { Resume } from "@/app/_types/resume";
import { CoverLetterPreview } from "./CoverLetterPreview";

type CoverLetterPreviewClientProps = {
  coverLetterContent: string;
  selectedResume: Resume;
};

export function CoverLetterPreviewClient({
  coverLetterContent,
  selectedResume,
}: CoverLetterPreviewClientProps) {
  return (
    <CoverLetterPreview
      content={coverLetterContent}
      personalInfo={{
        fullName: selectedResume.content.personalInformation.fullName,
        email: selectedResume.content.personalInformation.email,
        phone: selectedResume.content.personalInformation.number,
      }}
    />
  );
}
