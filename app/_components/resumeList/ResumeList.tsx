"use client";

import { File, FileText, FileTextIcon, Funnel } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Resume } from "../../_types/resume";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import React from "react";
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
import { dateToLocalString } from "@/app/_lib/dateToLocalString";

type ResumeListCardProps = {
  resumes: Resume[];
  setSelectedResume: (resume: Resume | null) => void;
};

export function ResumeList({
  resumes,
  setSelectedResume,
}: ResumeListCardProps) {
  const resumesMap = React.useMemo(() => {
    return new Map(resumes.map((resume) => [resume.resumeId, resume]));
  }, [resumes]);

  const handleOnValueChange = (resumeId: string) => {
    setSelectedResume(resumesMap.get(resumeId) ?? null);
  };

  return (
    <ScrollArea className="size-full">
      <ToggleGroup
        onValueChange={handleOnValueChange}
        variant="outline"
        type="single"
        orientation="vertical"
        className="size-full pe-3.5"
      >
        {resumes.map(({ title, resumeId, updatedAt }) => (
          <ToggleGroupItem
            key={resumeId}
            className="h-auto w-full"
            value={resumeId}
            aria-label={title}
            asChild
          >
            <Card className="w-full">
              <CardContent className="w-full flex flex-col">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">
                  Diperbaharui pada {dateToLocalString(updatedAt)}
                </p>
              </CardContent>
            </Card>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </ScrollArea>
  );
}
