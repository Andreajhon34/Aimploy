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
import { Resume } from "../_types/resume";
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

type AtsResult = {
  score: number;
  matchPercentage: number;
  foundKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  aiSuggestions: string[];
};

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
};

export function AtsCheckerPage({ resumes }: AtsCheckerPage) {
  const [jobDescription, setJobDescription] = useState("");
  const isValidJobDescription = jobDescription.trim().length >= 2;
  //   const [resumes, setResumes] = useState<Resume[]>(initialResumes);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AtsResult | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isValidJobDescription)
        throw new Error("Lowongan kerja tidak boleh kosong.");

      if (!selectedResumeId)
        throw new Error("Mohon untuk memilih resume terlebih dahulu.");

      const selectedResume = resumes.find(
        (r) => r.resumeId === selectedResumeId,
      );

      if (!selectedResume) throw new Error("Resume tidak ditemukan.");

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

      const { data } = await fetcher<ResponseBody<AtsResult>>("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });

      return data;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast.success("Analysis complete!");
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
        {!analysisResult || mutation.isPending ? (
          <div className="w-full flex-1 flex gap-6 items-center">
            <ResumeListCard
              resumes={resumes}
              selectedResumeId={selectedResumeId}
              setSelectedResumeId={setSelectedResumeId}
            />
            <Card className="h-110 flex-1">
              <CardHeader>
                <CardTitle className="flex justify-center gap-3">
                  <Sparkles className="text-amber-500" />
                  <h2>Paste Lowongan Kerja di sini</h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col gap-3">
                <Textarea
                  className="flex-1"
                  placeholder="Paste deskripsi pekerjaan, kualifikasi, dan skill yang dicari di sini..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  disabled={mutation.isPending}
                />
                <ButtonWithLoading
                  isLoading={mutation.isPending}
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending || !isValidJobDescription}
                >
                  Cek skor ATS
                </ButtonWithLoading>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_1fr_1fr] py-6 min-w-lg gap-6 content-start items-stretch flex-1">
            {/* 1. Tombol Reset (Memenuhi seluruh baris paling atas) */}
            <div className="col-span-full">
              <button
                onClick={() => setAnalysisResult(null)}
                className="text-sm font-medium text-primary hover:underline cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft />
              </button>
            </div>

            <div className="col-span-1 md:col-span-4 p-6 border rounded-xl bg-card flex flex-col items-center justify-center text-center space-y-3 shadow-xs">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                ATS Match Score
              </span>
              <div
                className={`relative flex items-center justify-center w-32 h-32 rounded-full border-4 ${
                  analysisResult.score >= 75
                    ? "border-emerald-500 text-emerald-500"
                    : analysisResult.score >= 50
                      ? "border-amber-500 text-amber-500"
                      : "border-rose-500 text-rose-500"
                }`}
              >
                <span className="text-4xl font-extrabold">
                  {analysisResult.score}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {analysisResult.score >= 75
                  ? "Mantap! Resume kamu sudah sangat sesuai."
                  : "Butuh beberapa perbaikan keyword kunci."}
              </p>
            </div>

            <div className="col-span-1 md:col-span-8 p-6 border rounded-xl bg-card space-y-4 shadow-xs overflow-y-auto no-scrollbar">
              <h3 className="font-semibold flex items-center gap-2 text-rose-600">
                <XCircle className="w-5 h-5" /> Keyword yang Hilang (Wajib
                Ditambah)
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.missingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 rounded-md"
                  >
                    {kw}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold flex items-center gap-2 text-emerald-600 pt-2">
                <CheckCircle2 className="w-5 h-5" /> Keyword yang Sudah Cocok
              </h3>
              <div className="flex flex-wrap gap-2">
                {analysisResult.foundKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-1 md:col-span-6 p-6 border rounded-xl bg-card space-y-4 shadow-xs overflow-y-auto no-scrollbar">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" /> Catatan
                Formatting & Struktur
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {analysisResult.formattingIssues.map((issue, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-amber-500">•</span> {issue}
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 md:col-span-6 p-6 border rounded-xl bg-card space-y-4 bg-linear-to-br from-amber-50/20 to-transparent shadow-xs overflow-y-auto no-scrollbar">
              <h3 className="font-semibold flex items-center gap-2 text-amber-700">
                <Sparkles className="w-5 h-5 text-amber-500" /> Saran Perbaikan
                dari AI
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {analysisResult.aiSuggestions.map((suggestion, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <Dot /> {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
