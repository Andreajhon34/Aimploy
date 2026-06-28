import { MagicCard } from "@/components/ui/magic-card";
import { DropdownClient } from "./DropdownClient";
import { Template1Preview } from "./Template1Preview";
import { dateToLocalString } from "@/app/_lib/dateToLocalString";
import Link from "next/link";
import { Resume } from "@/app/_types/resume";

export type ResumeCardProps = { resume: Omit<Resume, "content" | "createdAt"> };

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    // <div className="w-full aspec">
    <MagicCard className="group isolate w-full aspect-square relative rounded-md overflow-auto">
      {/* <div className="flex flex-col"> */}
      <div className="absolute top-3 right-3 z-20">
        <DropdownClient resumeId={resume.resumeId} title={resume.title} />
      </div>

      <Link
        href={`/resume-builder/${resume.resumeId}`}
        className="absolute z-10 inset-0 focus:outline-none"
      >
        {" "}
      </Link>

      <div className="flex-1 w-full overflow-hidden">
        <Template1Preview className="blur-[3px] h-full flex-1" />
      </div>

      <div className="p-4 bg-card/50 flex flex-col">
        <h3 className="font-medium text-sm tracking-tight truncate group-hover:text-primary transition-colors">
          {resume.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Diupdate {dateToLocalString(resume.updatedAt)}
        </p>
      </div>
      {/* </div> */}
    </MagicCard>
    // </div>
  );
}
