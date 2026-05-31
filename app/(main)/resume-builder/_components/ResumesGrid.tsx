"use client";

import React, { Suspense } from "react";
import { ResumeCard, ResumeCardProps } from "./ResumeCard";
import { ListFilter } from "lucide-react";
import { ResumeGridView, ResumesGridViewProps } from "./ResumesGridView";
import { Skeleton } from "@/components/ui/skeleton";
import { SortType } from "@/app/_types/sortType";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ResumeCounter } from "./ResumeCounter";

function ResumeGridSkeleton() {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {Array.from({ length: 10 }).map((_, index) => {
        return <Skeleton className="w-full aspect-square" key={index} />;
      })}
    </div>
  );
}

export type ResumesGridProps = {
  resumesPromise: ResumesGridViewProps["resumesPromise"];
};

export function ResumeGrid({ resumesPromise }: ResumesGridProps) {
  const [sortType, setSortType] =
    React.useState<Exclude<SortType, "ascending" | "descending">>("latest");

  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex w-full justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="text-sm font-semibold tracking-wide uppercase w-fit"
            >
              <ListFilter />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSortType("latest")}>
              Latest
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortType("oldest")}>
              Oldest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Suspense fallback={<></>}>
          <ResumeCounter resumesPromise={resumesPromise} />
        </Suspense>
      </div>

      <Suspense fallback={<ResumeGridSkeleton />}>
        <ResumeGridView sortBy={sortType} resumesPromise={resumesPromise} />
      </Suspense>
    </div>
  );
}
