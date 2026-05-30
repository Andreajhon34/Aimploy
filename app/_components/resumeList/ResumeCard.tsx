"use client";

import React, { Suspense, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Loader2,
  FileText,
  ArrowRight,
  ChevronLeft,
  Dot,
  File,
  Inbox,
  Sparkle,
  Square,
  Funnel,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ResumeBuilderDbSchema } from "../../(main)/resume-builder/_schemas/resumeBuilderDbForm";
import { ResumeList } from "./ResumeList";
import { Resume } from "../../_types/resume";
import { fetcher } from "@/lib/fetcher";
import { ResponseBody } from "@/types/responseBody";
import { HttpError } from "@/lib/HttpError";
import { ButtonWithLoading } from "@/components/ui/ButtonWithLoading";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValueExpired } from "next/dist/client/components/segment-cache/cache-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtsResult } from "../../(main)/ats/_types/AtsResult";
import { startTransition } from "react";
import { saveAtsResult } from "../../(main)/ats/_actions/saveAtsResult";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AtsScoreDisplay } from "../../(main)/ats/_components/AtsScoreDisplay";
import { toastApiError } from "@/app/_lib/toastApiError";
import { dateToLocalString } from "@/app/_lib/dateToLocalString";
import { ResumeListView } from "./ResumeListView";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeListSkeleton } from "@/app/_components/ResumeListSkeleton";
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
import { SortType } from "../../(main)/cover-letter/_types/sortType";

type ResumeCardProps = {
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
        <CardTitle className="flex w-full justify-center gap-3">
          <FileText className="text-primary" />
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
      <CardFooter className="justify-end bg-card border-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon-lg">
              <Funnel />
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
