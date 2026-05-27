import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Sparkles, XCircle } from "lucide-react";
import { AtsResult } from "../_types/AtsResult";

type AtsScoreDisplayProps = {
  atsResult: AtsResult;
};

export function AtsScoreDisplay({ atsResult }: AtsScoreDisplayProps) {
  const score = atsResult.score;
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="col-span-1 md:col-span-4 border rounded-xl bg-card flex flex-col items-center justify-center text-center space-y-3 shadow-xs">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          ATS Match Score
        </span>
        <div
          className={cn(
            "relative row-span-2 col-start-2 row-start-1 flex items-center justify-center size-16 rounded-full border-4",
            score >= 75 && "border-emerald-500 text-emerald-500",
            score >= 50 && score < 75 && "border-amber-500 text-amber-500",
            score < 50 && "border-rose-500 text-rose-500",
          )}
        >
          <span className="text-xl font-extrabold">{score}%</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {score >= 75
            ? "Mantap! Resume kamu sudah sangat sesuai."
            : "Butuh beberapa perbaikan keyword kunci."}
        </p>
      </div>

      <div className="col-span-1 md:col-span-8 p-6 border rounded-xl bg-card space-y-4 shadow-xs overflow-y-auto no-scrollbar">
        <h3 className="font-semibold flex items-center gap-2 text-rose-600">
          <XCircle className="w-5 h-5" /> Keyword yang Hilang (Wajib Ditambah)
        </h3>
        <div className="flex flex-wrap gap-2">
          {atsResult.missingKeywords.map((kw, i) => (
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
          {atsResult.foundKeywords.map((kw, i) => (
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
          {atsResult.formattingIssues.map((issue, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-amber-500">•</span> {issue}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-1 md:col-span-6 p-6 border rounded-xl bg-card space-y-4 shadow-md overflow-y-auto no-scrollbar">
        <h3 className="font-semibold flex items-center gap-2 text-amber-700">
          <Sparkles className="w-5 h-5 text-amber-500" /> Saran Perbaikan dari
          AI
        </h3>
        <ul className="list-disc pl-5 space-y-2.5 text-sm text-muted-foreground">
          {atsResult.aiSuggestions.map((suggestion, i) => (
            <li key={i}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
