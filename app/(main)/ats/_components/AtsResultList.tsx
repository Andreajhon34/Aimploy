"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { AtsResult } from "../_types/atsResult";
import { AtsResultCard } from "./AtsResultCard";
import { ChevronDownIcon, Inbox } from "lucide-react";
import { Resume } from "@/app/_types/resume";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export type AtsResultListProps = {
  resumesPromise: Promise<
    Array<
      Omit<Resume, "content" | "updatedAt" | "createdAt"> & {
        atsResults: Array<AtsResult & { resumeTitle: string }>;
      }
    >
  >;
};

export function AtsResultList({ resumesPromise }: AtsResultListProps) {
  const resumes = React.use(resumesPromise);
  const hasAtsResults = resumes.length > 0;

  if (hasAtsResults) {
    return (
      <ScrollArea className="size-full">
        <div className="size-full flex flex-col gap-3 p-0.5 pe-3.5">
          {resumes.map(({ resumeId, atsResults, title }) => {
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
                      {atsResults.map((atsResult, index) => (
                        <AtsResultCard
                          key={atsResult.id}
                          atsResult={atsResult}
                          resumeTitle={atsResult.resumeTitle}
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
