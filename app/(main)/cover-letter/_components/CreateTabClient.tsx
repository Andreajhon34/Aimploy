"use client";

import { Resume } from "@/app/_types/resume";
import { Button } from "@/components/ui/button";
import { ButtonWithLoading } from "@/components/ui/ButtonWithLoading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { fetcher } from "@/lib/fetcher";
import { HttpError } from "@/lib/HttpError";
import { ResponseBody } from "@/types/responseBody";
import { useMutation } from "@tanstack/react-query";
import { Sparkle, Square } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { saveCoverLetter } from "../_actions/saveCoverLetter";
import { ResumeCard } from "@/app/_components/resumeList/ResumeCard";
import { CoverLetterPreviewClient } from "./CoverLetterPreviewClient";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { toastApiError } from "@/app/_lib/toastApiError";

type CreateTableClient = {
  resumesPromise: Promise<Array<Resume>>;
};

export function CreateTabClient({ resumesPromise }: CreateTableClient) {
  const [selectedResume, setSelectedResume] = React.useState<Resume | null>(
    null,
  );
  const hasResumeSelected = !!selectedResume;
  const [jobDescription, setJobDescription] = React.useState("");
  const [coverLetterContent, setCoverLetterContent] = React.useState<
    string | null
  >(null);
  const timeoutIdRef = React.useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const timeoutId = setTimeout(() => controller.abort("timeout"), 60_000);
      timeoutIdRef.current = timeoutId;

      try {
        const { data } = await fetcher<ResponseBody<string>>("/api/generate", {
          method: "POST",
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        });
        return data;
      } finally {
        clearTimeout(timeoutId);
      }
    },
    onSuccess: (data) => {
      setCoverLetterContent(data);
      React.startTransition(async () => {
        if (!selectedResume) throw new Error("Resume not found");
        await saveCoverLetter(data, selectedResume.resumeId);
      });
    },
    onError: (err: unknown) => toastApiError(err, abortControllerRef),
  });

  const handleGenerate = async () => {
    const resumes = await resumesPromise;

    if (!selectedResume)
      return toast.error("Mohon untuk memilih resume terlebih dahulu");

    if (!selectedResume) throw Error("Resume could not be found");

    const resumeText = `
    Name: ${selectedResume.content.personalInformation.fullName ?? ""}
    Title: ${selectedResume.content.personalInformation.job ?? ""}
    Email: ${selectedResume.content.personalInformation.email ?? ""}
    Phone: ${selectedResume.content.personalInformation.number ?? ""}
    Location: ${selectedResume.content.personalInformation.location ?? ""}
    LinkedIn: ${selectedResume.content.personalInformation.linkedinProfile ?? ""}
    
    Summary:
    ${selectedResume.content.personalInformation.describeProfile ?? ""}
    
    Experience:
    ${selectedResume.content.experiences
      ?.map(
        (e) =>
          `- ${e.position} at ${e.company} (${e.startDate} - ${e.endDate})
       ${e.jobDescription}`,
      )
      .join("\n")}
    
    Education:
    ${selectedResume.content.educations
      ?.map(
        (e) => `- ${e.degree} at ${e.institute} (${e.startYear} - ${e.endYear})
       ${e.description}`,
      )
      .join("\n")}
    
    Skills:
    ${selectedResume.content.skills}
      `.trim();

    const prompt = `
    Generate a professional cover letter based on this Resume:
    ${resumeText} 
    
    and Job Description:
    ${jobDescription}
    
    OUTPUT FORMAT RULES:
    1. Return the output ONLY as formatted text using standard HTML tags like <p> for paragraphs and <strong> for bold text.
    2. Do not include <html>, <body>, or any CSS/Tailwind classes.
    3. STRICTLY FORBIDDEN: Do not wrap the output in markdown code blocks (like \`\`\`html ... \`\`\`). Return the raw HTML string directly.
    
    CONTENT RULES:
    1. DO NOT include any personal profile header details (such as sender name, email, phone number, or address) and date at the top.
    2. DO NOT include the recipient's company address block at the top.
    3. DO NOT include the closing signature block metadata at the bottom (like "Sincerely, [Name]" or "Hormat saya").
    4. START DIRECTLY with the salutation (e.g., "Dear Hiring Manager," or "Yth. Tim Rekrutmen,") based on the language context.
    5. END IMMEDIATELY after the final closing paragraph.
    
    The React template already handles all header, date, and signature layouts, so only generate the core body paragraphs.
    `;

    mutation.mutate(prompt);
  };

  const handleCancelGenerate = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("user");
      abortControllerRef.current = null;

      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }

      mutation.reset();
    }
  };

  return (
    <>
      <Dialog
        open={!!coverLetterContent}
        onOpenChange={(open) => {
          if (!open) {
            setCoverLetterContent(null);
          }
        }}
      >
        <DialogContent
          className="max-w-none! w-fit h-[90vh]"
          showCloseButton={false}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Your Cover letter</DialogTitle>
            <DialogDescription>
              This is your cover letter that has been generated
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto no-scrollbar">
            {coverLetterContent && selectedResume && (
              <CoverLetterPreviewClient
                coverLetterContent={coverLetterContent}
                selectedResume={selectedResume}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
      <div className="size-full grid grid-cols-2 grid-rows-[1fr_auto] gap-4">
        <div className="min-h-0">
          <ResumeCard
            resumesPromise={resumesPromise}
            setSelectedResume={setSelectedResume}
          />
        </div>
        <div>
          <Card className="size-full">
            <CardHeader>
              <CardTitle className="text-center">
                Lowongan pekerjaan (Opsional)
              </CardTitle>
              <CardDescription>
                Harap memasukkan lowongan pekerjaan untuk hasil yang lebih baik
              </CardDescription>
            </CardHeader>
            <CardContent className="size-full">
              <Textarea
                className="size-full"
                placeholder="Tulis lowongan pekerjaannya di sini"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          {!mutation.isPending ? (
            <SlideTextButton
              className="w-full h-10"
              disabled={!hasResumeSelected}
              onClick={handleGenerate}
              text={<Sparkle />}
              hoverText={
                <>
                  Generate with <span className="font-bold">Aimploy</span>
                </>
              }
            />
          ) : (
            <Button className="w-full h-10" onClick={handleCancelGenerate}>
              <Square />
              <span className="sr-only">Stop generating</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
