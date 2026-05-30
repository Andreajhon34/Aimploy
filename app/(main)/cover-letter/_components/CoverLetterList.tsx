"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CoverLetterCard } from "./CoverLetterCard";
import { CoverLetter } from "../_types/CoverLetter";
import React from "react";
import { Resume } from "@/app/_types/resume";
import { ChevronDownIcon, Inbox } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { AtsResultCard } from "../../ats/_components/AtsResultCard";

export type CoverLetterListProps = {
  resumesPromise: Promise<
    Array<
      Omit<Resume, "content" | "updatedAt" | "createdAt"> & {
        coverLetters: Array<CoverLetter & { resumeTitle: string }>;
      }
    >
  >;
};

export function CoverLetterList({ resumesPromise }: CoverLetterListProps) {
  const resumes = React.use(resumesPromise);
  const hasCoverLetters = resumes.length > 0;

  if (hasCoverLetters) {
    return (
      <div className="size-full">
        <ScrollArea className="size-full">
          <div className="flex flex-col gap-4 p-0.5 pe-3.5">
            {resumes.map(({ resumeId, title, coverLetters }) => {
              return (
                <Card className="w-full" key={resumeId}>
                  <CardContent>
                    <Collapsible className="rounded-md">
                      <CollapsibleTrigger asChild>
                        <Button variant="plain" className="group w-full">
                          {title}
                          <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="w-full flex flex-col gap-3 pt-3">
                        {coverLetters.map((coverLetter, index) => (
                          <CoverLetterCard
                            coverLetter={coverLetter}
                            resumeTitle={coverLetter.resumeTitle}
                            count={index + 1}
                          />
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex size-full flex-col justify-center gap-3 items-center">
      <Inbox className="size-10" />
      <p className="text-base font-semibold text-muted-foreground">
        Kamu tidak memiliki hasil review saat ini
      </p>
    </div>
  );
}
