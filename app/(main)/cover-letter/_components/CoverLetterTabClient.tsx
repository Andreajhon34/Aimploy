import { Resume } from "@/app/_types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inbox } from "lucide-react";
import React, { Suspense } from "react";
import { CoverLetterCard } from "./CoverLetterCard";
import { CoverLetter } from "../_types/CoverLetter";
import { CoverLetterList, CoverLetterListProps } from "./CoverLetterList";
import { CoverLetterListSkeleton } from "./CoverLetterListSkeleton";

export type CoverLetterTabClientProps = {
  resumesPromise: CoverLetterListProps["resumesPromise"];
};

export function CoverLetterTabClient({
  resumesPromise,
}: CoverLetterTabClientProps) {
  return (
    <Card className="size-full">
      <CardContent className="size-full">
        <Suspense fallback={<CoverLetterListSkeleton />}>
          <CoverLetterList resumesPromise={resumesPromise} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
