import { FileText } from "lucide-react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Resume } from "../_types/resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResumeListCardProps = {
  resumes: Resume[];
  selectedResumeId: string | null;
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
        <RadioGroup
          value={selectedResumeId}
          onValueChange={setSelectedResumeId}
        >
          {resumes.map(({ title, resumeId, updatedAt }) => (
            <FieldLabel htmlFor={resumeId}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{title}</FieldTitle>
                  <FieldDescription>
                    Terakhir diperbaharui{" "}
                    {updatedAt.toLocaleDateString("id-ID")}
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem
                  value={resumeId}
                  id={resumeId}
                  className="sr-only"
                />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
