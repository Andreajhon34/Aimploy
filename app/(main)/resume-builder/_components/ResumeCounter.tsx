import React from "react";
import { ResumesGridProps } from "./ResumesGrid";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Badge } from "@/components/ui/badge";

type ResumeCounterProps = {
  resumesPromise: ResumesGridProps["resumesPromise"];
};

export function ResumeCounter({ resumesPromise }: ResumeCounterProps) {
  const resumes = React.use(resumesPromise);
  const resumeCount = resumes.length;
  return (
    resumeCount > 0 && (
      <div className="flex items-center gap-1 font-semibold text-sm">
        <NumberTicker value={resumeCount} /> <span>Resume</span>
      </div>
    )
  );
}
