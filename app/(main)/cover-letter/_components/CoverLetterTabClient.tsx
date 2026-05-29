import { Resume } from "@/app/_types/resume";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inbox } from "lucide-react";
import React from "react";
import { CoverLetterCard } from "./CoverLetterCard";

type CoverLetterTabClientProps = {
  coverLettersPromise: Promise<
    Array<{
      id: string;
      content: string;
      createdAt: Date;
      resume: Resume & { createdAt: Date };
    }>
  >;
};

export function CoverLetterTabClient({
  coverLettersPromise,
}: CoverLetterTabClientProps) {
  const coverLetters = React.use(coverLettersPromise);
  const hasCoverLetters = coverLetters.length > 0;

  return (
    <Card className="size-full">
      <CardContent className="size-full">
        {!hasCoverLetters ? (
          <div className="flex size-full flex-col justify-center gap-3 items-center">
            <Inbox className="size-10" />
            <p className="text-base font-semibold text-muted-foreground">
              Kamu tidak memiliki hasil review saat ini
            </p>
          </div>
        ) : (
          <div className="size-full">
            <ScrollArea className="size-full">
              <div className="flex flex-col gap-4 pe-3.5">
                {coverLetters.map(({ id, resume, content }) => {
                  const resumeContent = resume.content;
                  return (
                    <CoverLetterCard
                      key={id}
                      resume={resume}
                      coverLetter={{
                        id,
                        content,
                        personalInfo: {
                          fullName: resumeContent.personalInformation.fullName,
                          email: resumeContent.personalInformation.email,
                          phone: resumeContent.personalInformation.number,
                        },
                      }}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
