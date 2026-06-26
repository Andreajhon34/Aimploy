"use client";

import { toastApiError } from "@/app/_lib/toastApiError";
import { Button } from "@/components/ui/button";
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
import { ResponseBody } from "@/types/responseBody";
import { useMutation } from "@tanstack/react-query";
import { Sparkle, Square } from "lucide-react";
import React from "react";
import { ResumeCard } from "../../../_components/resumeList/ResumeCard";
import { Resume } from "../../../_types/resume";
import { SortType } from "../../../_types/sortType";
import { saveAtsResult } from "../_actions/saveAtsResult";
import { AtsResult } from "../_types/atsResult";
import { AtsScoreDisplay } from "./AtsScoreDisplay";
import SlideTextButton from "@/components/kokonutui/slide-text-button";
import { personalInformationSchema } from "../../resume-builder/_schemas/resumeBuilderForm";
import { toast } from "sonner";
import { HttpError } from "@/lib/HttpError";

type AtsCheckTabClient = {
  resumesPromise: Promise<Resume[]>;
};

export function AtsCheckTabClient({ resumesPromise }: AtsCheckTabClient) {
  const [jobDescription, setJobDescription] = React.useState("");
  const isValidJobDescription = jobDescription.trim().length >= 2;
  const [analysisResult, setAnalysisResult] = React.useState<AtsResult | null>(
    null,
  );
  const [selectedResume, setSelectedResume] = React.useState<Resume | null>(
    null,
  );
  const hasResumeSelected = !!selectedResume;

  const [touched, setTouched] = React.useState(false);

  const isButtonActive = hasResumeSelected && isValidJobDescription;

  const abortControllerRef = React.useRef<AbortController | null>(null);

  const [sortBy, setSortBy] = React.useState<SortType>("latest");

  const mutation = useMutation({
    mutationFn: async (prompt: string) => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const { data } = await fetcher.post<ResponseBody<string>>(
        "/api/generate",
        {
          method: "POST",
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        },
      );

      const jsonData = JSON.parse(data);

      return jsonData as AtsResult;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast.success(
        "Resume tidak lengkap, Mohon untuk mengisi minimal bagian informasi pribadi",
      );
      React.startTransition(async () => {
        if (!selectedResume) throw new Error("Resume not found");
        await saveAtsResult(data, selectedResume.resumeId);
      });
    },
    onError: (err, variables, onMutateResult, context) => {
      if (err instanceof HttpError) {
        if (err.code === "REQUEST_ABORTED") return;

        return toast.error("Error", {
          description: err.message,
        });
      }

      toast.error(
        "Terjadi kesalahan, Silahkan periksa koneksi internet anda dan coba lagi nanti",
      );
    },
  });

  const handleCheckAtsScore = () => {
    if (!isValidJobDescription) throw new Error("Job description is empty");

    if (!selectedResume) throw new Error("Resume not found");

    const zodResult = personalInformationSchema.safeParse(
      selectedResume.content.personalInformation,
    );

    if (!zodResult.success) {
      return toast.error(
        "Resume tidak lengkap, Mohon untuk mengisi minimal bagian informasi pribadi",
      );
    }

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
    You are an expert ATS (Applicant Tracking System) analyzer.
    Compare the RESUME against the JOB DESCRIPTION and return ONLY valid JSON.
    
    OUTPUT RULES:
    1. Return ONLY JSON. No markdown, no backticks, no explanation before or after.
    2. All fields required. Use [] if empty.
    3. score and matchPercentage are integers 0-100.
    4. foundKeywords = keywords present in both resume and JD.
    5. missingKeywords = important keywords from JD that are missing or weak in resume.
    6. Be strict. Don't hallucinate. Don't invent experience.
    7. formattingIssues = problems with structure, readability, ATS compatibility.
    8. aiSuggestions = specific, actionable fixes to improve the score.
    7. Output Sesuaikan dengan bahasa yang ada di resume / CV
    8. abaikan html tagnya, fokus ke isinya saja, karena itu memang sengaja untuk formatting frontend
    
    JSON STRUCTURE:
    {
      "score": number,
      "matchPercentage": number,
      "foundKeywords": string[],
      "missingKeywords": string[],
      "formattingIssues": string[],
      "aiSuggestions": string[]
    }
    
    JOB DESCRIPTION:
    ${jobDescription}
    
    RESUME:
    ${resumeText}
      `.trim();

    mutation.mutate(prompt);
  };

  const handleCancelCheck = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("user");
      abortControllerRef.current = null;

      mutation.reset();
    }
  };

  return (
    <>
      <Dialog
        open={!!analysisResult}
        onOpenChange={(value) => {
          if (!value) {
            setAnalysisResult(null);
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-w-none! w-fit max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>ATS Check dialog</DialogTitle>
            <DialogDescription>This is an ATS check dialog</DialogDescription>
          </DialogHeader>
          {analysisResult && (
            <AtsScoreDisplay atsResult={{ ...analysisResult }} />
          )}
        </DialogContent>
      </Dialog>
      <div className="size-full grid grid-cols-2 grid-rows-[1fr_auto] gap-4">
        <div className="min-h-0">
          <ResumeCard
            resumesPromise={resumesPromise}
            setSelectedResume={setSelectedResume}
          />
        </div>
        <div className="min-h-0 size-full">
          <Card className="size-full">
            <CardHeader>
              <CardTitle className="w-full text-center">
                Lowongan pekerjaan
              </CardTitle>
              <CardDescription>
                Harap masukkan lowongan pekerjaan yang diinginkan
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full flex flex-col gap-3">
              <Textarea
                onBlur={() => setTouched(true)}
                className="flex-1"
                placeholder="Tulis lowongan pekerjaannya di sini"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                disabled={mutation.isPending}
                aria-invalid={touched && !isValidJobDescription}
              />
              {touched && !isValidJobDescription && (
                <p className="text-destructive text-sm w-full text-center">
                  *Lowongan pekerjaan tidak boleh kosong
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 size-full">
          {!mutation.isPending ? (
            <SlideTextButton
              className="h-10 w-full text-center"
              onClick={handleCheckAtsScore}
              text={<Sparkle />}
              hoverText={
                <>
                  Generate with <span className="font-bold">Aimploy</span>
                </>
              }
              disabled={mutation.isPending || !isButtonActive}
            />
          ) : (
            <Button className="h-10 w-full" onClick={handleCancelCheck}>
              <Square />
              <span className="sr-only">pause</span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
