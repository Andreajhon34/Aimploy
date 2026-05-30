import { Card, CardContent } from "@/components/ui/card";
import { ResumeList } from "./ResumeList";
import { Resume } from "@/app/_types/resume";
import React from "react";
import { SortType } from "../../(main)/cover-letter/_types/sortType";

type ResumeListViewProps = {
  resumePromise: Promise<Resume[]>;
  sortBy: SortType;
  setSelectedResume: (resume: Resume | null) => void;
};

export function ResumeListView({
  resumePromise,
  sortBy,
  setSelectedResume,
}: ResumeListViewProps) {
  const resumes = React.use(resumePromise);
  const hasResumes = resumes.length > 0;

  const sortedResume = React.useMemo(() => {
    return [...resumes].sort((a, b) => {
      if (sortBy === "ascending") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "descending") {
        return b.title.localeCompare(a.title);
      }

      if (sortBy === "latest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [sortBy, resumes]);

  return hasResumes ? (
    <ResumeList resumes={sortedResume} setSelectedResume={setSelectedResume} />
  ) : (
    <div className="size-full flex justify-center items-center">
      <span className="text-base font-semibold text-muted-foreground">
        Tidak ada resume
      </span>
    </div>
  );
}
