"use client";

import React, { useState } from "react";
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
import { ResumeBuilderDbSchema } from "../../resume-builder/_schemas/resumeBuilderDbForm";
import { ResumeListCard } from "./ResumeListCard";
import { Resume } from "../../../_types/resume";
import { fetcher } from "@/lib/fetcher";
import { ResponseBody } from "@/types/responseBody";
import { HttpError } from "@/lib/HttpError";
import { ButtonWithLoading } from "@/components/ui/ButtonWithLoading";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isValueExpired } from "next/dist/client/components/segment-cache/cache-map";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AtsResult } from "../_types/AtsResult";
import { startTransition } from "react";
import { saveAtsResult } from "../_actions/saveAtsResult";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AtsScoreDisplay } from "./AtsScoreDisplay";

// const dummyResult: AtsResult = {
//   score: 78,
//   matchPercentage: 82,
//   foundKeywords: ["React", "TypeScript", "Next.js", "Tailwind CSS", "REST API"],
//   missingKeywords: ["Docker", "GraphQL", "AWS", "Unit Testing", "CI/CD"],
//   formattingIssues: [
//     "Gunakan bullet point untuk pengalaman kerja",
//     "Hindari paragraf panjang di bagian summary",
//     "Font size section header terlalu kecil",
//   ],
//   aiSuggestions: [
//     "Tambahkan angka/metrik pada pencapaian kerja, contoh: 'Meningkatkan performa 40%'",
//     "Sesuaikan keyword 'React' dan 'TypeScript' di bagian skills biar lebih match dengan JD",
//     "Hapus email duplikat di footer CV",
//   ],
// };

type AtsCheckerPage = {
  resumes: Resume[];
  atsResults: Array<
    AtsResult & {
      id: string;
      createdAt: Date;
      resumeTitle: string;
    }
  >;
};

