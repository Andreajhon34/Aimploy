"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import { AtsResultList, AtsResultListProps } from "./AtsResultList";
import { AtsResultListSkeleton } from "./AtsResultListSkeleton";

export type AtsResultListTabClientProps = {
  resumesPromise: AtsResultListProps["resumesPromise"];
};

export function AtsResultListTabClient({
  resumesPromise,
}: AtsResultListTabClientProps) {
  return (
    <Card className="size-full">
      <CardContent className="size-full">
        <Suspense fallback={<AtsResultListSkeleton />}>
          <AtsResultList resumesPromise={resumesPromise} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
