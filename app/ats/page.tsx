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
} from "lucide-react";
import { toast } from "sonner";

// Interface untuk data hasil analisis AI
interface AtsResult {
  score: number;
  matchPercentage: number;
  foundKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
  aiSuggestions: string[];
}

const dummyResult: AtsResult = {
  score: 78,
  matchPercentage: 82,
  foundKeywords: ["React", "TypeScript", "Next.js", "Tailwind CSS", "REST API"],
  missingKeywords: ["Docker", "GraphQL", "AWS", "Unit Testing", "CI/CD"],
  formattingIssues: [
    "Gunakan bullet point untuk pengalaman kerja",
    "Hindari paragraf panjang di bagian summary",
    "Font size section header terlalu kecil",
  ],
  aiSuggestions: [
    "Tambahkan angka/metrik pada pencapaian kerja, contoh: 'Meningkatkan performa 40%'",
    "Sesuaikan keyword 'React' dan 'TypeScript' di bagian skills biar lebih match dengan JD",
    "Hapus email duplikat di footer CV",
  ],
};

export default function AtsCheckerPage() {
  const [jobDescription, setJobDescription] = useState("");
  // Anggap ini teks resume yang diambil dari database resume builder lu
  const [resumeText, setResumeText] = useState(
    "Andreas - Frontend Engineer. Tech stack: React, Next.js, Tailwind CSS...",
  );
  const [analysisResult, setAnalysisResult] = useState<AtsResult | null>(
    dummyResult,
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!jobDescription.trim())
        throw new Error("Job description cannot be empty");

      const res = await fetch("/api/ats-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (!res.ok) throw new Error("Failed to analyze resume");
      return (await res.json()) as AtsResult;
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      toast.success("Analysis complete!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          ATS Resume Checker
        </h1>
        <p className="text-muted-foreground text-sm">
          Bandingkan resume lu dengan kriteria lowongan kerja buat ningkatin
          peluang lolos screening otomatis.
        </p>
      </div>

      <hr className="border-muted" />

      {/* JIKA BELUM ADA HASIL / SEDANG LOADING */}
      {!analysisResult || mutation.isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sisi Kiri: Info Resume Terpilih */}
          <div className="p-5 border rounded-xl bg-card space-y-4 shadow-xs">
            <div className="flex items-center gap-2 font-semibold">
              <FileText className="w-5 h-5 text-primary" />
              <h2>Resume Terpilih</h2>
            </div>
            <div className="p-4 border rounded-lg bg-muted/50 text-xs font-mono max-h-[300px] overflow-y-auto">
              {resumeText}
            </div>
            <p className="text-xs text-muted-foreground">
              *Teks resume ini diambil otomatis dari resume aktif yang lagi lu
              edit.
            </p>
          </div>

          {/* Sisi Kanan: Input Job Description */}
          <div className="p-5 border rounded-xl bg-card space-y-4 shadow-xs flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2>Paste Lowongan Kerja (Job Description)</h2>
            </div>
            <textarea
              className="flex-1 w-full min-h-[250px] p-3 text-sm bg-background border rounded-lg focus:outline-hidden focus:ring-1 focus:ring-primary resize-none"
              placeholder="Paste deskripsi pekerjaan, kualifikasi, dan skill yang dicari di sini..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              disabled={mutation.isPending}
            />
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || !jobDescription.trim()}
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Membedah Resume & JD...
                </>
              ) : (
                <>
                  Cek Skor ATS <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* JIKA HASIL ANALISIS SUDAH KELUAR */
        <div className="space-y-6">
          {/* Tombol Reset */}
          <button
            onClick={() => setAnalysisResult(null)}
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            ← Cek Ulang dengan Lowongan Lain
          </button>

          {/* Grid Skor & Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Score Badge */}
            <div className="p-6 border rounded-xl bg-card flex flex-col items-center justify-center text-center space-y-3">
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
                  ? "Mantap! Resume lu udah sangat sesuai."
                  : "Butuh beberapa perbaikan keyword kunci."}
              </p>
            </div>

            {/* Box 2: Missing Keywords */}
            <div className="md:col-span-2 p-6 border rounded-xl bg-card space-y-4">
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
                    +{kw}
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
                    ✓ {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tips Formatting & AI Advice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tips Struktur / Formatting */}
            <div className="p-6 border rounded-xl bg-card space-y-4">
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

            {/* Rekomendasi Narasi AI */}
            <div className="p-6 border rounded-xl bg-card space-y-4 bg-linear-to-br from-amber-50/20 to-transparent">
              <h3 className="font-semibold flex items-center gap-2 text-amber-700">
                <Sparkles className="w-5 h-5 text-amber-500" /> Saran Perbaikan
                dari AI
              </h3>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {analysisResult.aiSuggestions.map((suggestion, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-amber-500">✨</span> {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