export function AtsCheckerPage({ resumes, atsResults }: AtsCheckerPage) {
  const [jobDescription, setJobDescription] = React.useState("");
  const isValidJobDescription = jobDescription.trim().length >= 2;
  const [selectedResumeId, setSelectedResumeId] = React.useState<string>("");
  const [analysisResult, setAnalysisResult] = React.useState<AtsResult | null>(
    null,
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const hasAtsResults = atsResults.length > 0;

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isValidJobDescription)
        throw new Error("Lowongan kerja tidak boleh kosong");

      if (!selectedResumeId)
        throw new Error("Mohon untuk memilih resume terlebih dahulu");

      const selectedResume = resumes.find(
        (r) => r.resumeId === selectedResumeId,
      );

      if (!selectedResume) throw new Error("Resume tidak ditemukan");

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

      const { data } = await fetcher<ResponseBody<string>>("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        timeout: 15_000,
      });

      const jsonData = JSON.parse(data);

      console.log("Data", data);
      return jsonData as AtsResult;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setOpenDialog(true);
      React.startTransition(async () => {
        await saveAtsResult(data, selectedResumeId);
      });
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        return toast.error("Terjadi kesalahan saat mengirim prompt", {
          description: err.message,
        });
      }

      if (err instanceof TypeError && err.message.includes("Failed to fetch")) {
        return toast.error("Kamu sedang tidak terhubung ke internet", {
          description: "Silahkan coba lagi nanti",
        });
      }

      if (err.name === "AbortError") {
        return toast.error("Waktu timeout telah tercapai", {
          description: "Silahkan coba lagi nanti",
        });
      }

      if (err instanceof Error) {
        return toast.error(err.message);
      }

      toast.error("Sepertinya ada yang salah", {
        description: "Silahkan coba lagi nanti",
      });
    },
  });

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      <div className="w-full flex-1 container mx-auto flex px-4 flex-col">
        {/* {!analysisResult || mutation.isPending ? ( */}
        <div className="w-full flex-1 flex gap-6 items-center">
          <Tabs defaultValue="review" className="w-full">
            <TabsList>
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="reviewHistory">Hasil review saya</TabsTrigger>
            </TabsList>
            <TabsContent value="review" className="flex gap-3">
              {resumes.length > 0 ? (
                <ResumeListCard
                  resumes={resumes}
                  selectedResumeId={selectedResumeId}
                  setSelectedResumeId={setSelectedResumeId}
                />
              ) : (
                <Card className="flex-1">
                  <CardContent className="size-full flex justify-center items-center">
                    <span className="text-base font-semibold text-muted-foreground">
                      Tidak ada resume
                    </span>
                  </CardContent>
                </Card>
              )}
              <Card className="h-110 flex-1">
                <CardHeader>
                  <CardTitle className="flex justify-center gap-3">
                    <Sparkles className="text-amber-500" />
                    <h2>Paste Lowongan Kerja di sini</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col gap-3">
                  <Textarea
                    onBlur={() => setTouched(true)}
                    className="flex-1"
                    placeholder="Paste deskripsi pekerjaan, kualifikasi, dan skill yang dicari di sini..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={mutation.isPending}
                    aria-invalid={touched && !isValidJobDescription}
                  />
                  {touched && !isValidJobDescription && (
                    <p className="text-destructive text-sm w-full text-center">
                      Lowongan pekerjaan tidak boleh kosong
                    </p>
                  )}
                  <ButtonWithLoading
                    isLoading={mutation.isPending}
                    onClick={() => mutation.mutate()}
                    disabled={mutation.isPending || !isValidJobDescription}
                  >
                    Cek skor ATS
                  </ButtonWithLoading>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviewHistory">
              <Card className="h-110">
                <CardContent className="size-full space-y-4 overflow-y-auto no-scrollbar">
                  {!hasAtsResults ? (
                    <div className="flex size-full flex-col justify-center gap-3 items-center">
                      <Inbox className="size-10" />
                      <p className="text-base font-semibold text-muted-foreground">
                        Kamu tidak memiliki hasil review saat ini
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {atsResults.map(
                        ({ resumeTitle, score, createdAt, ...props }) => {
                          return (
                            <Dialog key={props.id}>
                              <DialogTrigger asChild>
                                <Card className="w-full m-0.5">
                                  <CardContent className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto]">
                                    <div className="self-center">
                                      <p className="truncate text-base ">
                                        {resumeTitle}
                                      </p>
                                    </div>
                                    <div className="col-start-1 row-start-2 self-center">
                                      <p className="text-sm text-muted-foreground">
                                        {createdAt.toLocaleString("id-ID", {
                                          dateStyle: "medium",
                                          timeStyle: "short",
                                        })}
                                      </p>
                                    </div>

                                    <div
                                      className={cn(
                                        "relative row-span-2 col-start-2 row-start-1 flex items-center justify-center size-16 rounded-full border-4",
                                        score >= 75 &&
                                          "border-emerald-500 text-emerald-500",
                                        score >= 50 &&
                                          score < 75 &&
                                          "border-amber-500 text-amber-500",
                                        score < 50 &&
                                          "border-rose-500 text-rose-500",
                                      )}
                                    >
                                      <span className="text-xl font-extrabold">
                                        {score}%
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </DialogTrigger>
                              <DialogContent
                                showCloseButton={false}
                                className="max-w-none! w-fit max-h-[90vh] overflow-y-auto no-scrollbar"
                              >
                                <DialogHeader className="sr-only">
                                  <DialogTitle>ATS Check dialog</DialogTitle>
                                  <DialogDescription>
                                    This is an ATS check dialog
                                  </DialogDescription>
                                </DialogHeader>
                                <AtsScoreDisplay
                                  atsResult={{ ...props, score }}
                                />
                              </DialogContent>
                            </Dialog>
                          );
                        },
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* ) : ( */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
        {/* )} */}
      </div>
    </div>
  );
}
