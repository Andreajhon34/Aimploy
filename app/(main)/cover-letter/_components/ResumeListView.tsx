import { Card, CardContent } from "@/components/ui/card";
import { ResumeList } from "./ResumeList";
import { Resume } from "@/app/_types/resume";
import React from "react";
import { SortType } from "../_types/sortType";

type ResumeListViewProps = {
  resumesPromise: Promise<Array<Resume & { createdAt: Date }>>;
  selectedResumeId: string;
  setSelectedResumeId: (id: string) => void;
};

export function ResumeListView({
  resumesPromise,
  selectedResumeId,
  setSelectedResumeId,
}: ResumeListViewProps) {
  const resumes = React.use(resumesPromise);
  const hasResumes = resumes.length > 0;
  const [sortBy, setSortBy] = React.useState<SortType>("latest");

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
    <ResumeList
      value={selectedResumeId}
      onValueChange={setSelectedResumeId}
      resumes={sortedResume}
      setSortBy={setSortBy}
    />
  ) : (
    <div className="min-w-0">
      <Card className="size-full">
        <CardContent className="size-full flex justify-center items-center">
          <span className="text-base font-semibold text-muted-foreground">
            Tidak ada resume
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
