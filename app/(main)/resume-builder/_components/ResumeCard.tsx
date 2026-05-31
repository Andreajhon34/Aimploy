import { MagicCard } from "@/components/ui/magic-card";
import { DropdownClient } from "./DropdownClient";
import { Template1Preview } from "./Template1Preview";
import { dateToLocalString } from "@/app/_lib/dateToLocalString";
import Link from "next/link";
import { Resume } from "@/app/_types/resume";

export type ResumeCardProps = { resume: Omit<Resume, "content" | "createdAt"> };

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <MagicCard className="group w-full aspect-square relative rounded-md overflow-auto">
      <div className="absolute top-3 right-3 z-20">
        <DropdownClient resumeId={resume.resumeId} title={resume.title} />
      </div>

      <Link
        href={`/resume-builder/${resume.resumeId}`}
        className="size-full flex flex-col relative focus:outline-none h-70"
      >
        <div className="flex-1 overflow-y-hidden">
          <Template1Preview className="blur-[3px]" />
        </div>

        <div className="p-4 bg-card/50 flex flex-col">
          <h3 className="font-medium text-sm tracking-tight truncate group-hover:text-primary transition-colors">
            {resume.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Diupdate {dateToLocalString(resume.updatedAt)}
          </p>
        </div>
      </Link>
    </MagicCard>
  );
}
