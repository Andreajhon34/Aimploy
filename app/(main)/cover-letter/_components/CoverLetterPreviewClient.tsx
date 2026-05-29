"use client";

import { Resume } from "@/app/_types/resume";
import { CoverLetter } from "../_types/CoverLetter";
import { CoverLetterPreview } from "./CoverLetterPreview";
import React from "react";

type CoverLetterPreviewClientProps = {
  coverLetterContent: string;
  selectedResumeId: string;
  resumePromise: Promise<Array<Resume & { createdAt: Date }>>;
};

export function CoverLetterPreviewClient({
  coverLetterContent,
  selectedResumeId,
  resumePromise,
}: CoverLetterPreviewClientProps) {
  const resumes = React.use(resumePromise);
  const selectedResume = resumes.find(
    ({ resumeId }) => resumeId === selectedResumeId,
  );

  if (!selectedResume) throw Error("Resume not found");

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
