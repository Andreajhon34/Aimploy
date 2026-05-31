"use client";

import React from "react";
import { ResumeCard, ResumeCardProps } from "./ResumeCard";
import { ListFilter } from "lucide-react";
import { SortType } from "@/app/_types/sortType";

export type ResumesGridViewProps = {
  resumesPromise: Promise<
    Array<ResumeCardProps["resume"] & { createdAt: Date }>
  >;
  sortBy: SortType;
};

export function ResumeGridView({
  resumesPromise,
  sortBy,
}: ResumesGridViewProps) {
  const resumes = React.use(resumesPromise);
  const hasResumes = resumes.length > 0;

  const sortedResume = React.useMemo(() => {
    return [...resumes].sort((a, b) => {
      if (sortBy === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [sortBy, resumes]);

  if (hasResumes) {
    return (
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {sortedResume.map((resume) => (
          <ResumeCard key={resume.resumeId} resume={resume} />
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8 border mt-6 border-dashed rounded-xl bg-muted/5">
      <p className="text-xs text-muted-foreground">Tidak ada resume</p>
    </div>
  );
}
