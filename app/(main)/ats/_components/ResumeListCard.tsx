import { File, FileText, FileTextIcon } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Resume } from "../../../_types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ResumeListCardProps = {
  resumes: Resume[];
  selectedResumeId: string;
  setSelectedResumeId: (resumeId: string) => void;
};

export function ResumeListCard({
  resumes,
  selectedResumeId,
  setSelectedResumeId,
}: ResumeListCardProps) {
  return (
    <Card className="h-110 flex-1">
      <CardHeader>
        <CardTitle className="flex w-full justify-center gap-3">
          <FileText className="text-primary" />
          <h2>Resume kamu</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto no-scrollbar">
        <ToggleGroup
          value={selectedResumeId}
          onValueChange={setSelectedResumeId}
          variant="outline"
          type="single"
          orientation="vertical"
          className="w-full h-auto"
        >
          {resumes.map(({ title, resumeId, updatedAt }) => (
            <ToggleGroupItem
              key={resumeId}
              className="h-auto w-full py-3"
              value={resumeId}
              aria-label={title}
            >
              <Field orientation="horizontal">
                <FileTextIcon className="size-10" />
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{title}</FieldTitle>
                    <FieldDescription>
                      Diperbaharui pada{" "}
                      {updatedAt.toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </Field>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardContent>
    </Card>
  );
}
