"use client";

import { ResumeListSkeleton } from "@/app/_components/ResumeListSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Filter, ListFilter } from "lucide-react";
import React, { Suspense } from "react";
import { Resume } from "../../_types/resume";
import { SortType } from "../../_types/sortType";
import { ResumeListView } from "./ResumeListView";
import { BsFileEarmarkText, BsFileText } from "react-icons/bs";

export type ResumeCardProps = {
  resumesPromise: Promise<Resume[]>;
  setSelectedResume: (resume: Resume | null) => void;
};

export function ResumeCard({
  resumesPromise,
  setSelectedResume,
}: ResumeCardProps) {
  const [sortBy, setSortBy] = React.useState<SortType>("latest");

  return (
    <Card className="size-full">
      <CardHeader>
        <CardTitle className="flex w-full justify-center items-center gap-3">
          <h2>Resume kamu</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="size-full overflow-hidden">
        <Suspense fallback={<ResumeListSkeleton />}>
          <ResumeListView
            sortBy={sortBy}
            resumePromise={resumesPromise}
            setSelectedResume={setSelectedResume}
          />
        </Suspense>
      </CardContent>
      <CardFooter className="justify-start bg-card border-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-lg" variant="ghost">
              <ListFilter />
              <span className="sr-only">sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Name</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => setSortBy("ascending")}>
                      Ascending
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortBy("descending")}>
                      Descending
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Date</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onSelect={() => setSortBy("latest")}>
                      Latest
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setSortBy("oldest")}>
                      Oldest
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
